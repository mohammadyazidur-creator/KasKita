<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Organization;
use App\Models\User;
use App\Models\AuditLog;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $org = Organization::findOrFail($orgId);

        $users = $org->users()->get()->map(function ($u) use ($org) {
            $role = $u->roleInOrganization($org->id);
            return [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $role?->name ?? 'Warga',
                'status' => $u->pivot->status,
            ];
        });

        return response()->json([
            'success' => true,
            'data' => [
                'organization' => $org,
                'users' => $users,
            ]
        ]);
    }

    public function update(Request $request)
    {
        $orgId = $request->header('X-Organization-Id') ?? $request->user()?->organizations()->first()?->id ?? 1;

        $org = Organization::findOrFail($orgId);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'organization_type' => 'required|string|max:100',
            'phone' => 'nullable|string|max:50',
            'address' => 'nullable|string|max:255',
        ]);

        $org->update($validated);

        AuditLog::create([
            'organization_id' => $org->id,
            'user_id' => $request->user()?->id,
            'action' => 'UPDATE_SETTINGS',
            'description' => "Memperbarui profil organisasi {$org->name}",
            'created_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Pengaturan organisasi berhasil diperbarui',
            'data' => $org,
        ]);
    }
}
