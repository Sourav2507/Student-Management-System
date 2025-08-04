const Course = require('../models/Course');
const User = require('../models/User');
const Log = require('../models/Log');
const jwt = require('jsonwebtoken');

// ✅ Add new course (only Admin)
exports.addCourse = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    // Get role from token or DB
    let role = decoded.role;
    let user = null;
    if (!role) {
      user = await User.findById(decoded.id || decoded.userId);
      if (!user) return res.status(401).json({ error: 'User not found' });
      role = user.role;
    } else {
      user = await User.findById(decoded.id || decoded.userId);
    }

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can add courses' });
    }

    const { code, title, department, credits, status, assignedFaculty } = req.body;

    const faculty = await User.findById(assignedFaculty);
    if (!faculty || faculty.role !== 'faculty') {
      return res.status(400).json({ error: 'Assigned user is not a faculty member' });
    }

    const course = new Course({
      code,
      title,
      department,
      credits,
      status,
      assignedFaculty,
      createdBy: decoded.id || decoded.userId,
    });

    await course.save();

    // ✅ Log the course creation
    await Log.create({
      message: `Course "${title}" was added by ${user.name} (Admin)`,
      category: 'Course',
      user: user._id,
    });

    res.json({ message: 'Course successfully created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// ✅ Get all courses (Admin Panel)
exports.getAllCourses = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);

    let role = decoded.role;
    if (!role) {
      const user = await User.findById(decoded.id || decoded.userId);
      if (!user) return res.status(401).json({ error: 'User not found' });
      role = user.role;
    }

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Only admin can view courses' });
    }

    const courses = await Course.find().populate('assignedFaculty', 'name email designation');
    res.json({ courses });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
};

// ✅ Get faculty list (For dropdown in course form)
exports.getFacultyList = async (req, res) => {
  try {
    const facultyList = await User.find({ role: 'faculty' }).select('name _id email designation');
    res.json({ facultyList });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch faculty list' });
  }
};
