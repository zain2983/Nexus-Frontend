import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './ui/Logo';
import Button from './ui/Button';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full px-6 py-4 border-b border-gray-800 bg-gray-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />
        <Link to="/auth">
          <Button variant="primary" className="px-6 py-2">Login</Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;