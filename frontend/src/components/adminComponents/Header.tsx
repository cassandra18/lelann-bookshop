// src/components/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle, FaBell, FaBars, FaSignOutAlt } from 'react-icons/fa';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const user = {
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'administrator',
  };

  const handleLogout = () => {
    console.log('User logged out');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-800 text-white shadow-md z-20">
      <div className="flex items-center">
        <button
          onClick={onMenuToggle}
          className="lg:hidden text-white focus:outline-none mr-4"
          aria-label="Toggle sidebar menu"
        >
          <FaBars className="h-6 w-6" />
        </button>

        <Link to="/admin" className="text-2xl font-bold text-[#ffea00] barlow-bold">
          Admin Dashboard
        </Link>
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
            <FaUserCircle className="h-7 w-7 text-gray-400" />
            <span className="hidden md:block text-gray-200 font-semibold">{user.name}</span>
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30">
              <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                <p className="font-semibold">{user.name}</p>
                <p className="text-gray-500">{user.email}</p>
                <p className="text-gray-500 capitalize">{user.role}</p>
              </div>
              <Link
                to="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsUserMenuOpen(false);
                }}
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