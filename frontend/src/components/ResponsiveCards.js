import React from 'react';

const ResponsiveCards = () => {
  const cards = [
    { title: "Document 1", description: "Uploaded on Jan 1, 2024" },
    { title: "Image 2", description: "Uploaded on Feb 1, 2024" },
    { title: "Video 3", description: "Uploaded on Mar 1, 2024" },
  ];

  return (
    <section id="cards" className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-800">Your Files</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
          {cards.map((card, index) => (
            <div key={index} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h4 className="text-lg font-bold">{card.title}</h4>
              <p className="text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResponsiveCards;
