const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Course = require("../models/Course");
const User = require("../models/User");
const CourseRegistration = require("../models/CourseRegistration");
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

// Faculty creates new attendance window
router.post("/create", async (req, res) => {
  try {
    const user = await getUserFromReq(req);
    const { courseId, date, startTime, endTime } = req.body;
    const attendance = await Attendance.create({
      course: courseId,
      date,
      startTime,
      endTime,
      createdBy: user._id,
      present: [],
    });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Student marks themselves present
router.post("/mark", async (req, res) => {
  try {
    const user = await getUserFromReq(req);
    const { attendanceId } = req.body;
    const attendance = await Attendance.findById(attendanceId);
    if (!attendance) return res.status(404).json({ error: "Attendance not found" });
    const now = new Date();
    const start = new Date(`${attendance.date}T${attendance.startTime}`);
    const end = new Date(`${attendance.date}T${attendance.endTime}`);
    if (now < start || now > end) return res.status(400).json({ error: "Attendance window closed" });
    if (attendance.present.some(id => String(id) === String(user._id))) {
      return res.json({ message: "Already marked" });
    }
    attendance.present.push(user._id);
    await attendance.save();
    res.json({ message: "Attendance marked!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// For faculty: get all attendance windows for courses they created
router.get("/created_by_me", async (req, res) => {
  try {
    const user = await getUserFromReq(req);
    const list = await Attendance.find({ createdBy: user._id })
      .populate("course", "title code")
      .populate("present", "name roll");
    res.json(list || []);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// For student: get all active attendance sessions for their enrolled courses
router.get('/active_for_student', async (req, res) => {
  try {
    const user = await getUserFromReq(req);

    // Find all course IDs student is registered in
    const regs = await CourseRegistration.find({ student: user._id });
    const courseIds = regs.map(r => r.course);

    // Get today's attendance sessions for those courses
    const now = new Date();
    const dayString = now.toISOString().substring(0, 10);
    const sessions = await Attendance.find({
      course: { $in: courseIds },
      date: dayString,
    })
      .populate('course', 'title code')
      .lean();

    // Filter for valid time window
    const validSessions = sessions.filter(session => {
      const start = new Date(`${session.date}T${session.startTime}`);
      const end = new Date(`${session.date}T${session.endTime}`);
      return now >= start && now <= end;
    });

    // Attach alreadyMarked per session
    const out = validSessions.map(session => ({
      ...session,
      alreadyMarked: session.present.some(id => String(id) === String(user._id)),
    }));

    res.json(out);
  } catch (err) {
    console.error('Error fetching student sessions:', err);
    res.status(500).json({ error: err.message });
  }
});

// List all attendance slots with populated subject/course info
router.get('/all_slots', async (req, res) => {
  try {
    const slots = await Attendance.find()
      .populate('course', 'title code')
      .lean();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
