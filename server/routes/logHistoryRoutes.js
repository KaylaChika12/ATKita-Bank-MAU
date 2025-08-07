const express = require("express");
const router = express.Router();
const logHistoryController = require("../controllers/logHistoryController"); // Mengimpor controller log history

// Rute untuk mencatat log history
router.post("/", logHistoryController.addLogHistory); // Pastikan `addLogHistory` ada di controller

// Rute untuk mendapatkan log history
router.get("/", logHistoryController.getLogHistory); // Pastikan `getLogHistory` ada di controller

module.exports = router;
