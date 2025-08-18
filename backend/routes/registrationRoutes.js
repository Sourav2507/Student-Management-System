const express = require('express');
const router = express.Router();
const {
  registerCourse,
  getRegisteredCourses
} = require('../controllers/registrationController');

router.post('/register', registerCourse);
router.get('/student/:studentId', getRegisteredCourses);

module.exports = router;
