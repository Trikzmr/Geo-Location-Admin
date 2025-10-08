import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white/90 backdrop-blur shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-[#7152F3] flex items-center justify-center text-white font-bold">AT</div>
          <span className="text-xl font-semibold text-gray-800">Attendence Admin</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-gray-700 hover:text-[#7152F3] font-medium">Home</Link>
          <a href="#features" className="text-gray-700 hover:text-[#7152F3] font-medium">Features</a>
          <a href="#how-it-works" className="text-gray-700 hover:text-[#7152F3] font-medium">How it works</a>
          <Link to="/dashboard/overview" className="text-gray-700 hover:text-[#7152F3] font-medium">Dashboard</Link>
          
          {isAuthenticated ? (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                className="flex items-center space-x-2 text-gray-700 hover:text-[#7152F3] font-medium transition-colors"
              >
                <div className="w-8 h-8 bg-[#7152F3] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <span>{user?.name || user?.email?.split('@')[0]}</span>
              </button>
              
              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || user?.email?.split('@')[0] || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <Link
                      to="/dashboard/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      <Settings size={16} className="mr-3" />
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setShowProfileDropdown(false);
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <LogOut size={16} className="mr-3" />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link to="/login" className="bg-[#7152F3] text-white px-5 py-2 rounded-[10px] hover:bg-[#5c40c9] transition">Login</Link>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4"
          >
            <Link to="/" className="block text-gray-700 hover:text-[#7152F3] font-medium" onClick={() => setIsOpen(false)}>Home</Link>
            <a href="#features" className="block text-gray-700 hover:text-[#7152F3] font-medium" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#how-it-works" className="block text-gray-700 hover:text-[#7152F3] font-medium" onClick={() => setIsOpen(false)}>How it works</a>
            <Link to="/dashboard/overview" className="block text-gray-700 hover:text-[#7152F3] font-medium" onClick={() => setIsOpen(false)}>Dashboard</Link>
            
            {isAuthenticated ? (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex items-center space-x-3 px-2 py-2">
                    <div className="w-8 h-8 bg-[#7152F3] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name || user?.email?.split('@')[0] || 'User'}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                  </div>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-2 py-2 text-sm text-gray-700 hover:text-[#7152F3] font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="flex items-center w-full px-2 py-2 text-sm text-gray-700 hover:text-[#7152F3] font-medium"
                  >
                    <LogOut size={16} className="mr-3" />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="w-full inline-flex justify-center bg-[#7152F3] text-white px-5 py-2 rounded-[10px] hover:bg-[#5c40c9] transition" onClick={() => setIsOpen(false)}>Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
