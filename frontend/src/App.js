import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import FileUpload from './components/FileUpload';
import VideoList from './components/VideoList'; // Adjust the path as necessary
import Logout from './components/Logout'; // Import the Logout component
import MediaView from './components/MediaView';




const App = () => {
  return (
    <Router>
      <div className="bg-gray-50 min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/videos" element={<VideoList />} />
            <Route path="/media/:id" element={<MediaView />} />
            <Route path="/logout" element={<Logout />} /> {/* Add Logout route */}


            
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
