// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBell, FaBars, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/sign-in');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 text-white shadow-md z-20"
    style={{ background: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur" }}>
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-white focus:outline-none mr-4"
          aria-label="Toggle sidebar menu"
        >
          <FaBars className="h-6 w-6" />
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <button
          className="text-gray-400 hover:text-white focus:outline-none relative"
          aria-label="Notifications"
        >
          <FaBell className="h-6 w-6" />
        </button>

        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            className="flex items-center space-x-2 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isUserMenuOpen ? 'true' : 'false'}
          >
            <FaUserCircle className="h-7 w-7 text-gray-400 hover:text-white" />
            <span className="hidden md:block text-gray-200 font-semibold">
              {user ? user.name : 'Guest'}
            </span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
              {user ? (
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                  <p className="font-semibold"><strong>Name:</strong> {user.name}</p>
                  <p className="text-gray-500 py-2">{user.email}</p>
                  <p className="text-gray-500 capitalize"><strong>Role:</strong> {user.role}</p>
                </div>
              ) : (
                <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                  Not logged in
                </div>
              )}
              {user?.role === 'admin' && ( // Only show profile settings for admin for example
                 <Link
                    to="/admin/profile" // Or just /profile
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsUserMenuOpen(false)}
                 >
                    Profile Settings
                 </Link>
              )}
             
              <button
                onClick={handleLogout}
                className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;