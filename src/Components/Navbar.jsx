import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold text-[#7152F3]">MyCompany</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#home"
            className="text-gray-700 hover:text-[#7152F3] font-medium"
          >
            Home
          </a>
          <a
            href="/dashboard/overview"
            className="text-gray-700 hover:text-[#7152F3] font-medium"
          >
            Dashboard
          </a>
          <a
            href="#about"
            className="text-gray-700 hover:text-[#7152F3] font-medium"
          >
            About Us
          </a>
          <button className="bg-[#7152F3] text-white px-5 py-2 rounded-[10px] hover:bg-[#5c40c9] transition">
            Login / Profile
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
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
            <a
              href="#home"
              className="block text-gray-700 hover:text-[#7152F3] font-medium"
              onClick={() => setIsOpen(false)}
            >
              Home
            </a>
            <a
              href="dashboard"
              className="block text-gray-700 hover:text-[#7152F3] font-medium"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </a>
            <a
              href="#about"
              className="block text-gray-700 hover:text-[#7152F3] font-medium"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </a>
            <button
              className="w-full bg-[#7152F3] text-white px-5 py-2 rounded-[10px] hover:bg-[#5c40c9] transition"
              onClick={() => setIsOpen(false)}
            >
              Login / Profile
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
