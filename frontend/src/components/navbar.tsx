import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { NavItems } from "./navItems";
import { FaSearch } from "react-icons/fa";

const Navbar: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      console.log('Searching for:', searchItem);
      // Add search functionality here

      setSearchItem("");
  }
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="shadow-md w-full" >
      <div className="w-full " style={{ background: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur" }}>
      {/* Top Header (Logo, Search, Cart, Account) */}
      <div
        className=" text-white p-4 max-w-screen-xl mx-auto"
        
      >
        <div className="container flex justify-between items-center space-x-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-[#FFD399]">
            Lelann Bookshop
          </div>

          {/* Search Bar */}
          <form className="flex-1 mx-4 flex items-center" onSubmit={handleSearch}>
            <input
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search for products..."
              className="w-full py-2 px-4 rounded bg-gray-800 text-white focus:outline-none"
              style={{ fontFamily: "Kanit, sans-serif", fontWeight: "200", borderTopRightRadius: "0", borderBottomRightRadius: "0", }}
            />
            <button
                type="submit"
                className="bg-gray-800 p-3  rounded-r focus:outline-none hover:bg-gray-700"
                style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
              >
                <FaSearch className="text-white" />
              </button>
          </form>

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
      </div>
      </div>

      
      {/* Navigation Bar */}
      <nav className="text-white w-full"  style={{ background: "rgba(0, 0, 0, 0.3)", backdropFilter: "blur", }}>
        <div className="max-w-screen-xl mx-auto flex justify-between items-center py-2 px-4">
          {/* Desktop navigation */}
          <div className="hidden lg:flex space-x-4">
            {NavItems.map((item) => (
              <div key={item.name} className="relative group">
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    isActive ? "nav-link active-link" : "nav-link"
                  }
                  style={{fontFamily:"Kanit, sans-serif", fontWeight: "600"}}
                >
                  {item.name}
                </NavLink>
                {item.subLinks && (
                  <div
                    className="absolute hidden group-hover:flex flex-wrap gap-4 p-4 shadow-md mt-2 rounded-sm top-full left-0 z-20"
                    style={{
                      background: "rgba(0, 0, 0, 0.8)",
                      backdropFilter: "blur",
                      minWidth: "500px",
                      maxWidth: "800px",
                      fontFamily:"Kanit, sans-serif",
                      fontWeight: "450"
                    }}
                  >
                    {item.subLinks.map((subItem) => (
                      <NavLink
                        to={subItem.link}
                        key={subItem.name}
                        className="block px-4 py-2 hover:text-sunset w-1/3 whitespace-nowrap"
                        style={{flexBasis: "40%"}}
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
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="lg:hidden flex flex-col space-y-4 mt-2 items-center">
            {NavItems.map((item) => (
              <div key={item.name} className="relative group">
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
                        className="absolute hidden group-hover:flex flex-wrap px-4 py-2 hover:bg-gray-800"
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
    </header>
  );
};

export default Navbar;
