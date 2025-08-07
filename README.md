# Aplikasi ATKita

Aplikasi ATKita adalah aplikasi manajemen barang dan pengeluaran berbasis web yang menggunakan **React.js** di sisi client, **Express.js** di sisi server, dan **MySQL** sebagai database.

## Struktur Proyek
Berikut adalah struktur proyek aplikasi ini:

```
├── client/
│   ├── public/
│   ├── src/
│   └── package.json
├── server/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   ├── atkita.sql
│   └── package.json
└── README.md
```

## Langkah-langkah Menjalankan Aplikasi

### 1. Persiapan Database MySQL dengan XAMPP

1.  **Install XAMPP** (jika belum terinstal).
2.  **Jalankan Apache dan MySQL** melalui control panel XAMPP.
3.  **Setup Database**: Buka `http://localhost/phpmyadmin`, buat database bernama `atkita`, lalu impor file `atkita.sql` dari folder `server/` untuk membuat tabel dan mengisi data awal.

### 2. Menjalankan Backend (Express.js)

1.  Buka terminal atau command prompt dan masuk ke folder `server/`:
    ```bash
    cd server
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Jalankan server:
    ```bash
    npm start
    ```
    Server akan berjalan di `http://localhost:5000`.

### 3. Menjalankan Frontend (React.js)

1.  Buka terminal baru dan masuk ke folder `client/`:
    ```bash
    cd client
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Jalankan aplikasi React:
    ```bash
    npm start
    ```
    Aplikasi akan terbuka di `http://localhost:3000`.

### 4. Fitur Utama
-   **Daftar Barang**: Melihat daftar barang yang tersedia.
-   **Pengeluaran**: Mencatat pengeluaran barang.
-   **Riwayat Log**: Melihat riwayat transaksi barang masuk dan keluar.
-   **Export PDF**: Mengekspor data barang dan riwayat log ke format PDF.

### 5. Troubleshooting
-   **CORS Error**: Pastikan Anda sudah mengaktifkan CORS di file `server.js` dengan kode berikut:
    ```javascript
    const cors = require("cors");
    app.use(cors());
    ```
-   **Koneksi Database**: Pastikan MySQL berjalan dan database `atkita` sudah dibuat.
-   **File .env**: Jika menggunakan file `.env` untuk konfigurasi database, pastikan file tersebut ada di folder `server/` dan sudah diatur dengan benar.

## Cara Setup XAMPP dan Import Database

### Langkah 1: Menjalankan MySQL di XAMPP
1.  Buka aplikasi **XAMPP Control Panel**.
2.  Cari modul **Apache** dan **MySQL**.
3.  Klik tombol **Start** pada kedua modul tersebut. Statusnya akan berubah menjadi hijau jika berhasil.

### Langkah 2: Membuat Database Baru
1.  Buka browser web dan kunjungi alamat `http://localhost/phpmyadmin`.
2.  Di sisi kiri, klik tombol **New** untuk membuat database baru.
3.  Masukkan nama database **`atkita`** pada kolom yang tersedia, lalu klik tombol **Create**.

### Langkah 3: Mengimpor File SQL
1.  Setelah database `atkita` berhasil dibuat, klik nama database tersebut di sisi kiri.
2.  Pilih tab **Import** di bagian atas.
3.  Klik tombol **Choose File** dan cari file `atkita.sql` yang ada di dalam folder `server/` proyek Anda.
4.  Gulir ke bawah dan klik tombol **Go** untuk memulai proses impor.
5.  Jika impor berhasil, akan muncul pesan konfirmasi dan tabel-tabel database akan terlihat di sisi kiri.
