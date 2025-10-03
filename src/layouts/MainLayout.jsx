import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fixed at top */}
      <Navbar />
      
      {/* Page content */}
      <main className="flex-1 mt-16 p-4">
        <Outlet />
      </main>
      
      {/* Footer at bottom */}
      <Footer />
    </div>
  );
};

export default MainLayout;
