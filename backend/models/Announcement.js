const mongoose = require("mongoose");

const announcementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    course: { type: String, required: true },
    audience: { type: String, required: true }, // e.g., "Year 2" or "All Students"
    message: { type: String, required: true },
    postedBy: { type: String, required: true }, // store username (e.g., "Sourav007")
  },
  { timestamps: true }
);

module.exports = mongoose.model("Announcement", announcementSchema);
