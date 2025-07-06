const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [String],
  correctOption: { type: Number, required: true }
});

const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  subject: { type: String, required: true },
  department: { type: String, required: true },
  semester: { type: Number, required: true },
  duration: { type: String, required: true },
  totalMarks: { type: Number, required: true },
  instructions: { type: String },
  questions: [questionSchema], // ✅ Add this line
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
