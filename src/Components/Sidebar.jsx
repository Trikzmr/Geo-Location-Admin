import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      <ul className="space-y-2">
        <li><Link to="">Dashboard</Link></li>
        <li><Link to="attendance">Attendance</Link></li>
        <li><Link to="allEmployees">All Employees</Link></li>
        <li><Link to="employeeRequest">Employee Requests</Link></li>
        <li><Link to="leaveApplication">Leave Applications</Link></li>
        <li><Link to="holidays">Holidays</Link></li>
        <li><Link to="notices">Notices</Link></li>
        <li><Link to="settings">Settings</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
