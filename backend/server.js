// server.js
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

// ✅ Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Front-end origin
    credentials: true,               // Allow cookies and credentials
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Logger (for debugging and tracing all API calls)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));
app.use("/api/logs", require("./routes/logRoutes"));
app.use("/api/student", require("./routes/studentRoutes"));
app.use("/api/attempts", require("./routes/attemptRoutes"));
app.use("/api/attendance", require("./routes/attendanceRoutes"));
app.use("/api/registrations", require("./routes/registrationRoutes")); // <-- Supports course registration limit

// ✅ Optional global error handler
// app.use((err, req, res, next) => {
//   console.error("Global error:", err);
//   res.status(500).json({ message: "Internal server error" });
// });

// ✅ Fallback for undefined endpoints (always last)
app.use((req, res) => {
  res.status(404).json({ message: `API route not found: ${req.originalUrl}` });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
