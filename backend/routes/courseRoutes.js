const express = require('express');
const router = express.Router();
const { addCourse, getFacultyCourses } = require('../controllers/courseController');

router.post('/add', addCourse);
router.get('/my-courses', getFacultyCourses);

module.exports = router;
