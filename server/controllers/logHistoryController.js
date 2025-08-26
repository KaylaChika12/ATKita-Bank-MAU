const db = require("../models/database");

// Fungsi untuk mencatat log history
const addLogHistory = (req, res) => {
  const { barang_masuk, barang_keluar, waktu_transaksi, user } = req.body;

  // Validasi input
  if (!barang_masuk || !barang_keluar || !waktu_transaksi || !user) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }

  // Menyusun waktu transaksi dalam format WIB (Waktu Indonesia Barat)
  const currentTime = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
  });

  // Query untuk menambahkan log history ke database
  const query =
    "INSERT INTO log_history (barang_masuk, barang_keluar, waktu_transaksi, user) VALUES (?, ?, ?, ?)";

  db.query(
    query,
    [barang_masuk, barang_keluar, currentTime, user],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Log history berhasil dicatat" });
    }
  );
};

const getLogHistory = (req, res) => {
  const query = `
    SELECT 
      lh.id,
      lh.barang_masuk,
      lh.barang_keluar,
      lh.waktu_transaksi,
      lh.user,
      lh.pengeluaran_id,
      p.divisi,
      b.nama AS nama_barang
    FROM log_history lh
    LEFT JOIN pengeluaran p ON lh.pengeluaran_id = p.id
    LEFT JOIN barang b ON p.barang_id = b.id
    ORDER BY lh.waktu_transaksi DESC
  `;

  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    // Format waktu transaksi ke WIB
    const formattedLogs = rows.map((log) => ({
      ...log,
      waktu_transaksi: new Date(log.waktu_transaksi).toLocaleString("id-ID", {
        timeZone: "Asia/Jakarta",
      }),
    }));

    res.json({ logHistory: formattedLogs });
  });
};

module.exports = { addLogHistory, getLogHistory };
