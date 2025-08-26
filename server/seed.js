const db = require("./models/database"); // Pastikan pathnya sesuai dengan konfigurasi proyek Anda

// Data Mock untuk tabel 'barang'
const barangData = [
  { nama: "Pensil", stok: 100, satuan: "Biji" },
  { nama: "Buku Tulis", stok: 50, satuan: "Lembar" },
  { nama: "Pulpen", stok: 200, satuan: "Biji" },
  { nama: "Penghapus", stok: 150, satuan: "Biji" },
  { nama: "Rautan", stok: 75, satuan: "Biji" },
];

// Data Mock untuk tabel 'pengeluaran'
const pengeluaranData = [
  { barang_id: 1, jumlah: 30, tanggal: "2025-08-01", divisi: "Administrasi" },
  { barang_id: 2, jumlah: 20, tanggal: "2025-08-02", divisi: "Keuangan" },
  { barang_id: 3, jumlah: 50, tanggal: "2025-08-03", divisi: "Pendidikan" },
  { barang_id: 4, jumlah: 25, tanggal: "2025-08-04", divisi: "Pengadaan" },
  { barang_id: 5, jumlah: 40, tanggal: "2025-08-05", divisi: "Logistik" },
];

// Data Mock untuk tabel 'log_history' dengan perubahan
const logHistoryData = [
  {
    barang_masuk: "Pensil x30",
    barang_keluar: null,
    waktu_transaksi: "2025-08-01 09:00:00",
    user: "Admin",
  },
  {
    barang_masuk: "Buku Tulis x20",
    barang_keluar: null,
    waktu_transaksi: "2025-08-02 10:00:00",
    user: "Admin",
  },
  {
    barang_masuk: null,
    barang_keluar: "Pensil x10",
    waktu_transaksi: "2025-08-01 10:00:00",
    user: "Admin",
  },
  {
    barang_masuk: "Pulpen x50",
    barang_keluar: null,
    waktu_transaksi: "2025-08-03 11:00:00",
    user: "Admin",
  },
  {
    barang_masuk: null,
    barang_keluar: "Buku Tulis x5",
    waktu_transaksi: "2025-08-02 11:00:00",
    user: "Admin",
  },
  {
    barang_masuk: "Penghapus x25",
    barang_keluar: null,
    waktu_transaksi: "2025-08-04 14:00:00",
    user: "Admin",
  },
  {
    barang_masuk: null,
    barang_keluar: "Pulpen x20",
    waktu_transaksi: "2025-08-03 12:00:00",
    user: "Admin",
  },
  {
    barang_masuk: "Rautan x40",
    barang_keluar: null,
    waktu_transaksi: "2025-08-05 16:00:00",
    user: "Admin",
  },
  {
    barang_masuk: null,
    barang_keluar: "Penghapus x10",
    waktu_transaksi: "2025-08-04 15:00:00",
    user: "Admin",
  },
];

// Fungsi untuk menyisipkan data ke dalam tabel 'barang'
const seedBarang = () => {
  barangData.forEach((barang) => {
    const query = "INSERT INTO barang (nama, stok, satuan) VALUES (?, ?, ?)";
    db.query(
      query,
      [barang.nama, barang.stok, barang.satuan],
      (err, result) => {
        if (err) {
          console.error("Error inserting barang:", err);
        } else {
          console.log(`Barang ${barang.nama} berhasil ditambahkan.`);
        }
      }
    );
  });
};

// Fungsi untuk menyisipkan data ke dalam tabel 'pengeluaran'
const seedPengeluaran = () => {
  pengeluaranData.forEach((pengeluaran) => {
    const query =
      "INSERT INTO pengeluaran (barang_id, jumlah, tanggal, divisi) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [
        pengeluaran.barang_id,
        pengeluaran.jumlah,
        pengeluaran.tanggal,
        pengeluaran.divisi,
      ],
      (err, result) => {
        if (err) {
          console.error("Error inserting pengeluaran:", err);
        } else {
          console.log(
            `Pengeluaran untuk barang ID ${pengeluaran.barang_id} berhasil ditambahkan.`
          );
        }
      }
    );
  });
};

// Fungsi untuk menyisipkan data ke dalam tabel 'log_history' dengan perubahan
const seedLogHistory = () => {
  logHistoryData.forEach((log) => {
    const query =
      "INSERT INTO log_history (barang_masuk, barang_keluar, waktu_transaksi, user) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [log.barang_masuk, log.barang_keluar, log.waktu_transaksi, log.user],
      (err, result) => {
        if (err) {
          console.error("Error inserting log history:", err);
        } else {
          console.log(
            `Log history untuk transaksi ${
              log.barang_masuk || log.barang_keluar
            } berhasil ditambahkan.`
          );
        }
      }
    );
  });
};

// Menjalankan fungsi-fungsi di atas untuk mengisi data mock ke dalam tabel
const seedDatabase = () => {
  seedBarang();
  setTimeout(() => {
    seedPengeluaran();
  }, 1000); // Tunggu 1 detik agar data barang masuk dulu
  setTimeout(() => {
    seedLogHistory();
  }, 2000); // Tunggu 2 detik agar data pengeluaran masuk dulu
};

// Jalankan fungsi seedDatabase untuk mengisi data mock
seedDatabase();
