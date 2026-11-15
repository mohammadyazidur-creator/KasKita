<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Dues;
use App\Models\DuesPayment;
use App\Models\Member;
use App\Models\Transaction;
use App\Models\Category;
use App\Models\AuditLog;
use Carbon\Carbon;

class DuesController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $duesList = Dues::where('organization_id', $orgId)->get();

        return response()->json([
            'success' => true,
            'data' => $duesList,
        ]);
    }

    public function payments(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;
        $year = $request->input('year', 2026);

        $totalMembers = Member::where('organization_id', $orgId)->count();
        $paidMembers = DuesPayment::where('organization_id', $orgId)
            ->where('status', 'Lunas')
            ->distinct('member_id')
            ->count('member_id');
        $unpaidMembers = max(0, $totalMembers - $paidMembers);

        $members = Member::where('organization_id', $orgId)
            ->with(['duesPayments' => function ($q) use ($year) {
                $q->whereYear('payment_date', $year);
            }])
            ->take(50)
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'summary' => [
                    'total_members' => $totalMembers,
                    'paid_members' => $paidMembers,
                    'unpaid_members' => $unpaidMembers,
                    'collected_amount' => $paidMembers * 50000,
                    'unpaid_amount' => $unpaidMembers * 50000,
                    'percentage' => $totalMembers > 0 ? round(($paidMembers / $totalMembers) * 100, 1) : 0,
                ],
                'members' => $members,
            ]
        ]);
    }

    public function recordPayment(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $validated = $request->validate([
            'dues_id' => 'required|exists:dues,id',
            'member_id' => 'required|exists:members,id',
            'amount' => 'required|numeric|min:1',
            'payment_date' => 'required|date',
        ]);

        return DB::transaction(function () use ($validated, $request, $orgId) {
            $member = Member::findOrFail($validated['member_id']);
            $dues = Dues::findOrFail($validated['dues_id']);

            // Find or create Iuran category
            $category = Category::firstOrCreate([
                'organization_id' => $orgId,
                'name' => 'Iuran bulanan',
                'type' => 'income',
            ]);

            // Create Transaction atomically
            $tx = Transaction::create([
                'organization_id' => $orgId,
                'category_id' => $category->id,
                'user_id' => $request->user()?->id,
                'transaction_type' => 'income',
                'amount' => $validated['amount'],
                'description' => "Pembayaran {$dues->name} · {$member->name}",
                'transaction_date' => $validated['payment_date'],
                'status' => 'Tercatat',
            ]);

            // Create Dues Payment
            $payment = DuesPayment::create([
                'organization_id' => $orgId,
                'dues_id' => $dues->id,
                'member_id' => $member->id,
                'amount' => $validated['amount'],
                'payment_date' => $validated['payment_date'],
                'status' => 'Lunas',
                'transaction_id' => $tx->id,
            ]);

            // Audit log
            AuditLog::create([
                'organization_id' => $orgId,
                'user_id' => $request->user()?->id,
                'action' => 'RECORD_DUES_PAYMENT',
                'description' => "Mencatat iuran {$member->name} senilai Rp" . number_format($validated['amount'], 0, ',', '.'),
                'created_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Pembayaran iuran berhasil dicatat',
                'data' => $payment->load(['member:id,name', 'dues:id,name']),
            ], 201);
        });
    }
}
