import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"; // Use Redux for auth state management
import { logout } from "../../redux/features/authSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.user !== null); // Using Redux for login status
  const dispatch = useDispatch();

  // Handle scroll behavior for sticky navbar
  const handleScroll = () => {
    setIsSticky(window.scrollY > 0);
  };

  useEffect(() => {
    // Attach scroll event listener on mount
    window.addEventListener("scroll", handleScroll);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle logout action
  const handleLogout = () => {
    dispatch(logout()); // Use Redux logout action
  };

  // Reusable NavLink component
  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
      }
    >
      {children}
    </NavLink>
  );

  return (
    <nav
      className={`bg-blue-600 p-4 transition-all duration-300 ease-in-out ${
        isSticky ? "fixed top-0 left-0 w-full z-50 shadow-lg" : "relative"
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
          <NavItem to="/">Home</NavItem>
          <NavItem to="/products">Products</NavItem>
          <NavItem to="/cart">Cart</NavItem>
          

          {/* Conditionally render Login/Logout */}
          {!isLoggedIn ? (
            <>
              <NavItem to="/auth/login">Login</NavItem>
              <NavItem to="/auth/register">Register</NavItem>
            </>
          ) : (
            <>
            <NavItem to="/user/profile">Profile</NavItem>
            <button
              onClick={handleLogout}
              className="text-white font-semibold hover:text-gray-300"
              >
              Logout
            </button>
            </>
          )}
        </div>

        {/* Hamburger Menu (Mobile view) */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
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
        onClick={() => setIsMenuOpen(false)} // Close when clicking outside
      ></div>

      <div
        className={`fixed top-0 right-0 h-full bg-blue-600 w-64 p-6 z-50 transform transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button onClick={() => setIsMenuOpen(false)} className="text-white absolute top-4 right-4">
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
          <NavItem to="/" onClick={() => setIsMenuOpen(false)}>Home</NavItem>
          <NavItem to="/products" onClick={() => setIsMenuOpen(false)}>Products</NavItem>
          <NavItem to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</NavItem>
          

          {/* Conditionally render Login/Logout for Mobile */}
          {!isLoggedIn ? (
            <>
              <NavItem to="/auth/login" onClick={() => setIsMenuOpen(false)}>Login</NavItem>
              <NavItem to="/auth/register" onClick={() => setIsMenuOpen(false)}>Register</NavItem>
            </>
          ) : (
            <>
            <NavItem to="/user/profile" onClick={() => setIsMenuOpen(false)}>Profile</NavItem>
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="text-white font-semibold hover:text-gray-300"
              >
              Logout
            </button>
              </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
