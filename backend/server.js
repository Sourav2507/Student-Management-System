const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Connect to DB first
connectDB();

// ✅ Middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow cookies from frontend
  })
);
app.use(express.json());
app.use(cookieParser());

// ✅ Logger middleware for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// ✅ Route handlers
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes"));
app.use("/api/exams", require("./routes/examRoutes"));
app.use("/api/courses", require("./routes/courseRoutes"));
app.use("/api/announcements", require("./routes/announcementRoutes"));


// ✅ Catch-all for unknown routes (FIXED)
// ✅ Fallback route (fixed)
app.use((req, res) => {
  res.status(404).json({ message: "API route not found" });
});


// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
