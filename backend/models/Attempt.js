const mongoose = require("mongoose");

const attemptSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: "Exam", required: true },
  answers: [Number],
  score: Number,
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

attemptSchema.index({ student: 1, exam: 1 }, { unique: true });

module.exports = mongoose.model("Attempt", attemptSchema);
