import React, { useEffect, useState } from "react";
import EmployeeLeaves from "../Components/EmployeeProfile/EmployeeLeaves";
import EmployeeAttendance from "../Components/EmployeeProfile/EmployeeAttendance";
import { useParams } from "react-router-dom";

const EmployeeDetails = () => {
  const [activeMainTab, setActiveMainTab] = useState("Profile");
  const [activeProfileTab, setActiveProfileTab] = useState("Personal Information");
  const [attendanceData, setAttendanceData] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [leavesData, setLeavesData] = useState([]);
  let userName = useParams().id;
  const getAttendance = async()=>{
    console.log(userName);
    try {
      let api = "https://geo-location-based-attendence-tracking.onrender.com/api/getAttendanceByUsername";
      let container = {
        method: "POST",
        body: JSON.stringify({userName: userName}),
        headers: {
          "Content-Type": "application/json",
        },
      }
      let res = await fetch(api, container);
      let data = await res.json();
      console.log(data);
      setAttendanceData(data);
    } catch (error) {
      
    }
  }
  const getEmployee = async()=>{
    try {
      let api = "https://geo-location-based-attendence-tracking.onrender.com/api/getEmployeeByUsername";
      let container = {
        method: "POST",
        body: JSON.stringify({userName: userName}),
        headers: {
          "Content-Type": "application/json",
        },
      }
      let res = await fetch(api, container);
      if(!res.ok){
        const msg = await res.text();
        throw new Error(msg || "Failed to fetch employee");
      }
      let data = await res.json();
      setEmployeeData(data);
      setError("");
      // after employee is loaded, fetch leaves by userId (_id)
      if (data && data._id) {
        getLeavesByUserId(data._id);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load employee details");
    } finally {
      setLoading(false);
    }
  }
  const getLeavesByUserId = async(userId)=>{
    try {
      let api = "https://geo-location-based-attendence-tracking.onrender.com/api/LeaveDataByuserId";
      let container = {
        method: "POST",
        body: JSON.stringify({userId}),
        headers: {
          "Content-Type": "application/json",
        },
      }
      let res = await fetch(api, container);
      if(!res.ok){
        const msg = await res.text();
        throw new Error(msg || "Failed to fetch leaves");
      }
      let data = await res.json();
      setLeavesData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }
  const onload =()=>{
    getAttendance();
    getEmployee();
  }
  const avatarUrl = employeeData
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(
        `${employeeData.firstName || ""} ${employeeData.lastName || ""}`.trim()
      )}&background=random`
    : "https://ui-avatars.com/api/?name=User&background=random";

  useEffect(onload, []);

  // Generate Google Maps embed URL with pin
  const mapAddress = employeeData?.presentAddress || employeeData?.permanentAddress || "";
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    mapAddress
  )}&output=embed`;

  if (loading) {
    return (
      <div className="p-6">
        {/* Header Skeleton */}
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6 w-[1140px]">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-40 animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded-[10px] w-32 animate-pulse"></div>
        </div>

        <div className="flex">
          {/* Sidebar Skeleton */}
          <div className="w-48 mr-4 space-y-2">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="h-10 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>

          {/* Content Skeleton */}
          <div className="flex-1 border border-gray-300 rounded-[10px] p-6 w-[900px]">
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
              <div className="grid grid-cols-2 gap-6">
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">Error loading employee details: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6 w-[1140px]">
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt={(employeeData?.firstName || "") + " " + (employeeData?.lastName || "")}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-xl font-semibold">{`${employeeData?.firstName || ""} ${employeeData?.lastName || ""}`.trim() || "-"}</h2>
            <p className="text-gray-500">{employeeData?.role || "-"}</p>
            <p className="text-gray-500">{employeeData?.email || "-"}</p>
          </div>
        </div>
        <button className="flex items-center bg-[#7152F3] text-white px-5 py-2 rounded-[10px]">
          Edit Profile
        </button>
      </div>

      <div className="flex">
        {/* Main Vertical Tabs */}
        <div className="w-48 mr-4">
          {["Profile", "Attendance", "Leave", "Map"].map((tab) => (
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
        <div className="flex-1 border border-gray-300 rounded-[10px] p-6 w-[900px]">
          {/* Profile with Nested Tabs */}
          {activeMainTab === "Profile" && (
            <>
              <div className="flex space-x-4 mb-4 border-b border-gray-300">
                {["Personal Information", "Professional Information"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveProfileTab(tab)}
                      className={`py-2 px-4 -mb-px border-b border-[#7152F3] font-medium ${
                        activeProfileTab === tab
                          ? "border-[#7152F3] text-[#7152F3]"
                          : "border-transparent text-gray-500 hover:text-[#7152F3]"
                      }`}
                    >
                      {tab}
                    </button>
                  )
                )}
              </div>

              {/* Inner Tab Content */}
              {activeProfileTab === "Personal Information" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500">First Name</p>
                    <p className="font-medium">{employeeData?.firstName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Name</p>
                    <p className="font-medium">{employeeData?.lastName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="font-medium">{employeeData?.number || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium">{employeeData?.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-medium">{employeeData?.dob || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Present Address</p>
                    <p className="font-medium">{employeeData?.presentAddress || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Permanent Address</p>
                    <p className="font-medium">{employeeData?.permanentAddress || "-"}</p>
                  </div>
                  {!!(employeeData?.qualification && employeeData.qualification.length) && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Qualification</p>
                      <p className="font-medium">{employeeData.qualification.join(", ")}</p>
                    </div>
                  )}
                  {!!(employeeData?.skills && employeeData.skills.length) && (
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Skills</p>
                      <p className="font-medium">{employeeData.skills.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}

              {activeProfileTab === "Professional Information" && (
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs text-gray-500">User Name</p>
                    <p className="font-medium">{employeeData?.userName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium">{employeeData?.role || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="font-medium">{employeeData?.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-medium">{employeeData?.status || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created At</p>
                    <p className="font-medium">{employeeData?.createdAt ? new Date(employeeData.createdAt).toLocaleString() : "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Updated At</p>
                    <p className="font-medium">{employeeData?.updatedAt ? new Date(employeeData.updatedAt).toLocaleString() : "-"}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-xs text-gray-500">Office Location</p>
                    <p className="font-medium">{mapAddress || "-"}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Attendance */}
          {activeMainTab === "Attendance" && (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-[#7152F3]">
                  <th className="py-2">Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Break</th>
                  <th>Working Hours</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((att, i) => (
                  <EmployeeAttendance i={i} att={att}/>
                ))}
              </tbody>
            </table>
          )}

          {/* Leave */}
          {activeMainTab === "Leave" && (
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-[#7152F3]">
                  <th className="py-2">Date</th>
                  <th>Duration</th>
                  <th>Days</th>
                  <th>Reporting Manager</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {leavesData.map((leave) => {
                  const requested = leave.requestedDate ? new Date(leave.requestedDate) : null;
                  const start = leave.startingDate ? new Date(leave.startingDate) : null;
                  const end = leave.endingDate ? new Date(leave.endingDate) : null;
                  const msPerDay = 1000 * 60 * 60 * 24;
                  const dayCount = start && end ? Math.max(1, Math.round((end - start) / msPerDay) + 1) : "-";
                  const mapped = {
                    date: requested ? requested.toLocaleDateString() : "-",
                    duration: start && end ? `${start.toLocaleDateString()} - ${end.toLocaleDateString()}` : "-",
                    days: dayCount,
                    manager: leave.adminName || "-",
                    status: leave.approvalStatus || "Pending",
                  };
                  return <EmployeeLeaves key={leave._id} leave={mapped}/>;
                })}
              </tbody>
            </table>
          )}

          {/* Map */}
          {activeMainTab === "Map" && (
            <div className="w-full h-[500px]">
              <iframe
                title="Employee Location"
                src={mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
