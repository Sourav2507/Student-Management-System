const Admin = require("../models/Admin");

// Dummy: Get all admins
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add more: addUser, manageCourses, viewLogs etc.
