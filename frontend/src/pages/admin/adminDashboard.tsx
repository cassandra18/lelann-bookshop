
// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/adminComponents/Sidebar';
import Header from   '../../components/adminComponents/Header.tsx'

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                     lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 lg:z-auto w-64 bg-gray-800 flex-shrink-0`}
      >
        <Sidebar onClose={toggleSidebar} />
      </div>
        {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Layout;