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
  MapPin,
  Calendar,
} from "lucide-react";
import { SiTrueup } from "react-icons/si";

const sidebarItems = [
  { icon: <Home size={18} />, title: "Dashboard", to: "overview", enabled: true },
  { icon: <CalendarCheck size={18} />, title: "Attendance", to: "attendance", enabled: true },
  { icon: <Users size={18} />, title: "All Employees", to: "allEmployees", enabled: true },
  { icon: <MailOpen size={18} />, title: "Employee Requests", to: "employeeRequest", enabled: true },
  { icon: <FileText size={18} />, title: "Leave Applications", to: "leaveApplication", enabled: true },
  { icon: <CalendarDays size={18} />, title: "Holidays", to: "holidays", enabled: true },
  { icon: <Megaphone size={18} />, title: "Notices", to: "notices", enabled: false },
  { icon: <MapPin size={18} />, title: "Location", to: "location", enabled: false },
  { icon: <Calendar size={18} />, title: "Schedule", to: "schedule", enabled: true },
  { icon: <Settings size={18} />, title: "Settings", to: "settings", enabled: true },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-white border-r border-gray-300 shadow-sm flex flex-col justify-between">
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
        {sidebarItems.map(({ icon, title, to, enabled }, index) => {
          const isActive = location.pathname.endsWith(to);
          return (
            <li key={index}>
              {enabled ? (
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
              ) : (
                <div
                  className="flex items-center space-x-3 px-4 py-2 rounded-lg text-gray-400 cursor-not-allowed opacity-50"
                >
                  {icon}
                  <span>{title}</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      
    </div>
  );
};

export default Sidebar;
