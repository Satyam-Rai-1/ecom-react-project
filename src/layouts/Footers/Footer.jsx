import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">About Us</h3>
          <p className="text-gray-300">
            We are an innovative e-commerce platform offering the best products at the most competitive prices. Join us for a seamless shopping experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul>
            <li>
              <NavLink to="/" className="text-gray-300 hover:text-white">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" className="text-gray-300 hover:text-white">
                Products
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" className="text-gray-300 hover:text-white">
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/user/profile" className="text-gray-300 hover:text-white">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul>
            <li>
              <NavLink to="/faq" className="text-gray-300 hover:text-white">
                FAQ
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className="text-gray-300 hover:text-white">
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/returns" className="text-gray-300 hover:text-white">
                Returns & Exchanges
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-gray-300 hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.23 0H1.77A1.77 1.77 0 000 1.77v20.46A1.77 1.77 0 001.77 24h11.17v-9.29h-3v-3.6h3v-2.66c0-3.1 1.84-4.81 4.63-4.81 1.35 0 2.73.1 3.15.15v3.5h-2.17c-1.68 0-2.17.8-2.17 2.02v2.63h4.33l-1.36 3.6h-3v9.29h6.49a1.77 1.77 0 001.77-1.77V1.77A1.77 1.77 0 0022.23 0z"/>
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-gray-300 hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.46 6.003c-.78.349-1.61.58-2.48.684a4.287 4.287 0 001.885-2.38c-.833.49-1.75.844-2.72 1.034A4.263 4.263 0 0016.57 4c-2.38 0-4.31 1.93-4.31 4.31 0 .337.03.666.09.98a12.187 12.187 0 01-8.876-4.5 4.293 4.293 0 001.33 5.73 4.215 4.215 0 01-1.95-.536c-.05.02-.1.04-.15.06-.49 1.51 1.02 2.92 2.49 2.92-1.04.81-2.34 1.28-3.72 1.28-.24 0-.47-.01-.7-.03a12.271 12.271 0 006.74 1.98c8.08 0 12.52-6.69 12.52-12.52 0-.19 0-.38-.01-.57A8.888 8.888 0 0022.46 6.003z"/>
              </svg>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <svg className="w-6 h-6 text-gray-300 hover:text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.16c1.98 0 2.21 0 2.98.03 1.04.03 1.82.22 2.35.57a4.28 4.28 0 011.56 1.56c.35.53.54 1.31.57 2.35.03.77.03 1 .03 2.98s0 2.21-.03 2.98c-.03 1.04-.22 1.82-.57 2.35a4.28 4.28 0 01-1.56 1.56c-.53.35-1.31.54-2.35.57-.77.03-.98.03-2.98.03s-2.21 0-2.98-.03c-1.04-.03-1.82-.22-2.35-.57a4.28 4.28 0 01-1.56-1.56c-.35-.53-.54-1.31-.57-2.35-.03-.77-.03-1-.03-2.98s0-2.21.03-2.98c.03-1.04.22-1.82.57-2.35a4.28 4.28 0 011.56-1.56c.53-.35 1.31-.54 2.35-.57C9.79 2.16 10.02 2.16 12 2.16zm0 3.67c-1.53 0-2.78 1.25-2.78 2.78s1.25 2.78 2.78 2.78 2.78-1.25 2.78-2.78-1.25-2.78-2.78-2.78zm0 4.09c-.72 0-1.28-.58-1.28-1.28s.58-1.28 1.28-1.28 1.28.58 1.28 1.28-.58 1.28-1.28 1.28z"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <p className="text-gray-300">123 E-commerce St, City, Country</p>
          <p className="text-gray-300">Email: support@myecommerce.com</p>
          <p className="text-gray-300">Phone: +1 234 567 890</p>
        </div>
      </div>

      <div className="text-center text-gray-400 mt-8">
        <p>&copy; 2025 My E-commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
