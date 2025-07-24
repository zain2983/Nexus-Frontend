import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AuthForm from '../components/AuthForm';

const Auth: React.FC = () => {
  const { mode } = useParams();
  const isLogin = mode === 'login';
  const navigate = useNavigate();

  const handleToggle = () => {
    if (isLogin) {
      navigate('/auth/signup');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <Link
          to="/"
          className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back
        </Link>
        <AuthForm isLogin={isLogin} onToggle={handleToggle} />
      </div>
    </div>
  );
};

export default Auth;