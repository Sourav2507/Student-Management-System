const express = require("express");
const router = express.Router();
const Attempt = require("../models/Attempt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Helper to get user from cookie token
async function getUserFromReq(req) {
  const token = req.cookies.token;
  if (!token) throw new Error("No token");
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new Error("User not found");
  return user;
}

// GET all attempts by this student (for marks dashboard)
// GET /api/attempts/me
router.get('/me', async (req, res) => {
  try {
    const user = await getUserFromReq(req);
    const atts = await Attempt.find({ student: user._id }).lean();
    res.json(Array.isArray(atts) ? atts : []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET student's own attempt for a specific exam (if exists)
// GET /api/attempts/:examId/me
router.get("/:examId/me", async (req, res) => {
  try {
    const user = await getUserFromReq(req);
    const att = await Attempt.findOne({ exam: req.params.examId, student: user._id });
    if (!att) return res.status(404).json({ attempted: false });
    res.json({ attempted: true, score: att.score, answers: att.answers, submittedAt: att.submittedAt });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST answers and store score - allow only one attempt
// POST /api/attempts/:examId/submit
router.post("/:examId/submit", async (req, res) => {
  try {
    const user = await getUserFromReq(req);
    const { answers, score } = req.body;
    const exists = await Attempt.findOne({ exam: req.params.examId, student: user._id });
    if (exists) return res.status(400).json({ error: "Already attempted" });
    await Attempt.create({
      exam: req.params.examId,
      student: user._id,
      answers,
      score,
      submittedAt: new Date()
    });
    res.json({ message: "Submitted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
