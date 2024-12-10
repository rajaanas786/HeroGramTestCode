import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MediaView = () => {
  const { id } = useParams(); // Get video or image ID from URL
  const [media, setMedia] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const response = await axios.get(`http://http://59.65.122.248:5000/api/videos/${id}`);
        setMedia(response.data); // Assuming your backend returns media data
      } catch (err) {
        console.error('Error fetching media:', err);
      }
    };

    fetchMedia();
  }, [id]);

  const handleCopyLink = () => {
    const link = `${window.location.href}`; // Get current URL
    navigator.clipboard.writeText(link)
      .then(() => alert('Link copied to clipboard!'))
      .catch(err => alert('Failed to copy link: ' + err));
  };

  if (!media) return <div>Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-lg font-semibold">{media.title}</h2>
        {media.type === 'video' ? (
          <div>
            {/* <video controls className="w-full">
              <source src={`http://http://59.65.122.248:5000/uploads/videos/${media.filename}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video> */}

<video controls className="w-full">
  <source src={`http://http://59.65.122.248:5000/uploads/videos/${media.filename}`} type="video/mp4" />
  Your browser does not support the video tag.
</video>

          </div>
        ) : (
          <div>
            <img src={`http://http://59.65.122.248:5000/uploads/images/${media.filename}`} alt="Media" className="w-full" />
          </div>
        )}
        <div className="mt-4">
          <button
            onClick={handleCopyLink}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Copy Shareable Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default MediaView;
