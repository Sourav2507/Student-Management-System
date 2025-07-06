const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // Load .env file

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Debug log to confirm MONGO_URI is loaded
console.log("MONGO_URI from .env:", process.env.MONGO_URI);

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/faculty", require("./routes/facultyRoutes")); // Faculty route

// ✅ MongoDB connection (cleaned, no deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`)))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));
