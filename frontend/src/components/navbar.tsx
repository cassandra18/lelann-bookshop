import React from 'react';

interface NavItem {
    name: string;
    link: string;
}
const NavItems: NavItem[] = [
    { name: 'Home', link: '/'},
    { name: 'Educational Books', link: '/educational-books'},
    { name: 'Other Books', link: '/other-books'},
    { name: 'Uniforms', link: '/uniforms'},
    { name: 'Stationary', link: '/stationary'},
    { name: 'Electronics', link: '/electronics'},
    { name: 'Toys', link: '/toys'},
    { name: 'Art Supplies', link: '/art-supplies'},
    { name: 'Toys & Games', link: '/toys-games'},
    { name: 'About Us', link: '/about-us'},
    { name: 'Contact Us', link: '/contact-us'},
];


const Navbar: React.FC = () => {
    return (
      <nav className=" text-white p-4 navbar shadow-md" style={{ background: "rgba(0, 0, 0, 0.2", backdropFilter: "blur"}}>
        <div className="container flex justify-between items-center">
          <div className="text-2xl font-bold text-[#FFD399]">Lelann Bookshop</div>
          <div className="hidden md:flex space-x-4">
            {NavItems.map((item) => (
              <a href={item.link} key={item.name} className="nav-link" activeClassName="active-link">
                {item.name}
              </a>
            ))}
          </div>
          <div className="md:hidden">
            <button className="text-white focus:outline-none">
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
            </button>
          </div>
        </div>
      </nav>
    );
  };
  

export default Navbar;