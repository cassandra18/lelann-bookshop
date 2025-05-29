// src/components/Sidebar.tsx
import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  FaTachometerAlt, 
  FaUsers,        
  FaBoxOpen,     
  FaThLarge,      
  FaPencilAlt,    
  FaBuilding,   
  FaTimes         
} from 'react-icons/fa'; 

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: FaTachometerAlt },
    { name: 'Users', path: '/admin/users', icon: FaUsers },
    { name: 'Products', path: '/admin/products', icon: FaBoxOpen },
    { name: 'Categories', path: '/admin/categories', icon: FaThLarge },
    { name: 'Authors', path: '/admin/authors', icon: FaPencilAlt },
    { name: 'Publishers', path: '/admin/publishers', icon: FaBuilding },
  ];

  return (
    <div className="w-full h-full bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center justify-between">
        <Link to="/admin" className="text-[#ffea00] barlow-bold">
          Admin Panel
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden text-white focus:outline-none"
          aria-label="Close sidebar menu"
        >
          <FaTimes className="h-6 w-6" />
        </button>
      </div>
      <nav className="flex-1 mt-5 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center py-3 px-4 transition-colors duration-200 ease-in-out
                   hover:bg-gray-700 hover:text-[#ffea00] ${isActive ? 'bg-gray-700 border-l-4 text-[#ffea00]' : ''}`
                }
                onClick={onClose}
              >
                <item.icon className="mr-3 text-lg" />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700 mt-auto">
        <p className="text-xs text-gray-500 text-center">&copy; {new Date().getFullYear()} Lelann Books and Stationaries</p>
      </div>
    </div>
  );
};

export default Sidebar;