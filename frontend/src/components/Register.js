import React, { useState } from 'react';
import axios from '../axiosInstance';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Register = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError]=useState('');
  const [passwordError, setPasswordError]=useState('');
  const navigate = useNavigate(); // Initialize useNavigate


  const handlePasswordChange = (value) => {
    setFormData({ ...formData, password: value });

    // Validate password length
    if (value.length < 5) {
      setPasswordError('Password must be at least 5 characters long.');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('/auth/register', formData);
      // alert(response.data.message);
      navigate('/')

      
    } catch (err) {
      setError(err.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Create an Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 font-medium mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
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
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
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
              placeholder="Enter your password"
              value={formData.password}
             
              onChange={(e) => handlePasswordChange(e.target.value)}

              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {passwordError && (
              <div className='text-red-500 text-sm mb-4'>
                {passwordError}
              </div>
            )}
          </div>

          {error &&(
            <div className="text-red-500 text-sm mb-4">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Register
          </button>

          <div className="flex items-center justify-center mt-5">
            <p>
              <strong>Already Registered?</strong>{" "}
              <a href="/login" className="text-blue-500">
               Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
