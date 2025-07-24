import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './ui/Input';
import Button from './ui/Button';
import { signup } from '../api/auth';

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin, onToggle }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!isLogin) {
      setLoading(true);
      try {
        await signup(formData.name, formData.password);
        navigate('/success');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // ...login logic here if needed...
      navigate('/success');
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
      <h1 className="text-2xl font-bold mb-8 text-center text-white">
        {isLogin ? 'Login' : 'Join Waitlist'}
      </h1>
      {error && (
        <div className="mb-4 text-red-400 text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        )}
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
        />
        <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Join Waitlist'}
        </Button>
      </form>
      
      <p className="text-center mt-6 text-sm text-gray-400">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={onToggle}
          className="ml-1 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;