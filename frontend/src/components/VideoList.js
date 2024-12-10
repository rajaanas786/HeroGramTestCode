import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';




const VideoList = () => {
  const [videos, setVideos] = useState([]);

  // Fetch videos from the backend
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://api/videos/list');
        setVideos(response.data); // Update state with the fetched videos
        
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  // Copy the video URL to clipboard
  const copyLink = (videoPath) => {
    const videoUrl = `http://159.65.122.248:5000${videoPath}`; // Correctly concatenate the base URL and path
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

            
            
            <ReactPlayer
              url={`http://159.65.122.248:5000${video.path}`}
              controls
              width="100%"
              height="auto"
            />
            
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
