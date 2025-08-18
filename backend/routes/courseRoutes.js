const express = require('express');
const router = express.Router();
const {
  addCourse,
  getAllCourses,
  getFacultyList,
  deleteCourse
} = require('../controllers/courseController');
const Course = require('../models/Course');

// Add a new course
router.post('/add', addCourse);

// Get all courses
router.get('/all', getAllCourses);

// Get faculty list
router.get('/faculties', getFacultyList);

// Delete a course by ID
router.delete('/:id', deleteCourse);

// *** NEW: Get only courses assigned to the specified faculty ***
router.get('/faculty/:facultyId', async (req, res) => {
  try {
    // Find all courses where assignedFaculty matches this faculty's MongoDB _id
    const courses = await Course.find({ assignedFaculty: req.params.facultyId });
    res.json({ courses });
  } catch (err) {
    console.error('Error fetching faculty courses:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
