import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-indigo-100 py-16 text-center">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold text-indigo-700">
          Welcome to Helogram
        </h2>
        <p className="text-gray-700 mt-4 text-lg">
          Manage your files securely and efficiently.
        </p>
        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700">
          Get Started
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
