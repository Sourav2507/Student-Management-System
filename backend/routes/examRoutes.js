const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Exam = require("../models/Exam");
const User = require("../models/User");

// 🔁 Reusable helper (optional)
const getUserFromToken = async (req) => {
  const token = req.cookies.token;
  if (!token) throw new Error("No token");

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");
  if (!user) throw new Error("User not found");

  return user;
};

// GET: Fetch exams created by logged-in faculty
router.get("/", async (req, res) => {
  try {
    const user = await getUserFromToken(req);
    const exams = await Exam.find({ createdBy: user._id }).lean();
    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: err.message || "Unauthorized" });
  }
});

// POST: Create a new exam
router.post("/", async (req, res) => {
  try {
    const user = await getUserFromToken(req);

    const {
      title,
      subject,
      department,
      semester,
      date,
      duration,
      instructions,
      totalMarks,
      questions
    } = req.body;

    if (!title || !subject || !department || !semester || !date || !duration || !questions || questions.length === 0) {
      return res.status(400).json({ error: "Missing required fields or questions" });
    }

    const newExam = new Exam({
      title,
      subject,
      department,
      semester,
      date,
      duration,
      instructions,
      totalMarks,
      questions,
      createdBy: user._id
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created successfully", exam: newExam });
  } catch (err) {
    console.error("❌ Error saving exam:", err);
    res.status(400).json({ error: err.message || "Failed to create exam" });
  }
});

module.exports = router;
