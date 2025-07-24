import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Button from './ui/Button';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />
      
      <div className="flex flex-col items-center justify-center px-4 pt-64">
        <div className="text-center space-y-8 max-w-lg">
          <h1 className="text-4xl font-bold text-white leading-tight">
            Under Development
          </h1>
          <p className="text-gray-400 text-lg">
            We're building something amazing. Join our waitlist for early access.
          </p>
          
          <Link to="/auth" className="inline-block">
            <Button className="px-8 py-3 text-lg font-medium">Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;