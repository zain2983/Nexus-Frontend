import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Input from './ui/Input';
import Button from './ui/Button';
import { signup, login as loginApi } from '../api/auth';
import { login } from '../store/userSlice';

interface AuthFormProps {
  isLogin: boolean;
  onToggle: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    login: '',
    username: '',
    email: '',
    name: '',
    password: '',
    password2: ''
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
      // ====================================
      // ========== Sign up  ================
      // ====================================
      if (formData.password !== formData.password2) {
        setError("Passwords do not match");
        return;
      }
      setLoading(true);
      try {
        await signup(
          formData.username,
          formData.name,
          formData.email,
          formData.password,
          formData.password2
        );
        const res = await loginApi(formData.username, formData.password); 
        dispatch(login({ username: res.name, token: res.access }));
        navigate('/');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      // ====================================
      // ========== LOGIN ===================
      // ====================================

      setLoading(true);
      try {
        const res = await loginApi(formData.login, formData.password);
        dispatch(login({ username: res.name, token: res.access }));
        navigate('/');
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleToggle = () => {
    if (isLogin) {
      navigate('/auth/signup');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <div className="w-full max-w-sm bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
      <h1 className="text-2xl font-bold mb-8 text-center text-white">
        {isLogin ? 'Login' : 'Sign Up'}
      </h1>
      {error && (
        <div className="mb-4 text-red-400 text-center">{error}</div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
              disabled={loading}
            />
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
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </>
        )}
        <Input
          type="text"
          name="login"
          placeholder="Email or Username"
          value={formData.login}
          onChange={handleChange}
          required={isLogin}
          disabled={loading || !isLogin}
          hidden={!isLogin}
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
        {!isLogin && (
          <Input
            type="password"
            name="password2"
            placeholder="Confirm Password"
            value={formData.password2}
            onChange={handleChange}
            required
            disabled={loading}
          />
        )}
        <Button type="submit" className="w-full py-3 text-lg" disabled={loading}>
          {loading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </Button>
      </form>

      <p className="text-center mt-6 text-sm text-gray-400">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <button
          onClick={handleToggle}
          className="ml-1 text-blue-400 hover:text-blue-300 hover:underline transition-colors"
        >
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
