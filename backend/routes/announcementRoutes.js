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
        cookie: req.headers.cookie, // Pass user session/cookies
      },
    });

    const userData = await whoamiRes.json();
    if (whoamiRes.ok) {
      req.user = userData;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized. Cannot fetch user." });
    }
  } catch (err) {
    console.error("Error in fetchLoggedInUser middleware:", err);
    res.status(500).json({ message: "Server error while identifying user." });
  }
};

// POST /api/announcements
router.post("/", fetchLoggedInUser, (req, res, next) => {
  // Attach username to request body
  req.body.postedBy = req.user.username || "Unknown";
  createAnnouncement(req, res);
});

// GET /api/announcements
router.get("/", getAnnouncements);

module.exports = router;
