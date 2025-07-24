import React from 'react';
import { CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';

const Success: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="flex flex-col items-center justify-center px-4 pt-64">
        <div className="text-center space-y-8 max-w-md">


          <div className="space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h1 className="text-3xl font-bold text-white">
              You're all set!
            </h1>
            <p className="text-gray-400">
              Thanks for signing up. We'll notify you when we launch.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Success;