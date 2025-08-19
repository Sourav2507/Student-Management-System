const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
  date: { type: String, required: true }, // "YYYY-MM-DD"
  startTime: { type: String, required: true }, // "HH:mm"
  endTime: { type: String, required: true },   // "HH:mm"
  present: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // array of student IDs
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // faculty
}, { timestamps: true });

module.exports = mongoose.model("Attendance", attendanceSchema);
