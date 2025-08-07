const db = require("../models/database");

// Fungsi untuk mencatat log history
const addLogHistory = (req, res) => {
  const { barang_masuk, barang_keluar, waktu_transaksi, user } = req.body;

  // Validasi input
  if (!barang_masuk || !barang_keluar || !waktu_transaksi || !user) {
    return res.status(400).json({ error: "Semua field harus diisi!" });
  }

  const query =
    "INSERT INTO log_history (barang_masuk, barang_keluar, waktu_transaksi, user) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [barang_masuk, barang_keluar, waktu_transaksi, user],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({ message: "Log history berhasil dicatat" });
    }
  );
};

// Fungsi untuk mendapatkan log history
const getLogHistory = (req, res) => {
  const query = "SELECT * FROM log_history";
  db.query(query, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ logHistory: rows });
  });
};

module.exports = { addLogHistory, getLogHistory };
