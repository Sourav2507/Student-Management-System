const express = require("express");
const router = express.Router();
const Log = require("../models/Log");
const User = require("../models/User");

// GET /api/logs - get all logs with user populated
router.get("/", async (req, res) => {
  try {
    const logs = await Log.find()
      .sort({ timestamp: -1 })
      .populate("user", "name role");

    res.json({ logs });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
