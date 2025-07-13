const Log = require('../models/Log');

const logActivity = async ({ message, category, userId = null }) => {
  try {
    await Log.create({ message, category, user: userId });
  } catch (err) {
    console.error('❌ Failed to log activity:', err.message);
  }
};

module.exports = logActivity;
