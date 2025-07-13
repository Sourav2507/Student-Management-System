const express = require("express");
const router = express.Router();
const {
  createAnnouncement,
  getAnnouncements,
} = require("../controllers/announcementController");

// Middleware to fetch logged-in user using /api/auth/whoami
const fetchLoggedInUser = async (req, res, next) => {
  try {
    const whoamiRes = await fetch("http://localhost:5000/api/auth/whoami", {
      headers: {
        cookie: req.headers.cookie, // Pass session cookie
      },
    });

    const userData = await whoamiRes.json();

    if (whoamiRes.ok) {
      req.user = userData;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized: cannot fetch user." });
    }
  } catch (err) {
    console.error("Error in fetchLoggedInUser middleware:", err);
    res.status(500).json({ message: "Server error while identifying user." });
  }
};

// POST /api/announcements - with user info
router.post("/", fetchLoggedInUser, createAnnouncement);

// GET /api/announcements - open to all
router.get("/", getAnnouncements);

module.exports = router;
