// routes/studentRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: "Not logged in" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    // Example — replace with your own DB queries
    const dashboardData = {
      student: {
        name: user.name,
        email: user.email,
        department: user.branch,
        rollNo: user.rollNumber,
      },
      attendance: [
        { name: "Present", value: 80 },
        { name: "Absent", value: 20 },
      ],
      marks: [
        { name: "Math", marks: 85 },
        { name: "Physics", marks: 90 },
        { name: "CS", marks: 78 },
      ],
      cgpa: [
        { name: "Sem 1", cgpa: 8.4 },
        { name: "Sem 2", cgpa: 8.7 },
        { name: "Sem 3", cgpa: 9.0 },
      ],
      dailyAttendance: [
        { date: "Jul 1", value: 1 },
        { date: "Jul 2", value: 0 },
        { date: "Jul 3", value: 1 },
        { date: "Jul 4", value: 1 },
      ],
      tasks: [
        { name: "Tasks Completed", value: 65 },
        { name: "Pending", value: 35 },
      ],
      monthlyAttendance: [
        { month: "Jan", value: 1 },
        { month: "Feb", value: 0 },
        { month: "Mar", value: 1 },
        { month: "Apr", value: 1 },
      ],
    };

    res.json(dashboardData);
  } catch (err) {
    console.error("Dashboard fetch error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
});

module.exports = router;
