# Aplikasi ATKita

Aplikasi ATKita adalah aplikasi manajemen barang dan pengeluaran berbasis web yang menggunakan **React.js** di sisi client, **Express.js** di sisi server, dan **MySQL** sebagai database.

## Struktur Proyek
Berikut adalah struktur proyek aplikasi ini:

├── client/ # Folder untuk file aplikasi React.js (client-side)
│ ├── public/ # Public files like index.html, etc.
│ ├── src/ # Source code React.js
│ └── package.json # Dependencies & Scripts untuk React
├── server/ # Folder untuk aplikasi Express.js (server-side)
│ ├── models/ # Folder untuk model database
│ ├── routes/ # Folder untuk routing Express
│ ├── server.js # Entry point server Express.js
│ ├── atkita.sql # File SQL untuk membuat dan mengisi database
│ └── package.json # Dependencies & Scripts untuk server Express
└── README.md # Dokumentasi aplikasi ini


## Langkah-langkah Menjalankan Aplikasi

### 1. Persiapkan MySQL dengan XAMPP

1. **Install XAMPP** (jika belum terinstal):
   - Download XAMPP dari [sini](https://www.apachefriends.org/index.html) dan ikuti instruksi instalasi.
   
2. **Jalankan XAMPP**:
   - Buka XAMPP dan pastikan **MySQL** dan **Apache** berjalan.

3. **Setup Database**:
   - Buka **phpMyAdmin** di browser Anda (biasanya di `http://localhost/phpmyadmin`).
   - Buat database baru dengan nama `atkita`.
   - Setelah database dibuat, buka tab **SQL** dan impor file `atkita.sql` yang ada di folder `server/` untuk membuat tabel dan data awal.

### 2. Menjalankan Backend (Express.js)

1. **Navigasi ke folder `server/`**:
   - Buka terminal atau command prompt.
   - Masuk ke direktori `server`:
     ```bash
     cd server
     ```

2. **Install dependencies**:
   - Pastikan Anda sudah memiliki **Node.js** terinstal di komputer Anda.
   - Install dependencies backend:
     ```bash
     npm install
     ```

3. **Jalankan Server**:
   - Setelah dependencies terinstall, jalankan server:
     ```bash
     npm start
     ```
   - Server akan berjalan di `http://localhost:5000`.

### 3. Menjalankan Frontend (React.js)

1. **Navigasi ke folder `client/`**:
   - Di terminal yang berbeda, masuk ke folder `client`:
     ```bash
     cd client
     ```

2. **Install dependencies**:
   - Install dependencies frontend:
     ```bash
     npm install
     ```

3. **Jalankan Aplikasi React**:
   - Jalankan aplikasi React di localhost:
     ```bash
     npm start
     ```
   - Aplikasi akan terbuka di `http://localhost:3000`.

### 4. Mengakses Aplikasi
- **Frontend**: Akses aplikasi di browser melalui `http://localhost:3000`.
- **Backend**: API server Express berjalan di `http://localhost:5000`.

### 5. Fitur Aplikasi
Aplikasi ATKita memiliki beberapa fitur utama:
- **Input Barang**: Menambahkan barang baru ke dalam sistem.
- **Daftar Barang**: Melihat daftar barang yang tersedia.
- **Pengeluaran**: Mencatat pengeluaran barang.
- **Riwayat Pengeluaran**: Melihat riwayat transaksi barang masuk dan keluar.

### 6. Fitur Export
- **Export PDF**: Menyediakan fitur untuk mengekspor data barang dan riwayat log ke dalam format PDF.

### 7. Menambahkan Data Barang, Pengeluaran, dan Log
1. **Barang**: Anda dapat menambah barang baru yang akan muncul di daftar barang.
2. **Pengeluaran**: Anda bisa mencatat pengeluaran dengan memilih barang yang ada.
3. **Log History**: Sistem secara otomatis mencatat transaksi barang masuk dan keluar.

## Troubleshooting

### 1. CORS Error
Jika Anda mengalami error terkait CORS (Cross-Origin Resource Sharing) pada saat frontend dan backend berkomunikasi:
- Pastikan di `server.js`, Anda sudah mengaktifkan CORS dengan kode berikut:
  ```javascript
  const cors = require("cors");
  app.use(cors());

2. Database Tidak Terhubung
Pastikan Anda sudah menjalankan MySQL dan database atkita sudah ada. Anda juga harus memastikan server Express terhubung ke database dengan benar.

3. File .env
Jika menggunakan .env untuk mengonfigurasi koneksi database, pastikan file .env ada di folder server/ dan telah diatur dengan benar.

Dengan langkah-langkah ini, Anda seharusnya bisa menjalankan aplikasi ATKita dengan baik. Jika ada pertanyaan lebih lanjut, jangan ragu untuk menghubungi kami!


### **Penjelasan**:
- **Pemasangan XAMPP**: Membahas setup MySQL di localhost.
- **Backend**: Menjelaskan cara menjalankan server Express.js dan menghubungkannya dengan database.
- **Frontend**: Menjelaskan bagaimana menjalankan aplikasi React.
- **Fitur**: Menyebutkan fitur aplikasi seperti pengelolaan barang, pengeluaran, riwayat log, dan ekspor PDF.
- **Troubleshooting**: Memberikan solusi jika ada masalah umum saat menghubungkan frontend dan backend.

Dengan `README.md` ini, pengguna lain bisa dengan mudah mengikuti langkah-langkah yang diperlukan untuk menjalankan aplikasi di lingkungan mereka.
