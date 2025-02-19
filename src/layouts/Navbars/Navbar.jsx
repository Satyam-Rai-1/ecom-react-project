import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false); // State to track sticky navbar
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    // Function to track the scroll position
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Attach scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`bg-blue-600 p-4 transition-all duration-300 ease-in-out ${
        isSticky ? "fixed top-0 left-0 w-full z-50 shadow-lg transform transition-all duration-500" : "relative"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-white font-bold text-lg">
          <NavLink to="/" className="hover:text-gray-300">
            My E-commerce
          </NavLink>
        </div>

        {/* Navbar links (Desktop view) */}
        <div className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
          >
            Profile
          </NavLink>
        </div>

        {/* Hamburger Menu (Mobile view) */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Slide-in menu) */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 z-50 transition-all duration-300 ${isMenuOpen ? "block" : "hidden"}`}
        onClick={toggleMenu} // Close when clicking outside
      ></div>

      <div
        className={`fixed top-0 right-0 h-full bg-blue-600 w-64 p-6 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={toggleMenu} className="text-white absolute top-4 right-4">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Drawer Links */}
        <div className="flex flex-col space-y-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
            onClick={toggleMenu}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
            onClick={toggleMenu}
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
            onClick={toggleMenu}
          >
            Cart
          </NavLink>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
            }
            onClick={toggleMenu}
          >
            Profile
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
