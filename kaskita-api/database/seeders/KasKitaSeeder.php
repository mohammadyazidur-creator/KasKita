<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\Organization;
use App\Models\User;
use App\Models\Role;
use App\Models\Permission;
use App\Models\Category;
use App\Models\Member;
use App\Models\Dues;
use App\Models\Transaction;
use App\Models\DuesPayment;
use App\Models\AuditLog;

class KasKitaSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        $adminRole = Role::firstOrCreate(['name' => 'Admin'], ['description' => 'Mengelola seluruh fitur dan pengguna']);
        $treasurerRole = Role::firstOrCreate(['name' => 'Bendahara'], ['description' => 'Mengelola transaksi, iuran, dan laporan']);
        $officerRole = Role::firstOrCreate(['name' => 'Pengurus'], ['description' => 'Melihat informasi dan mengelola data']);
        $memberRole = Role::firstOrCreate(['name' => 'Warga'], ['description' => 'Melihat informasi keuangan dan status iuran']);

        // 2. Permissions
        $modules = ['transactions', 'members', 'dues', 'reports', 'settings'];
        $actions = ['view', 'create', 'update', 'delete', 'export'];
        foreach ($modules as $module) {
            foreach ($actions as $action) {
                $perm = Permission::firstOrCreate([
                    'name' => "{$module}.{$action}",
                    'module' => $module,
                    'action' => $action,
                ]);
                $adminRole->permissions()->syncWithoutDetaching([$perm->id]);
                if (in_array($module, ['transactions', 'dues', 'reports']) || ($module === 'members' && $action !== 'delete')) {
                    $treasurerRole->permissions()->syncWithoutDetaching([$perm->id]);
                }
            }
        }

        // 3. Organization
        $org = Organization::firstOrCreate(
            ['name' => 'RT 05 / RW 08 Sukamaju'],
            [
                'organization_type' => 'RT / RW',
                'phone' => '021-555-0123',
                'address' => 'Jl. Melati No. 1, Kelurahan Sukamaju',
            ]
        );

        // 4. Users
        $budi = User::firstOrCreate(
            ['email' => 'budi@kaskita.id'],
            [
                'name' => 'Budi Santoso',
                'password' => Hash::make('password123'),
                'phone' => '0812-3456-7890',
            ]
        );
        $budi->organizations()->syncWithoutDetaching([$org->id => ['role_id' => $treasurerRole->id, 'status' => 'active']]);

        $rizky = User::firstOrCreate(
            ['email' => 'rizky@kaskita.id'],
            [
                'name' => 'Rizky Ramadhan',
                'password' => Hash::make('password123'),
                'phone' => '0812-1111-2222',
            ]
        );
        $rizky->organizations()->syncWithoutDetaching([$org->id => ['role_id' => $adminRole->id, 'status' => 'active']]);

        $andi = User::firstOrCreate(
            ['email' => 'andi@kaskita.id'],
            [
                'name' => 'Andi Pratama',
                'password' => Hash::make('password123'),
                'phone' => '0812-3333-4444',
            ]
        );
        $andi->organizations()->syncWithoutDetaching([$org->id => ['role_id' => $officerRole->id, 'status' => 'active']]);

        $siti = User::firstOrCreate(
            ['email' => 'siti@kaskita.id'],
            [
                'name' => 'Siti Aminah',
                'password' => Hash::make('password123'),
                'phone' => '0813-8822-1144',
            ]
        );
        $siti->organizations()->syncWithoutDetaching([$org->id => ['role_id' => $memberRole->id, 'status' => 'active']]);

        // 5. Categories
        $catIuran = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Iuran bulanan', 'type' => 'income']);
        $catDonasi = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Donasi warga', 'type' => 'income']);
        Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Infaq & sedekah', 'type' => 'income']);
        $catKasAwal = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Kas awal', 'type' => 'income']);

        $catKebersihan = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Kebersihan', 'type' => 'expense']);
        $catKeamanan = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Keamanan', 'type' => 'expense']);
        $catSosial = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Sosial', 'type' => 'expense']);
        $catOperasional = Category::firstOrCreate(['organization_id' => $org->id, 'name' => 'Operasional', 'type' => 'expense']);

        // 6. Dues
        $duesBulanan = Dues::firstOrCreate(
            ['organization_id' => $org->id, 'name' => 'Iuran bulanan'],
            ['amount' => 50000, 'period_type' => 'monthly', 'start_date' => '2026-01-01', 'end_date' => '2026-12-31']
        );
        Dues::firstOrCreate(
            ['organization_id' => $org->id, 'name' => 'Infaq'],
            ['amount' => 0, 'period_type' => 'voluntary']
        );
        Dues::firstOrCreate(
            ['organization_id' => $org->id, 'name' => 'Sumbangan'],
            ['amount' => 0, 'period_type' => 'incidental']
        );

        // 7. Members (128 total as in Figma)
        $sampleMembers = [
            ['name' => 'Budi Santoso', 'address' => 'Blok A1 No. 04, RT 05', 'phone' => '0812-3456-7890'],
            ['name' => 'Siti Aminah', 'address' => 'Blok A1 No. 06, RT 05', 'phone' => '0813-8822-1144'],
            ['name' => 'Agus Pratama', 'address' => 'Blok A2 No. 01, RT 05', 'phone' => '0856-9911-3322'],
            ['name' => 'Dewi Lestari', 'address' => 'Blok A2 No. 05, RT 05', 'phone' => '0819-4455-6677'],
            ['name' => 'Hendra Gunawan', 'address' => 'Blok B1 No. 02, RT 05', 'phone' => '0877-2233-4455'],
            ['name' => 'Rina Wulandari', 'address' => 'Blok B1 No. 08, RT 05', 'phone' => '0812-8877-6655'],
            ['name' => 'Bambang Sudiro', 'address' => 'Blok B2 No. 03, RT 05', 'phone' => '0813-5566-7788'],
            ['name' => 'Ratna Sari', 'address' => 'Blok B2 No. 07, RT 05', 'phone' => '0857-1122-3344'],
        ];

        for ($i = 1; $i <= 128; $i++) {
            $base = $sampleMembers[($i - 1) % count($sampleMembers)];
            $name = $i <= count($sampleMembers) ? $base['name'] : "Warga {$i} (" . $base['name'] . ")";
            $member = Member::firstOrCreate(
                ['organization_id' => $org->id, 'name' => $name],
                [
                    'address' => "Blok " . chr(65 + ($i % 4)) . (floor($i / 4) + 1) . " No. " . ($i % 20 + 1) . ", RT 05",
                    'phone' => "0812-" . sprintf('%04d', $i) . "-" . sprintf('%04d', 1000 + $i),
                    'status' => 'active',
                ]
            );

            // 112 members are paid (lunas), 16 unpaid
            $isPaid = $i <= 112;
            if ($isPaid) {
                DuesPayment::firstOrCreate(
                    [
                        'organization_id' => $org->id,
                        'dues_id' => $duesBulanan->id,
                        'member_id' => $member->id,
                        'payment_date' => '2026-11-05',
                    ],
                    [
                        'amount' => 50000,
                        'status' => 'Lunas',
                    ]
                );
            }
        }

        // 8. Transactions
        // Baseline kas awal agar total saldo = 22.450.000
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Saldo awal kas RT 05 Sukamaju'],
            [
                'category_id' => $catKasAwal->id,
                'user_id' => $budi->id,
                'transaction_type' => 'income',
                'amount' => 17800000,
                'transaction_date' => '2026-10-31',
                'status' => 'Tercatat',
            ]
        );

        // November Transactions:
        // Pemasukan November (Total Rp8.500.000)
        // Iuran warga: 112 x 50.000 = Rp5.600.000
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Iuran warga kolektif November'],
            [
                'category_id' => $catIuran->id,
                'user_id' => $budi->id,
                'transaction_type' => 'income',
                'amount' => 5600000,
                'transaction_date' => '2026-11-05',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Donasi kegiatan warga'],
            [
                'category_id' => $catDonasi->id,
                'user_id' => $budi->id,
                'transaction_type' => 'income',
                'amount' => 2200000,
                'transaction_date' => '2026-11-13',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Iuran warga · November (TRX-0248)'],
            [
                'category_id' => $catIuran->id,
                'user_id' => $budi->id,
                'transaction_type' => 'income',
                'amount' => 150000,
                'transaction_date' => '2026-11-14',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Donasi tambahan warga'],
            [
                'category_id' => $catDonasi->id,
                'user_id' => $budi->id,
                'transaction_type' => 'income',
                'amount' => 500000,
                'transaction_date' => '2026-11-14',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Iuran · Siti Aminah'],
            [
                'category_id' => $catIuran->id,
                'user_id' => $budi->id,
                'transaction_type' => 'income',
                'amount' => 50000,
                'transaction_date' => '2026-11-12',
                'status' => 'Tercatat',
            ]
        );

        // Pengeluaran November (Total Rp3.850.000):
        // Kebersihan: 39% = 1.500.000
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Honor petugas kebersihan lingkungan'],
            [
                'category_id' => $catKebersihan->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 1250000,
                'transaction_date' => '2026-11-08',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Pembelian alat kebersihan'],
            [
                'category_id' => $catKebersihan->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 250000,
                'transaction_date' => '2026-11-10',
                'status' => 'Menunggu',
            ]
        );

        // Keamanan: 32% = 1.232.000 -> pos ronda + honor jaga
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Honor hansip pos jaga malam'],
            [
                'category_id' => $catKeamanan->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 882000,
                'transaction_date' => '2026-11-09',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Tagihan listrik pos ronda'],
            [
                'category_id' => $catKeamanan->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 350000,
                'transaction_date' => '2026-11-12',
                'status' => 'Tercatat',
            ]
        );

        // Sosial: 20% = 770.000
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Bantuan warga sakit (Pak Joko)'],
            [
                'category_id' => $catSosial->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 750000,
                'transaction_date' => '2026-11-11',
                'status' => 'Tercatat',
            ]
        );
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Santunan warga takziah'],
            [
                'category_id' => $catSosial->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 20000,
                'transaction_date' => '2026-11-11',
                'status' => 'Tercatat',
            ]
        );

        // Operasional: 9% = 348.000
        Transaction::firstOrCreate(
            ['organization_id' => $org->id, 'description' => 'Pengadaan ATK & Buku Kas RT'],
            [
                'category_id' => $catOperasional->id,
                'user_id' => $budi->id,
                'transaction_type' => 'expense',
                'amount' => 348000,
                'transaction_date' => '2026-11-06',
                'status' => 'Tercatat',
            ]
        );

        // 9. Audit Log
        AuditLog::firstOrCreate(
            ['organization_id' => $org->id, 'action' => 'INIT_ORGANIZATION'],
            [
                'user_id' => $rizky->id,
                'description' => 'Inisialisasi sistem kas organisasi RT 05 / RW 08 Sukamaju',
                'created_at' => now(),
            ]
        );
    }
}
