const express = require("express");
const router = express.Router();
const {
  addBarang,
  getBarang,
  searchBarang,
  exportBarangCSV,
  exportBarangPDF,
  deleteBarang,
} = require("../controllers/barangController");

// Route untuk menambah barang
router.post("/", addBarang);

// Route untuk mendapatkan daftar barang
router.get("/", getBarang);

// Route untuk mencari barang berdasarkan nama
router.get("/search", searchBarang);

// Route untuk export CSV
router.get("/export/csv", exportBarangCSV);

// Route untuk export PDF
router.get("/export/pdf", exportBarangPDF);

// Route untuk menghapus barang berdasarkan ID
router.delete("/:id", deleteBarang);

module.exports = router;
