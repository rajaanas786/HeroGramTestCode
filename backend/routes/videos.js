const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Video = require('../model/Video'); // Import the Mongoose model

const router = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '..', 'uploads', 'videos'); // Absolute path
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.mp4', '.mkv', '.avi'].includes(ext)) {
      return cb(new Error('Only video files are allowed.'));
    }
    cb(null, true);
  },
});

// Upload video and save metadata
router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, category } = req.body;

  if (!req.file) {
    return res.status(400).json({ message: 'Video file is required.' });
  }

  const video = new Video({
    title,
    category,
    filename: req.file.filename, // Save the filename
    path: `/uploads/videos/${req.file.filename}`, // Save relative path
  });

  try {
    const savedVideo = await video.save();
    res.status(201).json({ message: 'Video uploaded successfully.', video: savedVideo });
  } catch (err) {
    console.error('Error saving video metadata:', err);
    res.status(500).json({ message: 'Failed to save video metadata.' });
  }
});

// Fetch videos list
router.get('/list', async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    console.error('Error fetching videos:', err);
    res.status(500).json({ message: 'Failed to fetch videos.' });
  }
});

// Serve video files by video ID
router.get('/:id', async (req, res) => {
  try {
    // Find video by ID
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Construct the path of the video file using the filename from the database
    const videoPath = path.join(__dirname, '..', 'uploads', 'videos', video.filename);

    // Check if the video file exists
    fs.stat(videoPath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({ message: 'Video file not found' });
      }

      // Set headers for the video file and stream it
      res.setHeader('Content-Type', 'video/mp4'); // Adjust this if needed (e.g., for .mkv or .avi)
      res.setHeader('Accept-Ranges', 'bytes');
      const videoStream = fs.createReadStream(videoPath);
      videoStream.pipe(res);
    });
  } catch (err) {
    console.error('Error fetching video:', err);
    res.status(500).json({ message: 'Failed to fetch video.' });
  }
});

router.get('/uploads/videos/:filename', async (req, res) => {
  alert('asfasdf');
  console.log("asdfasdfdsa");
  const { filename } = req.params;

  try {
    // Find the video by filename
    const video = await Video.findOne({ filename });

    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Increment the views count
    video.views += 1;
    await video.save();  // Save the updated video document

    // Construct the path of the video file
    const videoPath = path.join(__dirname, '..', 'uploads', 'videos', filename);

    // Check if the video file exists
    fs.stat(videoPath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).json({ message: 'Video file not found' });
      }

      // Set headers for the video file and stream it
      res.setHeader('Content-Type', 'video/mp4'); // Adjust this if needed (e.g., for .mkv or .avi)
      res.setHeader('Accept-Ranges', 'bytes');
      const videoStream = fs.createReadStream(videoPath);
      videoStream.pipe(res);
    });
  } catch (err) {
    console.error('Error fetching video:', err);
    res.status(500).json({ message: 'Failed to fetch video.' });
  }
});

module.exports = router;



