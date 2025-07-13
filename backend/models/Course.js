const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: String,
  title: String,
  department: String,
  credits: Number,
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    default: "Active"
  },
  assignedFaculty: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
}, { timestamps: true });

module.exports = mongoose.model("Course", courseSchema);
