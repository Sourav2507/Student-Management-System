const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  email: String,
  password: String,
  role: { type: String, enum: ['student', 'faculty'], required: true },

  // Optional fields
  rollNumber: String,     // for students
  branch: String,
  semester: String,
  facultyId: String,      // for faculty
  designation: String,
});

module.exports = mongoose.model('User', userSchema);
