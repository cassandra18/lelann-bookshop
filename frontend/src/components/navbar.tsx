import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { NavItems } from "./navItems";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className="text-white p-4 navbar shadow-md"
      style={{ background: "rgba(0, 0, 0, 0.2)", backdropFilter: "blur" }}
    >
      <div className="container flex justify-between items-center">
        <div className="text-2xl font-bold text-[#FFD399]">Lelann Bookshop</div>
        
        {/* Desktop navigation */}
        <div className="hidden lg:flex space-4">
          {NavItems.map((item) => (
            <div key={item.name} className="relative group">
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
              >
                {item.name}
              </NavLink>
              {item.subLinks && (
                <div
                  className="absolute hidden group-hover:flex flex-wrap gap-4 p-4 shadow-md rounded-sm top-full left-0 z-20"
                  style={{ background: "rgba(0, 0, 0, 0.6)", backdropFilter: "blur", minWidth: "300px", maxWidth: "700px" }}
                >
                    {item.subLinks.map((subItem) => (
                      <NavLink
                        to={subItem.link}
                        key={subItem.name}
                        className="block px-4 py-2 hover:bg-gray-800 w-1/3"
                      >
                        {subItem.name}
                      </NavLink>
                    ))}
                  
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Small devices */}
        <div className="lg:hidden">
          <button className="menu-button" onClick={toggleMenu}>
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={3}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 px-4 rounded bg-gray-800 text-white"
          />
        </div>

        {/* Cart Icon */}
        <NavLink to="/cart" className="relative" style={{ fontSize: "32px" }}>
          <IoMdCart />
          {/* Example item count badge */}
          <div className="absolute -top-1 -right-1 bg-red-500 rounded-full h-4 w-4 text-xs flex items-center justify-center text-white">
            2
          </div>
        </NavLink>

        {/* Account Link */}
        <NavLink to="/account" className="ml-4">
          <FaUserCircle size={24} />
        </NavLink>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="lg:hidden flex flex-col space-y-4 mt-2 items-center">
          {NavItems.map((item) => (
            <div key={item.name}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  isActive ? "nav-link active-link" : "nav-link"
                }
                onClick={toggleMenu}
              >
                {item.name}
              </NavLink>
              {item.subLinks && (
                <div className="space-y-2 mt-1">
                  {item.subLinks.map((subItem) => (
                    <NavLink
                      to={subItem.link}
                      key={subItem.name}
                      className="block px-4 py-2 hover:bg-gray-800"
                      onClick={toggleMenu}
                    >
                      {subItem.name}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
