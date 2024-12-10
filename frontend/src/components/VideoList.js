import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/videos/list');
        setVideos(response.data); // Update state with the fetched videos
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  // Copy the video URL to clipboard
  const copyLink = (videoPath) => {
    const videoUrl = `http://localhost:5000${videoPath}`; // Correctly concatenate the base URL and path
    navigator.clipboard.writeText(videoUrl)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((err) => {
        console.error('Error copying link:', err);
      });
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Uploaded Videos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <div key={video._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{video.title}</h2>
            <p className="text-sm text-gray-600">{video.category}</p>
            <video controls>
              <source src={`http://localhost:5000${video.path}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={() => copyLink(video.path)} // Pass the video path to copyLink
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
            >
              Copy Link
            </button>
            <p className="mt-2 text-sm text-gray-600">Views: {video.views}</p>

          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoList;
