const express = require("express");
const router = express.Router();
const facultyController = require("../controllers/facultyController");

router.get("/", facultyController.getFaculty);
router.post("/register", facultyController.registerFaculty);

module.exports = router;
