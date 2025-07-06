const express = require("express");
const router = express.Router();
const Exam = require("../models/Exam");

// GET: Fetch all exams
router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find().sort({ date: 1 });
    res.json(exams);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch exams" });
  }
});

// POST: Create a new exam
router.post("/", async (req, res) => {
  try {
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

    // Optional: Add basic validation
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
      questions
    });

    await newExam.save();
    res.status(201).json({ message: "Exam created successfully", exam: newExam });
  } catch (err) {
    console.error("❌ Error saving exam:", err);
    res.status(400).json({ error: "Failed to create exam" });
  }
});

module.exports = router;
