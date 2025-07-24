import React from 'react';
import { Code } from 'lucide-react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <Code className="h-7 w-7 text-blue-500" />
      <span className="text-xl font-bold text-white">Nexus</span>
    </div>
  );
};

export default Logo;