const db = require("../models/database");

// Fungsi untuk mencatat pengeluaran dan mengurangi stok barang
const addPengeluaran = (req, res) => {
  const { barang_id, jumlah, divisi, tanggal } = req.body;

  // Validasi input
  if (!barang_id || !jumlah || !divisi) {
    return res
      .status(400)
      .json({ error: "Barang, jumlah, dan divisi wajib diisi!" });
  }

  // Tentukan tanggal, jika tidak diberikan maka menggunakan tanggal hari ini
  let finalTanggal =
    tanggal ||
    new Date().toLocaleString("en-GB", {
      timeZone: "Asia/Jakarta",
    });

  // Mengubah tanggal menjadi objek Date dan menambahkan 7 jam untuk zona waktu WIB
  const adjustedTime = new Date(finalTanggal);
  adjustedTime.setHours(adjustedTime.getHours() + 7); // Menambahkan 7 jam untuk WIB

  // Format tanggal menjadi YYYY-MM-DD HH:mm:ss
  finalTanggal = adjustedTime.toISOString().slice(0, 19).replace("T", " ");

  // Query untuk mendapatkan stok barang saat ini
  const getStokQuery = "SELECT stok, nama FROM barang WHERE id = ?";
  db.query(getStokQuery, [barang_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (rows.length === 0) {
      return res.status(404).json({ error: "Barang tidak ditemukan." });
    }

    const currentStok = rows[0].stok;
    const namaBarang = rows[0].nama;

    if (currentStok < jumlah) {
      return res.status(400).json({ error: "Stok barang tidak cukup." });
    }

    // Insert ke tabel pengeluaran
    const insertPengeluaranQuery = `
      INSERT INTO pengeluaran (barang_id, jumlah, tanggal, divisi)
      VALUES (?, ?, ?, ?)
    `;
    db.query(
      insertPengeluaranQuery,
      [barang_id, jumlah, finalTanggal, divisi],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        const pengeluaranId = result.insertId;

        // Update stok barang
        const updateStokQuery =
          "UPDATE barang SET stok = stok - ? WHERE id = ?";
        db.query(updateStokQuery, [jumlah, barang_id], (err, updateResult) => {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          // Insert ke log_history
          const logTransactionQuery = `
            INSERT INTO log_history (barang_masuk, barang_keluar, waktu_transaksi, user, pengeluaran_id)
            VALUES (?, ?, ?, ?, ?)
          `;
          const barangKeluar = `${namaBarang} x${jumlah}`;
          db.query(
            logTransactionQuery,
            [null, barangKeluar, finalTanggal, "Admin", pengeluaranId],
            (err, logResult) => {
              if (err) {
                return res.status(500).json({ error: err.message });
              }

              res.status(200).json({ message: "Pengeluaran berhasil dicatat" });
            }
          );
        });
      }
    );
  });
};

// Fungsi untuk mendapatkan daftar pengeluaran dengan nama barang
const getPengeluaran = (req, res) => {
  const query = `
    SELECT 
      pengeluaran.id,
      barang.nama AS nama_barang,
      pengeluaran.jumlah,
      pengeluaran.tanggal,
      pengeluaran.divisi
    FROM pengeluaran
    JOIN barang ON pengeluaran.barang_id = barang.id
    ORDER BY pengeluaran.tanggal DESC
  `;

  // Jalankan query untuk mengambil data pengeluaran dan gabungkan dengan data barang
  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ pengeluaran: rows });
  });
};

module.exports = { addPengeluaran, getPengeluaran };
