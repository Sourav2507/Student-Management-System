const Announcement = require("../models/Announcement");
const Log = require("../models/Log");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, course, audience, message } = req.body;

    // Validate fields
    if (!title || !course || !audience || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const postedBy = req.user?.username || "Unknown";
    const userId = req.user?._id || null;

    const announcement = new Announcement({
      title,
      course,
      audience,
      message,
      postedBy,
    });

    await announcement.save();

    // Log entry
    await Log.create({
      message: `Announcement titled '${title}' created`,
      category: "Announcement",
      user: userId,
    });

    res.status(201).json({ message: "Announcement created", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).json({ message: "Server error" });
  }
};
