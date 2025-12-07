import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import DashboardPage from "../Pages/DashboardPage";
import ForgetPassword from "../Pages/ForgetPassword";
import EnterOtp from "../Pages/EnterOtp";
import AllEmployees from "../Pages/AllEmployees";
import Attendance from "../Pages/Attendance";
import Holidays from "../Pages/Holidays";
import Notices from "../Pages/Notices";
import Settings from "../Pages/Settings";
import EmployeeApproval from "../Pages/EmployeeApproval";
import EmployeeApprovalDetails from "../Pages/EmployeeApprovalDetails";
import EmployeeDetails from "../Pages/EmployeeDetails";
import LeaveApplication from "../Pages/LeaveApplication"
import LeaveApplicationDetails from "../Pages/LeaveApplicationDetails"
import SchedulePage from "../Pages/SchedulePage";
import AddSchedule from "../Pages/AddSchedule";
import Landing from "../Pages/Landing";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password/:id" element={<ForgetPassword />} />
      <Route path="/enterOtp/:id" element={<EnterOtp />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="overview" element={<DashboardPage />} />
        <Route path="allEmployees" element={<AllEmployees />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="holidays" element={<Holidays />} />
        <Route path="notices" element={<Notices />} />
        <Route path="settings" element={<Settings />} />
        <Route path="employeeRequest" element={<EmployeeApproval />} />
        <Route path="employeeRequestDetails/:id" element={<EmployeeApprovalDetails />} />
        <Route path="employeeDetails/:id" element={<EmployeeDetails />} />
        <Route path="leaveApplication" element={<LeaveApplication/>} />
        <Route path="leaveApplicationDetails/:id" element={<LeaveApplicationDetails/>} />
        <Route path="schedule" element={<SchedulePage/>} />
        <Route path="schedule/add" element={<AddSchedule/>} />
      </Route>
    </Routes>
  );
};

export default Router;


