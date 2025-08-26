const express = require("express");
const cors = require("cors");
const db = require("./models/database");
const barangRoutes = require("./routes/barangRoutes");
const pengeluaranRoutes = require("./routes/pengeluaranRoutes");
const logHistoryRoutes = require("./routes/logHistoryRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Cek koneksi awal
app.get("/", (req, res) => {
  res.send("API Inventaris ATK aktif 🚀");
});

// Routing
app.use("/api/barang", barangRoutes);
app.use("/api/pengeluaran", pengeluaranRoutes);
app.use("/api/logHistory", logHistoryRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
