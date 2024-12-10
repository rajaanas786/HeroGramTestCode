const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const helmet = require("helmet");
const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Security middleware
app.use(helmet());

// Enable CORS
app.use(
  cors({
    origin: "http://159.65.122.248:3000", // Correct origin with protocol and IP address
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Allowed HTTP methods
    credentials: true, // Enable cookies and auth headers
    allowedHeaders: ["Content-Type", "Authorization"], // Include necessary headers
  })
);


// Handle preflight requests for all routes
app.options("*", cors());

// Route imports
const authRoutes = require("./routes/authRoute");
const videoRoutes = require("./routes/videos");

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/videos", videoRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Serve video files from the 'uploads/videos' directory with range requests support
app.use("/uploads/videos", (req, res, next) => {
  const videoPath = path.join(__dirname, "uploads", "videos", req.params.filename);


  
  // Check if the video file exists
  fs.stat(videoPath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).json({ message: "Video not found" });
    }
    next(); // Proceed to serve the file if it exists
  });
});

// Static file serving for video files
app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads", "videos"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".mp4")) {
        res.setHeader("Content-Type", "video/mp4");
        res.setHeader("Accept-Ranges", "bytes"); // Enable range requests
        res.setHeader('Access-Control-Allow-Origin', '*');  // Or restrict to specific origin

      }
    },
  })
);

// Simple test route to check if API is running
app.get("/api", (req, res) => {
  res.send("API is running");
});


// Authentication Middleware (for Protected Routes)
function authenticateToken(req, res, next) {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Access Denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid Token" });
    req.user = user;
    next();
  });
}

// Example protected route
app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

// Error handling middleware for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Set timeout to 5 seconds
  })
  .then(() => {
    console.log("Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
