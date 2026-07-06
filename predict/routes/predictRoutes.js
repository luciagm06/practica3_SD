// routes/predictRoutes.js
const express = require("express");
const router = express.Router();

const predictController = require("../controllers/predictController");
const authMiddleware = require("../middleware/authMiddleware");

// Contrato del servicio PREDICT
router.get("/health", predictController.health);
router.get("/ready", predictController.ready);
router.post("/predict", authMiddleware, predictController.doPredict);

module.exports = router;