const db = require("../models/database"); // Pastikan ini mengarah ke file yang benar
const { Parser } = require("json2csv");
const PDFDocument = require("pdfkit");

// Fungsi untuk menambah barang
const addBarang = (req, res) => {
  const { nama, stok, satuan } = req.body;

  // Validasi input
  if (!nama || !stok || !satuan) {
    return res
      .status(400)
      .json({ error: "Nama, stok, dan satuan harus diisi!" });
  }

  // Query untuk menambah barang
  const query = "INSERT INTO barang (nama, stok, satuan) VALUES (?, ?, ?)";
  db.query(query, [nama, stok, satuan], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    // Mencatat transaksi barang masuk ke log_history
    const logTransactionQuery = `
      INSERT INTO log_history (barang_masuk, barang_keluar, waktu_transaksi, user)
      VALUES (?, ?, ?, ?)
    `;
    const barangMasuk = `${nama} x${stok}`; // Menyimpan data barang yang masuk

    // Menggunakan waktu saat ini untuk transaksi
    const currentTime = new Date().toISOString().split("T")[0];

    db.query(
      logTransactionQuery,
      [barangMasuk, null, currentTime, "Admin"], // Tidak ada barang yang keluar, hanya barang masuk
      (err, logResult) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error mencatat log transaksi." });
        }

        // Jika semuanya berhasil
        res.status(200).json({
          message: "Barang berhasil ditambahkan dan tercatat di log.",
        });
      }
    );
  });
};

// Fungsi untuk mendapatkan daftar barang
const getBarang = (req, res) => {
  const query = "SELECT * FROM barang";
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ barang: rows });
  });
};

// Fungsi untuk mencari barang berdasarkan nama
const searchBarang = (req, res) => {
  const { nama } = req.query;

  // Validasi nama barang
  if (!nama) {
    return res.status(400).json({ error: "Nama barang tidak boleh kosong" });
  }

  // Query untuk mencari barang berdasarkan nama
  const query = "SELECT * FROM barang WHERE nama LIKE ?";
  db.query(query, [`%${nama}%`], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0) {
      return res.status(404).json({ message: "Barang tidak ditemukan" });
    }

    res.json({ barang: rows });
  });
};

// Fungsi untuk menghapus barang berdasarkan ID
const deleteBarang = (req, res) => {
  const { id } = req.params; // Mengambil ID dari parameter URL

  // Validasi ID
  if (!id) {
    return res.status(400).json({ error: "ID barang harus disediakan!" });
  }

  // Menghapus pengeluaran yang terkait dengan barang
  const deletePengeluaranQuery = "DELETE FROM pengeluaran WHERE barang_id = ?";
  db.query(deletePengeluaranQuery, [id], (err) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Gagal menghapus pengeluaran terkait." });
    }

    // Query untuk menghapus barang berdasarkan ID
    const deleteQuery = "DELETE FROM barang WHERE id = ?";
    db.query(deleteQuery, [id], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      // Jika berhasil menghapus barang
      if (results.affectedRows > 0) {
        return res
          .status(200)
          .json({ message: `Barang dengan ID ${id} berhasil dihapus` });
      } else {
        return res
          .status(404)
          .json({ error: "Barang tidak ditemukan atau gagal dihapus." });
      }
    });
  });
};

// Fungsi export CSV
const exportBarangCSV = (req, res) => {
  const query = "SELECT * FROM barang";
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const fields = ["id", "nama", "stok", "satuan"];
    const parser = new Parser({ fields });
    const csv = parser.parse(rows);

    res.header("Content-Type", "text/csv");
    res.attachment("barang.csv");
    res.send(csv);
  });
};

// Fungsi export PDF
const exportBarangPDF = (req, res) => {
  const query = "SELECT * FROM barang";
  db.query(query, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=barang.pdf");
    doc.pipe(res);

    doc.fontSize(18).text("Daftar Barang", { align: "center" }).moveDown();

    rows.forEach((row) => {
      doc
        .fontSize(12)
        .text(`Nama: ${row.nama} | Stok: ${row.stok} ${row.satuan}`);
    });

    doc.end();
  });
};

module.exports = {
  addBarang,
  getBarang,
  searchBarang,
  deleteBarang,
  exportBarangCSV,
  exportBarangPDF,
};
