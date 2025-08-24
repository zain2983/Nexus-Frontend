import React from 'react';
import LandingPage from '../components/LandingPage';
import Questions from '../components/Questions';
import Navbar from '../components/Navbar';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-purple-50">
      <Navbar />
      <LandingPage />
      {/* <Questions /> */}
    </div>
  );
};

export default Home;