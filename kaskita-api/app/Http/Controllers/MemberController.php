<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Member;
use App\Models\AuditLog;

class MemberController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $query = Member::where('organization_id', $orgId)->withCount(['duesPayments as is_paid_this_month' => function ($q) {
            $q->where('status', 'Lunas');
        }]);

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('name', 'ilike', "%{$s}%")
                  ->orWhere('address', 'ilike', "%{$s}%")
                  ->orWhere('phone', 'ilike', "%{$s}%");
            });
        }

        if ($request->filled('status')) {
            if ($request->status === 'Lunas') {
                $query->has('duesPayments');
            } elseif ($request->status === 'Belum Lunas') {
                $query->doesntHave('duesPayments');
            }
        }

        $perPage = $request->input('per_page', 20);
        $members = $query->orderBy('name', 'asc')->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => $members->items(),
            'meta' => [
                'current_page' => $members->currentPage(),
                'last_page' => $members->lastPage(),
                'total' => $members->total(),
            ]
        ]);
    }

    public function store(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        $member = Member::create([
            'organization_id' => $orgId,
            'name' => $validated['name'],
            'address' => $validated['address'] ?? null,
            'phone' => $validated['phone'] ?? null,
            'status' => 'active',
        ]);

        AuditLog::create([
            'organization_id' => $orgId,
            'user_id' => $request->user()?->id,
            'action' => 'CREATE_MEMBER',
            'description' => "Menambahkan anggota baru: {$member->name}",
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Anggota berhasil ditambahkan',
            'data' => $member,
        ], 201);
    }

    public function destroy($id, Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $member = Member::where('organization_id', $orgId)->findOrFail($id);
        $name = $member->name;
        $member->delete();

        AuditLog::create([
            'organization_id' => $orgId,
            'user_id' => $request->user()?->id,
            'action' => 'DELETE_MEMBER',
            'description' => "Menghapus data anggota: {$name}",
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Data anggota berhasil dihapus',
        ]);
    }
}
