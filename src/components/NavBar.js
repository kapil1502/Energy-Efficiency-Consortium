import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => (
    <nav className="bg-green-600 shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link to="/">Energy Certification</Link>
        </div>
        <ul className="flex space-x-6">
          <li>
            <Link to="/" className="text-white hover:text-gray-200 transition duration-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/certify-product" className="text-white hover:text-gray-200 transition duration-300">
              Certify Product
            </Link>
          </li>
          <li>
            <Link to="/manage-issuers" className="text-white hover:text-gray-200 transition duration-300">
              Manage Issuers
            </Link>
          </li>
          <li>
            <Link to="/verify-certification" className="text-white hover:text-gray-200 transition duration-300">
              Verify Certificate
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );

export default NavBar;
