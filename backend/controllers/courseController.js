const Course = require('../models/Course');
const jwt = require('jsonwebtoken');

exports.addCourse = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== 'faculty') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { title, description } = req.body;

    const course = new Course({ title, description, createdBy: decoded.userId });
    await course.save();

    res.json({ message: 'Course added' });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};

exports.getFacultyCourses = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'faculty') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const courses = await Course.find({ createdBy: decoded.userId });
    res.json({ courses });
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
};
