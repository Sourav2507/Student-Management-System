const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, trim: true },
  title: { type: String, required: true, trim: true },
  department: { type: String, required: true, trim: true },
  credits: { type: Number, required: true, min: 0 },
  status: { type: String, default: 'Active', enum: ['Active', 'Inactive'] },
  assignedFaculty: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
