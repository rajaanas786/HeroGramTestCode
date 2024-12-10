const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'image'], required: true },
  filename: { type: String, required: true },
  category: { type: String, required: true },
  
});

module.exports = mongoose.model("Video", videoSchema);
