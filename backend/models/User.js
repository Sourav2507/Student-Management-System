const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true, required: true },
  email: String,
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'faculty', 'student'], default: 'student' },
  designation: String,       // For faculty
  rollNumber: String,        // For student
  branch: String,            // For student
  semester: String,          // For student
  facultyId: String,         // For faculty
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
