import React from 'react';
import ecolexLogo from '../assets/ecolex-logo.svg';

const Home: React.FC = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <img src={ecolexLogo} alt="Ecolex Logo" className="max-w-[200px] mb-8" />
      <h1 className="text-3xl font-black mb-4 text-custom-blue">Home Page</h1>
      <p className="text-gray-600 font-medium">Welcome to the home page!</p>
    </div>
  );
};

export default Home;