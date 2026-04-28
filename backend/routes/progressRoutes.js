const express = require("express");

const { getDashboard } = require("../controllers/progressController");

const protect = require("../middleware/auth");

const router = express.Router();

router.get("/dashboard", protect, getDashboard);

module.exports = router;
