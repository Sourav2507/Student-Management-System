const CourseRegistration = require('../models/CourseRegistration');

exports.registerCourse = async (req, res) => {
  const { studentId, courseId } = req.body;
  if (!studentId || !courseId) return res.status(400).json({ message: 'studentId and courseId required' });

  // Prevent max registrations per student
  const registeredCount = await CourseRegistration.countDocuments({ studentId });
  if (registeredCount >= 4) return res.status(400).json({ message: 'Maximum 4 course registrations allowed.' });

  // Prevent duplicate registration
  const existing = await CourseRegistration.findOne({ studentId, courseId });
  if (existing) return res.status(400).json({ message: 'Already registered for this course.' });

  // Create registration with ObjectId
  const registration = await CourseRegistration.create({ studentId, courseId });
  res.json({ message: 'Registration successful', registration });
};

exports.getRegisteredCourses = async (req, res) => {
  const { studentId } = req.params;
  // Use ObjectId for lookup!
  const registrations = await CourseRegistration.find({ studentId }).populate('courseId');
  res.json({ courses: registrations.map(r => r.courseId) });
};
