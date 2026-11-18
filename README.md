# KasKita – Sistem Manajemen Kas Organisasi

Aplikasi web manajemen keuangan organisasi modern yang dirancang untuk membantu pengurus organisasi (RT/RW, masjid, koperasi, komunitas, dan organisasi sejenis) dalam mengelola kas, transaksi pemasukan & pengeluaran, data anggota, pembayaran iuran, serta laporan keuangan secara transparan, terstruktur, dan akuntabel.

---

## 🚀 Teknologi Utama

- **Frontend:** React 19 + TypeScript + Tailwind CSS + Vite + Motion (`motion/react`)
- **Backend:** Laravel 10 (PHP 8.1+)
- **Database:** PostgreSQL 16
- **Autentikasi:** Laravel Sanctum (Token-based Auth)
- **Komunikasi:** RESTful API (JSON)
- **Desain UI:** 100% presisi sesuai 10 frame Figma KasKita

---

## 📱 Modul & Layar Sesuai Desain Figma

1. **01 · Masuk (`AuthLogin`):** Halaman login aman dengan visual hero branding dan benefit transparansi kas.
2. **02 · Daftar Organisasi (`AuthRegister`):** Registrasi instan untuk RT/RW, Masjid, Koperasi, dan Organisasi.
3. **03 · Dashboard Utama (`Dashboard`):** 4 metrik keuangan (*Saldo Kas, Pemasukan, Pengeluaran, Anggota*), grafik arus kas 12 bulan, diagram donat pengeluaran, mutasi transaksi terbaru, dan pengingat tunggakan.
4. **04 · Transaksi (`Transactions`):** Riwayat transaksi lengkap, filter multi-kategori, pencarian cepat, segmented tabs, dan pagination.
5. **05 · Tambah Transaksi (`AddTransactionModal`):** Modal pencatatan arus kas atomik dengan jenis pemasukan/pengeluaran, kategori dinamis, dan unggah nota/bukti.
6. **06 · Data Anggota (`Members`):** Manajemen warga, rekap status pembayaran (*Lunas / Belum Lunas*), dan fitur impor Excel.
7. **07 · Iuran (`Dues`):** Manajemen iuran bulanan, infaq sukarela, sumbangan insidental, progress penagihan, matriks tahunan, serta pengingat WhatsApp.
8. **08 · Laporan Keuangan (`Reports`):** Laporan surplus/defisit, diagram tren 6 bulan, distribusi pos pengeluaran, serta ekspor dokumen PDF & Excel.
9. **09 · Pengaturan (`Settings`):** Pengaturan identitas organisasi dan Role-Based Access Control (Admin, Bendahara, Pengurus, Warga).
10. **10 · Sidebar Interaktif (`Sidebar`):** Dukungan sidebar ciutkan/perluas dengan animasi spring Motion yang halus.

---

## 📁 Struktur Direktori

```text
KasKita/
├── src/                          # Frontend React + TypeScript
│   ├── assets/                   # Aset gambar & ikon SVG/PNG lokal (140+ aset)
│   ├── components/               # Komponen UI tiap layar Figma
│   ├── services/                 # Layer API Client terintegrasi dengan backend
│   ├── types/                    # Definisi tipe TypeScript
│   ├── App.tsx                   # Master Controller & Routing
│   └── main.tsx
├── kaskita-api/                  # Backend Laravel 10
│   ├── app/
│   │   ├── Http/Controllers/     # REST API Controllers (Auth, Dashboard, Tx, dll)
│   │   └── Models/               # Eloquent Models & Relasi Database
│   ├── database/
│   │   ├── migrations/           # 12 Tabel PostgreSQL
│   │   └── seeders/              # Seeder data awal lengkap (128 anggota)
│   └── routes/api.php            # 25 Route REST API
├── package.json
└── vite.config.ts
```

---

## ⚙️ Panduan Menjalankan di Lokal

### 1. Menjalankan Backend Laravel

Pastikan service PostgreSQL aktif dan buat database `kaskita`:

```powershell
cd kaskita-api

# Jalankan migrasi dan isi data awal
php artisan migrate --seed

# Jalankan server API backend (port 8000)
php artisan serve
```

Server backend akan berjalan di `http://127.0.0.1:8000`.

### 2. Menjalankan Frontend React

Buka terminal baru di root folder `KasKita`:

```powershell
# Jalankan server frontend Vite (port 5173)
npm run dev
```

Buka browser di `http://localhost:5173`.

---

## 🔐 Akun Default untuk Pengujian

| Pengguna | Email | Kata Sandi | Role |
|---|---|---|---|
| Budi Santoso | `budi@kaskita.id` | `password123` | Bendahara |
| Rizky Ramadhan | `rizky@kaskita.id` | `password123` | Admin |
| Andi Pratama | `andi@kaskita.id` | `password123` | Pengurus |
| Siti Aminah | `siti@kaskita.id` | `password123` | Warga |

---

## 📄 Lisensi
Proyek KasKita dikembangkan untuk transparansi dan tata kelola keuangan komunitas Indonesia.
