// src/components/Layout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // This component will be created next
import Header from './Header'; // Your new Header component

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {/* This div controls the sidebar's position and visibility.
        - `fixed inset-y-0 left-0`: Makes it stick to the left edge vertically.
        - `transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`: Animates it in/out on mobile.
        - `lg:relative lg:translate-x-0`: Keeps it visible and relative on large screens.
        - `transition-transform duration-300 ease-in-out`: Smooth animation.
        - `z-30 lg:z-auto`: Ensures it's on top on mobile.
        - `w-64 bg-gray-800 flex-shrink-0`: Defines its width, background, and prevents shrinking.
      */}
      <div
        className={`fixed inset-y-0 left-0 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                     lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-30 lg:z-auto w-64 bg-gray-800 flex-shrink-0`}
      >
        {/* Pass a function to Sidebar to allow it to close itself, if needed */}
        <Sidebar onClose={toggleSidebar} />
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {/* This overlay appears when the sidebar is open on smaller screens.
        Clicking it closes the sidebar.
      */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Pass the toggle function to the Header component */}
        <Header onMenuToggle={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-200 p-6">
          <Outlet /> {/* This is where your routed content (e.g., ProductsPage) will be rendered */}
        </main>
      </div>
    </div>
  );
};

export default Layout;