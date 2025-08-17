const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  title: String,
  subject: String,
  department: String,
  semester: Number,
  date: String,          // Format: 'YYYY-MM-DD'
  startTime: String,     // Format: 'HH:mm'
  endTime: String,       // Format: 'HH:mm'
  duration: String,
  instructions: String,
  totalMarks: Number,
  questions: [
    {
      question: String,
      options: [String],
      correctOption: Number
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Exam", examSchema);
