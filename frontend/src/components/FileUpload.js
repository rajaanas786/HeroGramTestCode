import React, { useState } from 'react';
import axios from '../axiosInstance';
import RequireAuth from '../components/RequireAuth'; // Import the RequireAuth HOC

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [dragging, setDragging] = useState(false); // State to track drag events
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [userId, setUserId] = useState(null); // State to store the userId

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (isValidFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      setMessage('Only video and image files are allowed.');
    }
  };

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !title || !category) {
      setMessage('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('category', category);

    setIsLoading(true); // Set loading to true when the upload starts
    try {
      const response = await axios.post('/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage('Video uploaded successfully');
      setFile(null);
      setTitle('');
      setCategory('');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error uploading video');
    } finally {
      setIsLoading(false); // Set loading to false when the upload finishes
    }
  };

  // Handle drag events
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && isValidFile(droppedFile)) {
      setFile(droppedFile);
    } else {
      setMessage('Only video and image files are allowed.');
    }
  };

  // Check if the file is a valid video or image
  const isValidFile = (file) => {
    const allowedTypes = ['video', 'image'];
    const fileType = file.type.split('/')[0]; // Get the first part of MIME type (video/image)
    return allowedTypes.includes(fileType);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-5">
        <h1 className="text-2xl font-bold text-center mb-6 mt-6">Upload Video/Image</h1>
        {message && <p className="text-center text-red-500 mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Video Title</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter video title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2 border rounded"
              placeholder="Enter video category"
            />
          </div>

          {/* Drag and Drop Area */}
          <div
            className={`mb-4 p-6 border-2 border-dashed rounded-lg ${dragging ? 'bg-gray-100' : 'bg-gray-50'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-center text-gray-600">
              {file ? file.name : 'Drag & Drop a video/image file here or click to select'}
            </p>
            <input
              type="file"
              onChange={handleFileChange}
              accept="video/*,image/*"
              className="sr-only" // Hide the default file input
            />
          </div>

          {/* Loader */}
          {isLoading && (
            <div className="flex justify-center mb-4">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-600"></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={isLoading} // Disable the button while uploading
          >
            {isLoading ? 'Uploading...' : 'Upload Video/Image'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequireAuth(FileUpload); // Wrap the component with RequireAuth
