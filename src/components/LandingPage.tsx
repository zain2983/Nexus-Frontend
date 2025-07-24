import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Button from './ui/Button';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

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
          <Button
            className="px-8 py-3 text-lg font-medium"
            onClick={() => navigate('/auth/signup')}
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;