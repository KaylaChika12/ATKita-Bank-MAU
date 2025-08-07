const express = require("express");
const router = express.Router();
const pengeluaranController = require("../controllers/pengeluaranController");

// Rute untuk mencatat pengeluaran (POST)
router.post("/", pengeluaranController.addPengeluaran);

// Rute untuk mendapatkan pengeluaran (GET)
router.get("/", pengeluaranController.getPengeluaran);

module.exports = router;
