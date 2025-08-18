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

router.get("/all", async (req, res) => {
  try {
    const exams = await Exam.find({}).lean();
    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch all exams" });
  }
});

router.get("/:examId", async (req, res) => {
  const exam = await Exam.findById(req.params.examId);
  if (!exam) return res.status(404).json({ error: "Exam not found" });
  res.json(exam);
});


// POST: Create a new exam
router.post("/", async (req, res) => {
  try {
    const user = await getUserFromToken(req);  // Your JWT auth logic

    const {
      title,
      subject,
      department,
      semester,
      date,
      startTime,   // NEW
      endTime,     // NEW
      duration,
      instructions,
      totalMarks,
      questions
    } = req.body;

    const newExam = new Exam({
      title,
      subject,
      department,
      semester,
      date,
      startTime,   // NEW
      endTime,     // NEW
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

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Exam.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Exam not found' });
    }
    res.json({ message: 'Exam deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
