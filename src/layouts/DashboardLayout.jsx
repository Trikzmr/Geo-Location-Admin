import React from "react";
import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar fixed at top */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar fixed under navbar */}
        <aside className="w-64 fixed top-16 left-0 bottom-0 bg-white shadow-lg">
          <Sidebar />
        </aside>

        {/* Scrollable main content */}
        <main className="flex-1 ml-64 mt-16 p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
