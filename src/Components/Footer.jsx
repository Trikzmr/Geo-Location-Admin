import React from "react";
import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Brand & Description */}
        <div>
          <h2 className="text-2xl font-bold text-[#7152F3]">MyCompany</h2>
          <p className="mt-2 text-gray-600 text-sm">
            Building solutions that connect people and ideas, with innovation
            and excellence at the core.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">Quick Links</h3>
          <a href="#home" className="text-gray-600 hover:text-[#7152F3]">
            Home
          </a>
          <a href="#about" className="text-gray-600 hover:text-[#7152F3]">
            About Us
          </a>
          <a href="#services" className="text-gray-600 hover:text-[#7152F3]">
            Services
          </a>
          <a href="#contact" className="text-gray-600 hover:text-[#7152F3]">
            Contact
          </a>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="text-gray-600 hover:text-[#7152F3]" size={22} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="text-gray-600 hover:text-[#7152F3]" size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="text-gray-600 hover:text-[#7152F3]" size={22} />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="text-gray-600 hover:text-[#7152F3]" size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} MyCompany. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
