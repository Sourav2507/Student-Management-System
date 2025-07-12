const Announcement = require("../models/Announcement");

exports.createAnnouncement = async (req, res) => {
  try {
    const { title, course, audience, message } = req.body;

    // Fetch the logged-in faculty info from the whoami route
    const whoamiRes = await fetch("http://localhost:5000/api/auth/whoami", {
      headers: {
        cookie: req.headers.cookie, // pass session cookie to whoami route
      },
    });

    const facultyData = await whoamiRes.json();

    if (!facultyData || !facultyData.username) {
      return res.status(401).json({ message: "Unauthorized: faculty not identified" });
    }

    if (!title || !course || !audience || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const announcement = new Announcement({
      title,
      course,
      audience,
      message,
      postedBy: facultyData.username, // store the username directly
    });

    await announcement.save();

    res.status(201).json({ message: "Announcement created", announcement });
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// (Optional) Fetch all announcements
exports.getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
