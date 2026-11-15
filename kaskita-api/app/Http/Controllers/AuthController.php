<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Organization;
use App\Models\Role;
use App\Models\AuditLog;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validated = $request->validate([
            'organization_name' => 'required|string|max:255',
            'organization_type' => 'required|string|max:100',
            'user_name' => 'required|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'required|string|max:50',
            'password' => 'required|string|min:6',
        ]);

        return DB::transaction(function () use ($validated) {
            // 1. Create Organization
            $org = Organization::create([
                'name' => $validated['organization_name'],
                'organization_type' => $validated['organization_type'],
                'phone' => $validated['phone'],
            ]);

            // 2. Email fallback if not provided
            $email = $validated['email'] ?? 'admin@' . strtolower(preg_replace('/[^a-zA-Z0-9]/', '', $validated['organization_name'])) . '.kaskita.id';

            // 3. Create User
            $user = User::create([
                'name' => $validated['user_name'],
                'email' => $email,
                'phone' => $validated['phone'],
                'password' => Hash::make($validated['password']),
            ]);

            // 4. Assign Admin Role
            $adminRole = Role::where('name', 'Admin')->first() ?? Role::create(['name' => 'Admin']);
            $user->organizations()->attach($org->id, [
                'role_id' => $adminRole->id,
                'status' => 'active',
            ]);

            // 5. Default categories
            $org->categories()->createMany([
                ['name' => 'Iuran bulanan', 'type' => 'income'],
                ['name' => 'Donasi warga', 'type' => 'income'],
                ['name' => 'Kebersihan', 'type' => 'expense'],
                ['name' => 'Keamanan', 'type' => 'expense'],
                ['name' => 'Operasional', 'type' => 'expense'],
            ]);

            // 6. Default dues
            $org->dues()->create([
                'name' => 'Iuran bulanan',
                'amount' => 50000,
                'period_type' => 'monthly',
            ]);

            // 7. Audit log
            AuditLog::create([
                'organization_id' => $org->id,
                'user_id' => $user->id,
                'action' => 'REGISTER_ORGANIZATION',
                'description' => "Registrasi organisasi {$org->name} oleh {$user->name}",
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json([
                'success' => true,
                'message' => 'Registrasi organisasi berhasil',
                'data' => [
                    'user' => $user,
                    'organization' => $org,
                    'role' => $adminRole->name,
                    'token' => $token,
                ]
            ], 201);
        });
    }

    public function login(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $validated['email'])
            ->orWhere('phone', $validated['email'])
            ->first();

        if (!$user || !Hash::check($validated['password'], $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Email/No. HP atau kata sandi tidak sesuai',
            ], 401);
        }

        $org = $user->organizations()->first();
        $role = $org ? $user->roleInOrganization($org->id) : null;

        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login berhasil',
            'data' => [
                'user' => $user,
                'organization' => $org,
                'role' => $role?->name ?? 'User',
                'token' => $token,
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()?->currentAccessToken()?->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil'
        ]);
    }

    public function me(Request $request)
    {
        $user = $request->user();
        $org = $user->organizations()->first();
        $role = $org ? $user->roleInOrganization($org->id) : null;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'organization' => $org,
                'role' => $role?->name ?? 'User',
            ]
        ]);
    }
}
