const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAdmins);
// Add more routes for users, courses, logs, etc.

module.exports = router;
