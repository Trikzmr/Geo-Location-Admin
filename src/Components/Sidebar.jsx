import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  CalendarCheck,
  Users,
  MailOpen,
  FileText,
  CalendarDays,
  Megaphone,
  Settings,
} from "lucide-react";

const sidebarItems = [
  { icon: <Home size={18} />, title: "Dashboard", to: "" },
  { icon: <CalendarCheck size={18} />, title: "Attendance", to: "attendance" },
  { icon: <Users size={18} />, title: "All Employees", to: "allEmployees" },
  { icon: <MailOpen size={18} />, title: "Employee Requests", to: "employeeRequest" },
  { icon: <FileText size={18} />, title: "Leave Applications", to: "leaveApplication" },
  { icon: <CalendarDays size={18} />, title: "Holidays", to: "holidays" },
  { icon: <Megaphone size={18} />, title: "Notices", to: "notices" },
  { icon: <Settings size={18} />, title: "Settings", to: "settings" },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r shadow-sm flex flex-col justify-between">
      {/* Logo */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-500 text-white flex items-center justify-center rounded-full font-bold">
            G
          </div>
          <h1 className="text-lg font-semibold">GeoLocation</h1>
        </div>
      </div>

      {/* Menu */}
      <ul className="flex-1 px-2 space-y-1">
        {sidebarItems.map(({ icon, title, to }, index) => {
          const isActive = location.pathname.endsWith(to);
          return (
            <li key={index}>
              <Link
                to={to}
                className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition
                  ${
                    isActive
                      ? "text-[#7152F3] font-medium"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                {icon}
                <span>{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      
    </div>
  );
};

export default Sidebar;
