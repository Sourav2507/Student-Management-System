const express = require('express');
const router = express.Router();
const {
  addCourse,
  getAllCourses,
  getFacultyList
} = require('../controllers/courseController');

// Admin-only routes
router.post('/add', addCourse);            // Admin adds a course
router.get('/all', getAllCourses);         // Admin views all courses
router.get('/faculties', getFacultyList);  // Admin fetches faculty for assignment

module.exports = router;
