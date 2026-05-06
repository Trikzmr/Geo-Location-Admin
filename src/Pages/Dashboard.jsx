import React from "react";
import Sidebar from "../Components/Sidebar";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="h-screen flex flex-col">

      <div className="flex flex-1">
        {/* Sidebar fixed under Navbar */}
        <div className="w-64 top-[64px] left-0 bg-white border-r">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-scroll p-4 h-screen">
          <Outlet />
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
