import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Check if the user is logged in by looking for the token in localStorage
  const isLoggedIn = localStorage.getItem('token') !== null;

  return (
    <nav className="bg-blue-600 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/videos" className="text-xl font-bold">MyApp</Link>
        <div className="space-x-4">
          {!isLoggedIn && (
            <>
              <Link to="/register" className="hover:text-gray-300">Register</Link>
              <Link to="/" className="hover:text-gray-300">Login</Link>
            </>
          )}
          {isLoggedIn && (
            <>
            <Link to="/logout" className="hover:text-gray-300">Logout</Link>
            <Link to="/videos" className="hover:text-gray-300">Vidoes</Link>
            <Link to="/upload" className="hover:text-gray-300">Upload</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
