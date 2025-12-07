import React, { useEffect, useState, useRef } from "react";
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
  const [currentLocation, setCurrentLocation] = useState(null);
  const [currentLocationLoading, setCurrentLocationLoading] = useState(false);
  const [currentLocationError, setCurrentLocationError] = useState("");
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pollingIntervalRef = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
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
      // fetch current location as well (demo body as requested)
      getCurrentLocation();
    } catch (err) {
      console.error(err);
      setError("Failed to load employee details");
    } finally {
      setLoading(false);
    }
  }
  const getCurrentLocation = async()=>{
    try {
      setCurrentLocationError("");
      const api = "https://geo-location-based-attendence-tracking.onrender.com/api/currentLocation";
      const date = "2025-12-22";
      const container = {
        method: "POST",
        body: JSON.stringify({ userName: userName, date: date }),
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await fetch(api, container);
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to fetch current location");
      }
      const data = await res.json();
      if (data && data.latitude && data.longitude) {
        setCurrentLocation({ lat: data.latitude, lng: data.longitude, raw: data });
        setCurrentLocationError("");
      } else {
        setCurrentLocation(null);
        setCurrentLocationError("No location data returned");
      }
    } catch (err) {
      console.error(err);
      setCurrentLocationError(err.message || "Failed to fetch current location");
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

  // Set up continuous polling every 5 seconds
  useEffect(() => {
    getCurrentLocation();
    if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    pollingIntervalRef.current = setInterval(() => {
      getCurrentLocation();
    }, 5000);

    return () => {
      if (pollingIntervalRef.current) clearInterval(pollingIntervalRef.current);
    };
  }, [userName]);

  // Initialize Google Maps and draw geofence + user marker when currentLocation is present
  useEffect(() => {
    if (!mapRef.current) return;
    if (!currentLocation) return;

    let isMounted = true;
    const apiKey = "AIzaSyD7S5F0Kd8vDcR2NZM28FJ7sO04yh7RkiE";

    const loadScript = () =>
      new Promise((resolve, reject) => {
        if (window.google && window.google.maps) return resolve();
        if (!apiKey) return reject(new Error("Missing Google Maps API key"));
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = (e) => reject(e);
        document.head.appendChild(script);
      });

    loadScript()
      .then(() => {
        if (!isMounted) return;
        const google = window.google;
        const geofenceCenter = { lat: 22.5445, lng: 88.3587 };

        if (!mapInstanceRef.current) {
          mapInstanceRef.current = new google.maps.Map(mapRef.current, {
            center: geofenceCenter,
            zoom: 14,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: true,
          });
        }

        // Greener geofence circle
        if (circleRef.current) circleRef.current.setMap(null);
        circleRef.current = new google.maps.Circle({
          strokeColor: "#10B981",
          strokeOpacity: 0.85,
          strokeWeight: 3,
          fillColor: "#10B981",
          fillOpacity: 0.12,
          center: geofenceCenter,
          radius: 500,
          map: mapInstanceRef.current,
        });

        // Custom SVG marker with user icon
        const svgMarker = {
          path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z",
          fillColor: "#7152F3",
          fillOpacity: 1,
          strokeColor: "#fff",
          strokeWeight: 2,
          scale: 1.5,
          anchor: new google.maps.Point(12, 12),
        };

        // Update or create marker
        if (markerRef.current) {
          markerRef.current.setPosition({ lat: currentLocation.lat, lng: currentLocation.lng });
        } else {
          markerRef.current = new google.maps.Marker({
            position: { lat: currentLocation.lat, lng: currentLocation.lng },
            map: mapInstanceRef.current,
            icon: svgMarker,
            title: "Employee location",
          });
        }

        // Fit map bounds
        try {
          const bounds = new google.maps.LatLngBounds();
          bounds.extend(geofenceCenter);
          bounds.extend(markerRef.current.getPosition());
          mapInstanceRef.current.fitBounds(bounds, 100);
        } catch (err) {
          // ignore
        }
      })
      .catch((err) => {
        console.error("Google Maps failed to load:", err);
        setCurrentLocationError("Failed to load map");
      });

    return () => {
      isMounted = false;
    };
  }, [currentLocation]);

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
    <div className="p-3 md:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 pb-4 mb-6 gap-4">
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt={(employeeData?.firstName || "") + " " + (employeeData?.lastName || "")}
            className="w-16 md:w-20 h-16 md:h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-lg md:text-xl font-semibold">{`${employeeData?.firstName || ""} ${employeeData?.lastName || ""}`.trim() || "-"}</h2>
            <p className="text-sm md:text-base text-gray-500">{employeeData?.role || "-"}</p>
            <p className="text-sm md:text-base text-gray-500">{employeeData?.email || "-"}</p>
          </div>
        </div>
        <button className="w-full md:w-auto flex items-center justify-center bg-[#7152F3] text-white px-5 py-2 rounded-[10px] hover:bg-[#5d42d4] transition">
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Vertical Tabs - Responsive */}
        <div className="w-full lg:w-48">
          <div className="flex flex-wrap lg:flex-col gap-2 lg:space-y-2">
            {["Profile", "Attendance", "Leave", "Map"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveMainTab(tab)}
                className={`flex-1 lg:flex-none text-left px-3 md:px-4 py-2 rounded text-sm md:text-base transition ${
                  activeMainTab === tab
                    ? "bg-purple-100 text-purple-600 font-medium"
                    : "hover:bg-gray-100"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 border border-gray-300 rounded-[10px] p-4 md:p-6 bg-white">
          {/* Profile with Nested Tabs */}
          {activeMainTab === "Profile" && (
            <>
              <div className="flex flex-wrap gap-2 md:space-x-4 mb-4 border-b border-gray-300">
                {["Personal Information", "Professional Information"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveProfileTab(tab)}
                      className={`py-2 px-2 md:px-4 -mb-px border-b-2 font-medium text-sm md:text-base transition ${
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs text-gray-500">First Name</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.firstName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Last Name</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.lastName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Mobile</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.number || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Date of Birth</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.dob || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Present Address</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.presentAddress || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Permanent Address</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.permanentAddress || "-"}</p>
                  </div>
                  {!!(employeeData?.qualification && employeeData.qualification.length) && (
                    <div className="col-span-1 sm:col-span-2">
                      <p className="text-xs text-gray-500">Qualification</p>
                      <p className="font-medium text-sm md:text-base">{employeeData.qualification.join(", ")}</p>
                    </div>
                  )}
                  {!!(employeeData?.skills && employeeData.skills.length) && (
                    <div className="col-span-1 sm:col-span-2">
                      <p className="text-xs text-gray-500">Skills</p>
                      <p className="font-medium text-sm md:text-base">{employeeData.skills.join(", ")}</p>
                    </div>
                  )}
                </div>
              )}

              {activeProfileTab === "Professional Information" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <p className="text-xs text-gray-500">User Name</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.userName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Role</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.role || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email Address</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.email || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.status || "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Created At</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.createdAt ? new Date(employeeData.createdAt).toLocaleString() : "-"}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Updated At</p>
                    <p className="font-medium text-sm md:text-base">{employeeData?.updatedAt ? new Date(employeeData.updatedAt).toLocaleString() : "-"}</p>
                  </div>
                  <div className="col-span-1 sm:col-span-2">
                    <p className="text-xs text-gray-500">Office Location</p>
                    <p className="font-medium text-sm md:text-base">{mapAddress || "-"}</p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* Attendance */}
          {activeMainTab === "Attendance" && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-[#7152F3]">
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Check In</th>
                    <th className="py-2 px-2">Check Out</th>
                    <th className="py-2 px-2">Break</th>
                    <th className="py-2 px-2">Working Hours</th>
                    <th className="py-2 px-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendanceData.map((att, i) => (
                    <EmployeeAttendance i={i} att={att}/>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Leave */}
          {activeMainTab === "Leave" && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-[#7152F3]">
                    <th className="py-2 px-2">Date</th>
                    <th className="py-2 px-2">Duration</th>
                    <th className="py-2 px-2">Days</th>
                    <th className="py-2 px-2">Reporting Manager</th>
                    <th className="py-2 px-2">Status</th>
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
            </div>
          )}

          {/* Map */}
          {activeMainTab === "Map" && (
            <div className="w-full">
              {currentLocationLoading ? (
                <div className="w-full h-64 md:h-96 flex items-center justify-center text-gray-500 bg-gray-100 rounded-md">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#7152F3] mx-auto mb-2"></div>
                    Loading map...
                  </div>
                </div>
              ) : currentLocation ? (
                <>
                  <div className="mb-3 text-xs md:text-sm text-gray-600 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Live location with geofence (500m) - Updates every 5 seconds
                  </div>
                  <div ref={mapRef} className="w-full h-64 md:h-[500px] rounded-md border border-gray-300" style={{ minHeight: "300px", backgroundColor: "#f0f0f0" }} />
                  <div className="mt-3 md:mt-4 p-3 md:p-4 border border-gray-200 rounded bg-white">
                    <div className="text-xs text-gray-500">Coordinates</div>
                    <div className="font-medium text-sm md:text-base">{currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</div>
                    {currentLocation.raw && (
                      <div className="text-xs text-gray-500 mt-1">ID: {currentLocation.raw._id}</div>
                    )}
                  </div>
                </>
              ) : (
                <div className="w-full h-64 md:h-96 flex items-center justify-center">
                  <div className="text-center p-6 md:p-8 bg-white border border-gray-200 rounded-lg shadow-sm max-w-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM12 14c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z" />
                    </svg>
                    <h3 className="text-base md:text-lg font-semibold mb-2">No location found</h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-4">This employee hasn't shared their location for today.</p>
                    <button onClick={getCurrentLocation} className="w-full bg-[#7152F3] text-white px-4 py-2 rounded-[8px] hover:bg-[#5d42d4] transition text-sm md:text-base">
                      Retry
                    </button>
                    {currentLocationError && (
                      <div className="mt-3 text-xs md:text-sm text-red-600">{currentLocationError}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
