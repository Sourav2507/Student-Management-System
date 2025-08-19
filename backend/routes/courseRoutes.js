const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// Add a new course
router.post('/add', async (req, res) => {
  try {
    const course = await Course.create(req.body);
    res.json({ course });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all courses
router.get('/all', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get faculty list (sample: you can customize based on your needs)
router.get('/faculties', async (req, res) => {
  // custom logic...
});

// Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get only courses assigned to the specified faculty
router.get('/faculty/:facultyId', async (req, res) => {
  try {
    // Find courses where assignedFaculty matches the faculty's MongoDB _id
    const courses = await Course.find({ assignedFaculty: req.params.facultyId });
    res.json({ courses });
  } catch (err) {
    console.error('Error fetching faculty courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
