const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Untuk parsing JSON
app.use(
  cors({
    origin: "*", // Mengizinkan semua domain
  })
);

// Cek koneksi awal
app.get("/", (req, res) => {
  res.send("API Inventaris ATK aktif 🚀");
});

// Rute API
const barangRoutes = require("./routes/barangRoutes");
const pengeluaranRoutes = require("./routes/pengeluaranRoutes");
const logHistoryRoutes = require("./routes/logHistoryRoutes");

// Menggunakan rute
app.use("/api/barang", barangRoutes);
app.use("/api/pengeluaran", pengeluaranRoutes);
app.use("/api/logHistory", logHistoryRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
