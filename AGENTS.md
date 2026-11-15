# AGENTS.md --- Aturan Pengembangan KasKita

> **Tujuan dokumen:** menjadi sumber aturan utama bagi AI coding agent
> dan developer agar semua perubahan tetap sejalan dengan tujuan produk,
> arsitektur, standar kode, keamanan, dan pola desain KasKita.

## 1. Identitas dan tujuan produk

KasKita adalah aplikasi web manajemen keuangan organisasi (RT/RW,
masjid, koperasi, komunitas, dan organisasi sejenis). Aplikasi membantu
organisasi mengelola anggota, pemasukan, pengeluaran, iuran, saldo, dan
laporan secara transparan serta terkontrol.

Setiap perubahan kode HARUS mendukung tujuan tersebut. Jangan
menambahkan fitur, alur, istilah, atau perilaku yang bertentangan dengan
kebutuhan produk tanpa persetujuan pengguna.

### Modul utama

1.  Authentication dan registrasi organisasi.
2.  Dashboard dan ringkasan keuangan.
3.  Manajemen transaksi pemasukan/pengeluaran.
4.  Manajemen anggota.
5.  Manajemen iuran dan pembayaran.
6.  Laporan keuangan dan ekspor.
7.  Pengaturan organisasi, pengguna, role, dan permission.
8.  Audit log untuk aktivitas penting.

## 2. Sumber kebenaran dan aturan konsistensi

Urutan prioritas saat menemukan informasi yang berbeda:

1.  Instruksi terbaru yang eksplisit dari pengguna.
2.  Dokumen kebutuhan/PRD KasKita yang disetujui.
3.  Kontrak API dan skema database yang sudah diterapkan.
4.  Pola dan implementasi kode yang sudah ada serta telah diuji.
5.  Dokumen atau asumsi lain.

Jangan menebak ketika sumber saling bertentangan. Hentikan perubahan
yang terdampak, jelaskan konflik beserta file/baris terkait, lalu minta
keputusan pengguna.

Sebelum mengubah kode: - Periksa struktur folder, `package.json`,
`composer.json`, route, migration, model, service, komponen, dan pola
yang sudah ada. - Cari implementasi serupa sebelum membuat implementasi
baru. - Periksa seluruh pemanggil, dependensi, tipe data, API contract,
dan test yang terdampak. - Jangan menganggap nama file atau deskripsi
lama pasti sesuai dengan implementasi saat ini.

Setelah mengubah kode: - Perbarui semua pemanggil dan tipe terkait agar
tidak ada kontrak yang berbeda. - Perbarui dokumentasi bila perilaku,
API, konfigurasi, atau skema berubah. - Jalankan pemeriksaan dan test
yang relevan. - Laporkan perubahan, file yang disentuh, hasil test, dan
hal yang belum diverifikasi.

## 3. Arsitektur yang harus dipertahankan

-   **Frontend:** React + TypeScript + Tailwind CSS.
-   **Backend:** Laravel (PHP).
-   **Database:** PostgreSQL.
-   **Komunikasi frontend-backend:** REST API dengan JSON.
-   **Autentikasi API:** Laravel Sanctum, kecuali keputusan proyek yang
    telah disetujui menentukan lain.

Pisahkan tanggung jawab: - React menangani tampilan, interaksi, validasi
pengalaman pengguna, dan pemanggilan API. - Laravel menangani aturan
bisnis, validasi otoritatif, autentikasi, otorisasi, dan akses data. -
PostgreSQL menyimpan data secara terstruktur dan menjaga integritas
relasi.

Jangan memindahkan aturan bisnis penting hanya ke frontend. Validasi
frontend tidak menggantikan validasi backend.

Jangan mengganti teknologi inti, menambahkan framework besar, atau
mengubah arsitektur tanpa persetujuan pengguna.

## 4. Aturan desain dan integrasi frontend

-   Pertahankan desain Figma KasKita yang sudah diimplementasikan: tata
    letak, warna, tipografi, jarak, komponen, responsivitas, dan pola
    interaksi.
-   Jangan mengubah desain, isi, label, atau alur layar yang sudah ada
    kecuali diminta atau diperlukan untuk memperbaiki bug yang telah
    dijelaskan.
-   Utamakan komponen reusable untuk elemen yang digunakan berulang,
    misalnya Button, Input, Modal, Table, Badge, Pagination, EmptyState,
    LoadingState, dan ConfirmDialog.
-   Hindari duplikasi markup, styling, dan logika yang sama di banyak
    halaman.
-   Gunakan design tokens/konstanta bersama bila proyek sudah
    memilikinya; jangan membuat nilai warna, spacing, atau ukuran baru
    secara acak.
-   Gunakan komponen dan pola yang sudah ada sebelum membuat variasi
    baru.
-   Pastikan tampilan desktop dan mobile tetap layak.
-   Semua tombol, form, filter, pagination, modal, dan menu harus
    memiliki perilaku nyata; jangan meninggalkan kontrol palsu atau
    sekadar dekorasi.
-   Tampilkan loading, empty, success, dan error state secara konsisten.
-   Jangan menaruh data rahasia atau aturan otorisasi di sisi client.

## 5. Aturan TypeScript dan kualitas frontend

-   Pertahankan TypeScript; hindari `any`. Jika tidak dapat dihindari,
    beri alasan dan batasi cakupannya.
-   Definisikan tipe untuk request, response, entity, props, dan state
    yang digunakan lintas modul.
-   Hindari duplikasi definisi tipe; letakkan tipe bersama di lokasi
    yang sesuai dengan struktur proyek.
-   Pisahkan komponen tampilan dari logika data/API bila kompleksitasnya
    meningkat.
-   Letakkan pemanggilan API di service/API layer bersama, bukan
    menyebarkan URL dan `fetch`/client call ke banyak komponen.
-   Gunakan satu pola penanganan error dan autentikasi untuk semua
    request.
-   Jangan menyimpan token, password, atau data sensitif di log.
-   Hindari dependency baru jika fungsi dapat dipenuhi oleh dependency
    yang sudah tersedia.

## 6. Aturan backend Laravel

-   Gunakan pola Laravel yang sudah dipakai proyek dan versi Laravel
    yang terpasang.
-   Pisahkan tanggung jawab Route, Controller, Form Request,
    Policy/Middleware, Model, dan Service/Action bila memang diperlukan.
-   Controller harus tetap tipis; jangan menumpuk seluruh aturan bisnis
    di controller.
-   Validasi request di backend menggunakan mekanisme Laravel.
-   Gunakan Eloquent relationship dan eager loading secara tepat;
    hindari query berulang/N+1.
-   Gunakan API Resource atau pola response konsisten yang sudah dipilih
    proyek.
-   Gunakan database transaction untuk operasi yang mengubah beberapa
    data yang saling bergantung.
-   Jangan mengembalikan stack trace, query SQL, secret, atau detail
    internal kepada pengguna.
-   Jangan mengubah dependency atau versi PHP/Laravel tanpa alasan dan
    persetujuan.

## 7. Aturan database dan keuangan

-   PostgreSQL adalah sumber penyimpanan utama.
-   Semua perubahan skema harus melalui Laravel migration; jangan
    mengubah database secara manual sebagai pengganti migration.
-   Gunakan foreign key, unique constraint, index, nullable, dan delete
    behavior sesuai kebutuhan relasi.
-   Gunakan tipe numerik presisi seperti `NUMERIC/DECIMAL` untuk nominal
    uang; jangan gunakan floating point untuk perhitungan uang.
-   Tentukan aturan pembulatan dan satuan mata uang secara konsisten
    (default produk: Rupiah/IDR).
-   Simpan tanggal/waktu secara konsisten dan tampilkan sesuai zona
    waktu aplikasi.
-   Jangan menghapus atau mengubah data historis secara diam-diam.
-   Seeder dan factory harus aman untuk development/testing dan tidak
    boleh menimpa data production.
-   Jangan menjalankan perintah destructive, reset, truncate, atau
    migrate-fresh pada database yang belum dipastikan sebagai database
    lokal/test khusus.
-   Jangan pernah memakai database production untuk pengujian.

### Invarian transaksi

-   Pemasukan menambah saldo; pengeluaran mengurangi saldo.
-   Saldo harus berasal dari transaksi sah yang tercatat, bukan angka
    hard-coded.
-   Transaksi harus terikat ke organisasi yang benar.
-   Pembayaran iuran dan pencatatan transaksi terkait harus atomik:
    seluruhnya berhasil atau seluruhnya dibatalkan.
-   Cegah pembayaran ganda untuk anggota dan periode yang sama sesuai
    aturan jenis iurannya.
-   Perubahan/penghapusan transaksi harus dibatasi berdasarkan
    permission dan dicatat dalam audit log.
-   Jangan mengubah status lunas hanya dari state frontend;
    hitung/validasi di backend.

## 8. Multi-organisasi, autentikasi, dan otorisasi

-   Data setiap organisasi harus terisolasi.
-   Setiap query dan operasi harus memastikan pengguna memiliki
    keanggotaan/akses ke organisasi terkait.
-   Jangan mempercayai `organization_id`, `user_id`, `role_id`, atau
    nominal yang dikirim client tanpa verifikasi server.
-   Terapkan authorization pada setiap endpoint yang dilindungi, bukan
    hanya menyembunyikan tombol di UI.
-   Role awal produk: Admin, Bendahara, Pengurus, dan Warga/Anggota. Hak
    akses final mengikuti permission yang disepakati.
-   Terapkan prinsip least privilege: berikan akses minimum yang
    diperlukan.
-   Password wajib di-hash menggunakan mekanisme aman Laravel.
-   Jangan menyimpan secret, kredensial database, token, atau file
    `.env` ke repository.
-   Catat aktivitas sensitif melalui audit log tanpa menyimpan
    password/token atau data rahasia.

## 9. Kontrak API

-   Gunakan prefix dan konvensi endpoint yang konsisten, misalnya
    `/api/...`.
-   Gunakan HTTP method sesuai fungsi: GET, POST, PUT/PATCH, DELETE.
-   Pertahankan bentuk response, penamaan field, format tanggal, format
    nominal, dan format error secara konsisten.
-   Dokumentasikan perubahan endpoint dan contoh request/response.
-   Jika mengubah kontrak API, ubah frontend, tipe TypeScript, service,
    test, dan dokumentasi dalam pekerjaan yang sama.
-   Jangan mengganti nama field atau bentuk response secara sepihak.
-   Gunakan pagination dan filter server-side untuk daftar data yang
    dapat bertambah besar.

## 10. Prinsip reusable dan maintainable

-   Terapkan prinsip DRY tanpa membuat abstraksi berlebihan.
-   Abstraksikan kode ketika ada pola yang benar-benar berulang atau
    memiliki tanggung jawab yang jelas.
-   Komponen UI reusable harus memiliki props yang jelas dan tidak
    terikat pada satu halaman.
-   Logika bisnis bersama harus berada di satu tempat yang dapat diuji,
    bukan disalin ke beberapa controller atau komponen.
-   Gunakan konstanta/enum bersama untuk status, tipe transaksi, dan
    nilai tetap.
-   Hindari file raksasa; pecah berdasarkan tanggung jawab, bukan
    sekadar jumlah baris.
-   Hindari circular dependency dan ketergantungan antar-modul yang
    tidak perlu.
-   Jangan membuat helper generik yang terlalu abstrak untuk satu
    penggunaan sederhana.
-   Jangan membuat komponen, service, tabel, atau endpoint duplikat
    sebelum mencari yang sudah tersedia.

## 11. Testing dan verifikasi

Setiap perubahan harus memiliki pengujian sesuai dampaknya.

Minimal periksa: - Authentication dan authorization. - Isolasi data
antarorganisasi. - Validasi input. - CRUD modul terkait. - Perhitungan
saldo dan laporan. - Pembayaran iuran dan pencegahan duplikasi. - Akses
yang ditolak (401/403). - Error state dan integrasi frontend-backend.

Sebelum menyatakan pekerjaan selesai: 1. Jalankan build frontend. 2.
Jalankan test frontend/lint/typecheck yang tersedia. 3. Jalankan test
Laravel yang relevan. 4. Periksa migration dan relasi database. 5.
Periksa perubahan API dan seluruh pemanggilnya. 6. Laporkan perintah
yang benar-benar dijalankan dan hasilnya.

Jangan mengklaim build/test berhasil jika belum dijalankan atau gagal.
Jika lingkungan tidak memungkinkan test, jelaskan batasannya.

## 12. Aturan perubahan kode untuk AI agent

-   Pahami dahulu, baru ubah.
-   Kerjakan sesuai ruang lingkup permintaan; jangan melakukan refactor
    besar yang tidak diminta.
-   Jangan menghapus fitur, file, data, atau konfigurasi yang sudah ada
    tanpa alasan dan persetujuan.
-   Jangan mengganti desain Figma hanya karena preferensi pribadi.
-   Jangan membuat data dummy sebagai pengganti integrasi backend
    kecuali secara eksplisit diminta untuk mock/demo.
-   Jangan menambahkan package, service eksternal, atau API berbayar
    tanpa menjelaskan kebutuhan dan meminta persetujuan.
-   Jangan mengarang hasil test, status implementasi, atau keberhasilan
    integrasi.
-   Jika ada beberapa pilihan teknis yang berdampak pada struktur data,
    keamanan, atau kontrak API, jelaskan konsekuensinya dan minta
    keputusan sebelum memilih.
-   Jaga perubahan tetap kecil, terarah, dan mudah direview.

## 13. Definition of Done

Pekerjaan dianggap selesai hanya jika: - Sesuai tujuan dan ruang lingkup
KasKita. - Tidak merusak desain atau fitur yang sudah ada. - Mengikuti
arsitektur React + Laravel + PostgreSQL. - Tidak menduplikasi logika
yang sudah tersedia. - Validasi dan authorization diterapkan di
backend. - Kontrak frontend-backend tetap selaras. - Data dan relasi
database konsisten. - Test/build yang relevan berhasil atau kegagalannya
dilaporkan secara jujur. - Dokumentasi diperbarui jika diperlukan. -
Ringkasan perubahan dan risiko disampaikan.

## 14. Format laporan setelah mengerjakan tugas

Setiap agent harus menutup pekerjaan dengan format:

**Tujuan:** apa yang diminta pengguna.

**Analisis:** file dan alur yang diperiksa.

**Perubahan:** file yang dibuat/diubah dan alasannya.

**Konsistensi:** dampak terhadap frontend, backend, API, database, dan
modul lain.

**Pengujian:** perintah yang dijalankan beserta hasil sebenarnya.

**Risiko / pekerjaan tersisa:** hal yang belum selesai atau belum
diverifikasi.

------------------------------------------------------------------------

**Prinsip utama KasKita:** Bangun satu aplikasi yang konsisten, aman,
modular, reusable, dan mudah dikembangkan. Jangan membuat keputusan yang
menyebabkan frontend, backend, database, dokumentasi, atau perilaku
bisnis memiliki definisi yang saling bertentangan.
