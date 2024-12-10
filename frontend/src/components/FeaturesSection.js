import React from 'react';

const FeaturesSection = () => {
  const features = [
    { title: "Secure", description: "Your data is protected with end-to-end encryption." },
    { title: "Fast", description: "Quick uploads and downloads for all your files." },
    { title: "Responsive", description: "Fully responsive design for all devices." },
  ];

  return (
    <section id="features" className="py-16">
      <div className="container mx-auto">
        <h3 className="text-2xl font-bold text-center text-gray-800">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg">
              <h4 className="text-xl font-semibold text-indigo-600">{feature.title}</h4>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
