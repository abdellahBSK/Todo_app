import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Check if the user is on the login or register page to highlight the active link
  const isLoginActive = location.pathname === "/login";
  const isRegisterActive = location.pathname === "/register";

  return (
    <div className="navbar bg-base-100 shadow-md px-4 sm:px-8">
      <div className="navbar-start">
        <Link to="/" className="flex items-center">
          {/* Logo */}
          <div className="bg-neutral rounded-lg p-2 mr-2">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="h-6 w-6 text-white"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight">TaskFlow</span>
        </Link>
      </div>
      
      {/* Desktop menu */}
      <div className="navbar-end hidden sm:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">
          <li>
            <Link 
              to="/login" 
              className={`px-4 py-2 rounded-md ${isLoginActive ? 'bg-neutral text-white' : 'hover:bg-base-200'}`}
            >
              Se connecter
            </Link>
          </li>
          <li>
            <Link 
              to="/register" 
              className={`px-4 py-2 rounded-md ${isRegisterActive ? 'bg-neutral text-white' : 'hover:bg-base-200'}`}
            >
              S'inscrire
            </Link>
          </li>
        </ul>
      </div>
      
      {/* Mobile menu button */}
      <div className="navbar-end sm:hidden">
        <button 
          className="btn btn-ghost btn-circle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 6h16M4 12h16M4 18h7" 
            />
          </svg>
        </button>
      </div>
      
      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="absolute top-16 right-4 mt-2 w-48 rounded-md shadow-lg bg-base-100 ring-1 ring-black ring-opacity-5 sm:hidden z-50">
          <div className="py-1">
            <Link 
              to="/login" 
              className={`block px-4 py-2 text-sm ${isLoginActive ? 'bg-neutral text-white' : 'hover:bg-base-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Se connecter
            </Link>
            <Link 
              to="/register" 
              className={`block px-4 py-2 text-sm ${isRegisterActive ? 'bg-neutral text-white' : 'hover:bg-base-200'}`}
              onClick={() => setIsMenuOpen(false)}
            >
              S'inscrire
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;