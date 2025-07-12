const User = require("../models/User");

// ✅ Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users); // return as array ✅
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Existing getAdmins (keep it)
exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
