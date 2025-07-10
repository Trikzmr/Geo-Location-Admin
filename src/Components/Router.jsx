// import React from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';

// // Your imports...
// import Login from '../Pages/Login';
// import Dashboard from '../Pages/Dashboard';
// import ForgetPassword from '../Pages/ForgetPassword';
// import DashboardPage from '../Pages/DashboardPage';
// import EnterOtp from '../Pages/EnterOtp';
// import Holidays from '../Pages/Holidays';
// import Notices from '../Pages/Notices';
// import Settings from '../Pages/Settings';
// import Attendance from '../Pages/Attendance';
// import AllEmployees from '../Pages/AllEmployees';
// import EmployeeApproval from '../Pages/EmployeeApproval';
// import EmployeeApprovalDetails from '../Pages/EmployeeApprovalDetails';
// import EmployeeDetails from '../Pages/EmployeeDetails';

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" replace />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/forget-password/:id" element={<ForgetPassword />} />
//       <Route path="/enterOtp/:id" element={<EnterOtp />} />
//       <Route path="/dashboard" element={<Dashboard />}>
//         <Route path="dashboardpage" element={<DashboardPage />} />
//         <Route path="holidays" element={<Holidays />} />
//         <Route path="notices" element={<Notices />} />
//         <Route path="settings" element={<Settings />} />
//         <Route path="attendance" element={<Attendance />} />
//         <Route path="allEmployees" element={<AllEmployees />} />
//         <Route path="employeeRequest" element={<EmployeeApproval />} />
//         <Route path="employeeRequestDetails/:id" element={<EmployeeApprovalDetails />} />
//         <Route path="employeeDetails/:id" element={<EmployeeDetails />} />
//         <Route path="leaveApplication" element={<EmployeeApproval />} />
//         <Route path="leaveApplicationDetails/:id" element={<EmployeeApprovalDetails />} />
//       </Route>
//     </Routes>
//   );
// };

// export default Router;


// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Login from "../Pages/Login";

// const Router = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//     </Routes>
//   );
// };

// export default Router;


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
const Router = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forget-password/:id" element={<ForgetPassword />} />
      <Route path="/enterOtp/:id" element={<EnterOtp />} />

      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="dashboardpage" element={<DashboardPage />} />
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
      </Route>
    </Routes>
  );
};

export default Router;


