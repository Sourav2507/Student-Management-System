const express = require('express');
const router = express.Router();
const {
  addCourse,
  getAllCourses,
  getFacultyList
} = require('../controllers/courseController');
const Course = require('../models/Course'); // ensure you have the model

// Admin-only routes
router.post('/add', addCourse);
router.get('/all', getAllCourses);
router.get('/faculties', getFacultyList);

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course" });
  }
});

module.exports = router;
