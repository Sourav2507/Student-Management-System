const express = require('express');
const router = express.Router();
const CourseRegistration = require('../models/CourseRegistration');

// Get all courses registered by a student (returns .courseId details via population)
router.get('/student/:studentId', async (req, res) => {
  try {
    const regs = await CourseRegistration.find({ studentId: req.params.studentId })
      .populate('courseId', 'title code'); // Only show course's title and code
    res.json({ registrations: regs });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Register a student for a course
router.post('/register', async (req, res) => {
  try {
    const { studentId, courseId } = req.body;
    const exists = await CourseRegistration.findOne({ studentId, courseId });
    if (exists) return res.status(400).json({ message: 'Already registered!' });
    await CourseRegistration.create({ studentId, courseId });
    res.json({ message: 'Course registered!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
