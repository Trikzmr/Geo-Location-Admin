import React, { useState } from "react";

const EmployeeDetails = () => {
  const [activeMainTab, setActiveMainTab] = useState("Profile");
  const [activeProfileTab, setActiveProfileTab] = useState("Personal Information");

  const employee = {
    name: "Brooklyn Simmons",
    role: "Project Manager",
    email: "brooklyn.s@example.com",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    personalInfo: {
      firstName: "Brooklyn",
      lastName: "Simmons",
      mobile: "(702) 555-0122",
      email: "brooklyn.s@example.com",
      dob: "July 14, 1995",
      maritalStatus: "Married",
      gender: "Female",
      nationality: "America",
      address: "2464 Royal Ln. Mesa, New Jersey",
      city: "California",
      state: "United States",
      zip: "35624",
    },
    attendance: [
      { date: "July 01, 2023", checkIn: "09:28 AM", checkOut: "07:00 PM", break: "0:30 Min", hours: "9:02 Hrs", status: "On Time" },
      { date: "July 02, 2023", checkIn: "09:20 AM", checkOut: "07:00 PM", break: "0:20 Min", hours: "9:20 Hrs", status: "On Time" },
      { date: "July 04, 2023", checkIn: "09:45 AM", checkOut: "07:00 PM", break: "0:40 Min", hours: "8:35 Hrs", status: "Late" },
    ],
    leaves: [
      { date: "July 01, 2023", duration: "July 05 - July 08", days: "3 Days", manager: "Mark Williams", status: "Pending" },
      { date: "Apr 05, 2023", duration: "Apr 06 - Apr 10", days: "4 Days", manager: "Mark Williams", status: "Approved" },
      { date: "Mar 12, 2023", duration: "Mar 14 - Mar 16", days: "2 Days", manager: "Mark Williams", status: "Approved" },
    ],
  };

  return (
    <div className="p-6">
      {/* Header */}

      <div className="flex justify-between items-center border-b pb-4 mb-6 w-[1140px]">
        <div className="flex items-center space-x-4">
          <img src={employee.avatar} alt={employee.name} className="w-20 h-20 rounded-full object-cover" />
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-gray-500">{employee.role}</p>
            <p className="text-gray-500">{employee.email}</p>
          </div>
        </div>
        <button className="flex items-center bg-[#7152F3] text-white px-5 py-2 rounded-[10px]">
          Edit Profile
        </button>
      </div>

      <div className="flex">

        {/* Main Vertical Tabs */}

        <div className="w-48 mr-4">
          {["Profile", "Attendance", "Leave"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveMainTab(tab)}
              className={`w-full text-left px-4 py-2 mb-2 rounded ${
                activeMainTab === tab
                  ? "bg-purple-100 text-purple-600 font-medium"
                  : "hover:bg-gray-100"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 border rounded p-6 w-[900px]">
          
          {/* Profile with Nested Tabs */}
          {activeMainTab === "Profile" && (
            <>
              <div className="flex space-x-4 mb-4 border-b">
                {["Personal Information", "Professional Information"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveProfileTab(tab)}
                    className={`py-2 px-4 -mb-px border-b-2 font-medium ${
                      activeProfileTab === tab
                        ? "border-[#7152F3] text-[#7152F3]"
                        : "border-transparent text-gray-500 hover:text-[#7152F3]"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Inner Tab Content */}
              {activeProfileTab === "Personal Information" && (
                <div className="grid grid-cols-2 gap-6">
                  {Object.entries(employee.personalInfo).map(([key, value]) => (
                    <div key={key}>
                      <p className="text-xs text-gray-500">{key.replace(/([A-Z])/g, " $1")}</p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeProfileTab === "Professional Information" && (
  <div className="grid grid-cols-2 gap-6">
    <div>
      <p className="text-xs text-gray-500">Employee ID</p>
      <p className="font-medium">879912390</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">User Name</p>
      <p className="font-medium">brooklyn_simmons</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Employee Type</p>
      <p className="font-medium">Office</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Email Address</p>
      <p className="font-medium">brooklyn.s@example.com</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Department</p>
      <p className="font-medium">Project Manager</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Designation</p>
      <p className="font-medium">Project Manager</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Working Days</p>
      <p className="font-medium">5 Days</p>
    </div>
    <div>
      <p className="text-xs text-gray-500">Joining Date</p>
      <p className="font-medium">July 10, 2022</p>
    </div>
    <div className="col-span-2">
      <p className="text-xs text-gray-500">Office Location</p>
      <p className="font-medium">2464 Royal Ln. Mesa, New Jersey</p>
    </div>
  </div>
)}

              
            </>
          )}

          {/* Attendance */}
          {activeMainTab === "Attendance" && (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Break</th>
                  <th>Working Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employee.attendance.map((att, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{att.date}</td>
                    <td>{att.checkIn}</td>
                    <td>{att.checkOut}</td>
                    <td>{att.break}</td>
                    <td>{att.hours}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          att.status === "On Time"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {att.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Leave */}
          {activeMainTab === "Leave" && (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="py-2">Date</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Reporting Manager</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {employee.leaves.map((leave, i) => (
                  <tr key={i} className="border-b">
                    <td className="py-2">{leave.date}</td>
                    <td>{leave.duration}</td>
                    <td>{leave.days}</td>
                    <td>{leave.manager}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : leave.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
