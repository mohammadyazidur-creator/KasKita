<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Transaction;
use App\Models\Category;
use App\Models\AuditLog;
use Carbon\Carbon;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $query = Transaction::where('organization_id', $orgId)->with('category:id,name');

        if ($request->has('type') && in_array($request->type, ['income', 'expense'])) {
            $query->where('transaction_type', $request->type);
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where('description', 'ilike', "%{$search}%");
        }

        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('transaction_date', [$request->start_date, $request->end_date]);
        }

        $perPage = $request->input('per_page', 15);
        $transactions = $query->orderBy('transaction_date', 'desc')->orderBy('id', 'desc')->paginate($perPage);

        // Summaries
        $totalIncome = (float) Transaction::where('organization_id', $orgId)->where('transaction_type', 'income')->sum('amount');
        $totalExpense = (float) Transaction::where('organization_id', $orgId)->where('transaction_type', 'expense')->sum('amount');

        return response()->json([
            'success' => true,
            'data' => $transactions->items(),
            'meta' => [
                'current_page' => $transactions->currentPage(),
                'last_page' => $transactions->lastPage(),
                'total' => $transactions->total(),
                'per_page' => $transactions->perPage(),
            ],
            'summary' => [
                'total_income' => $totalIncome,
                'total_expense' => $totalExpense,
                'net_cashflow' => $totalIncome - $totalExpense,
            ]
        ]);
    }

    public function store(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $validated = $request->validate([
            'description' => 'required|string|max:255',
            'amount' => 'required|numeric|min:1',
            'transaction_type' => 'required|in:income,expense',
            'category_id' => 'nullable|exists:categories,id',
            'category_name' => 'nullable|string',
            'transaction_date' => 'required|date',
            'receipt' => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:5120',
        ]);

        return DB::transaction(function () use ($validated, $request, $orgId) {
            $categoryId = $validated['category_id'] ?? null;
            if (!$categoryId && !empty($validated['category_name'])) {
                $cat = Category::firstOrCreate([
                    'organization_id' => $orgId,
                    'name' => $validated['category_name'],
                    'type' => $validated['transaction_type'],
                ]);
                $categoryId = $cat->id;
            }

            $receiptPath = null;
            if ($request->hasFile('receipt')) {
                $receiptPath = $request->file('receipt')->store('receipts', 'public');
            }

            $tx = Transaction::create([
                'organization_id' => $orgId,
                'category_id' => $categoryId,
                'user_id' => $request->user()?->id,
                'transaction_type' => $validated['transaction_type'],
                'amount' => $validated['amount'],
                'description' => $validated['description'],
                'transaction_date' => $validated['transaction_date'],
                'receipt_path' => $receiptPath,
                'status' => 'Tercatat',
            ]);

            AuditLog::create([
                'organization_id' => $orgId,
                'user_id' => $request->user()?->id,
                'action' => 'CREATE_TRANSACTION',
                'description' => "Menambahkan transaksi {$tx->transaction_type} senilai Rp" . number_format($tx->amount, 0, ',', '.') . " ({$tx->description})",
                'created_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil dicatat',
                'data' => $tx->load('category:id,name'),
            ], 201);
        });
    }

    public function show($id, Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $tx = Transaction::where('organization_id', $orgId)->with(['category:id,name', 'user:id,name'])->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $tx,
        ]);
    }

    public function destroy($id, Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $tx = Transaction::where('organization_id', $orgId)->findOrFail($id);

        return DB::transaction(function () use ($tx, $request, $orgId) {
            $desc = $tx->description;
            $amt = $tx->amount;
            $tx->delete();

            AuditLog::create([
                'organization_id' => $orgId,
                'user_id' => $request->user()?->id,
                'action' => 'DELETE_TRANSACTION',
                'description' => "Menghapus transaksi senilai Rp" . number_format($amt, 0, ',', '.') . " ({$desc})",
                'created_at' => now(),
            ]);

            return response()->json([
                'success' => true,
                'message' => 'Transaksi berhasil dihapus',
            ]);
        });
    }
}
