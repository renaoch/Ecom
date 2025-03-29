require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser())
// Routes
app.use("/api/auth", require("./routes/authRoutes"));

// Start Server
connectDB();
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
