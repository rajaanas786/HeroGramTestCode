// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  filename: { type: String, required: true },
  path: { type: String, required: true },
  views: { type: Number, default: 0 }, 
  user:{type: String, default:0} // Add views field
});

module.exports = mongoose.model('Video', videoSchema);


