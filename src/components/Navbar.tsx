import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import Logo from './ui/Logo';
import Button from './ui/Button';
import { logout } from '../store/userSlice';

const Navbar: React.FC = () => {
  const username = useSelector((state: RootState) => state.user.username);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setShowPopup(false);
      }
    };
    if (showPopup) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPopup]);

  return (
    <nav className="w-full px-6 py-4 border-b border-gray-800 bg-gray-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />
        {isLoggedIn ? (
          <div className="relative">
            <button
              className="text-gray-300 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
              onClick={() => setShowPopup((prev) => !prev)}
            >
              Welcome - {username}
            </button>
            {showPopup && (
              <div
                ref={popupRef}
                className="absolute right-0 mt-2 w-40 bg-gray-800 border border-gray-700 rounded shadow-lg z-10"
              >
                <button
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                  onClick={() => {
                    dispatch(logout());
                    setShowPopup(false);
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Button
            variant="primary"
            className="px-6 py-2"
            onClick={() => navigate('/auth/login')}
          >
            Login
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;