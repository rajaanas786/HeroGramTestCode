import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Home = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError]=useState('');

    const navigate = useNavigate(); // Initialize useNavigate


    const handleSubmit = async (e) => {
      e.preventDefault();
      setError('');
      try {
        const response = await axios.post('/auth/login', formData);
        localStorage.setItem('token', response.data.token); // Store the token
        navigate('/upload')
      } catch (err) {
        setError(err.response?.data?.message || 'Error');
      }
    };
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full mt-5">
        <h1 className="text-2xl font-bold text-center mb-4">Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>
           {/* Error Message */}
           {error && (
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>

          <div className="flex items-center justify-center mt-5">
            <p>
              <strong>Not Registered Yet?</strong>{" "}
              <a href="/register" className="text-blue-500">
                Create Account
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
