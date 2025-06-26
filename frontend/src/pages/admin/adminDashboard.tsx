import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/adminComponents/Sidebar';
import Header from '../../components/adminComponents/Header';

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-[#001D29] text-white">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 lg:z-auto w-64 bg-[#001D29] shadow-lg`}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>

      {/* Mobile overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 bg-[#001D29] text-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
