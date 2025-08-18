const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Link to User collection
    required: true
  },
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true
  },
  department: String,
  year: Number,
  registeredCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
