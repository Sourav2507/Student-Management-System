const Course = require('../models/Course');
const User = require('../models/User');

exports.addCourse = async (req, res) => {
  try {
    const { code, title, department, credits, status, assignedFaculty } = req.body;
    // Validate assignedFaculty
    const faculty = await User.findById(assignedFaculty);
    if (!faculty || faculty.role !== 'faculty') {
      return res.status(400).json({ error: 'Assigned user is not a faculty member' });
    }
    const course = new Course({ code, title, department, credits, status, assignedFaculty });
    await course.save();
    res.json({ message: 'Course successfully created', course });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Internal server error' });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('assignedFaculty', 'name email designation');
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

exports.getFacultyList = async (req, res) => {
  try {
    const facultyList = await User.find({ role: 'faculty' }).select('name _id email designation');
    res.json({ facultyList });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch faculty list' });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const deleted = await Course.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete course" });
  }
};
