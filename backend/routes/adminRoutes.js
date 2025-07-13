const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.getAdmins);
router.get("/users", adminController.getAllUsers); // ✅ Add this

module.exports = router;
