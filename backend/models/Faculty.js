const mongoose = require('mongoose');

const FacultySchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  department: String,
});

module.exports = mongoose.model("Faculty", FacultySchema);
