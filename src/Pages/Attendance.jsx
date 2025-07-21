import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    onload();
  }, []);

  async function onload() {
    try {
      const today = new Date();
      const dateString = today.toISOString().split("T")[0];

      const response = await fetch("http://localhost:3005/api/attendanceByDay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date: dateString }),
      });

      const data = await response.json();
      if (response.ok) {
        setAttendanceData(data);
        console.log(data);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 w-full overflow-hidden">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-500">All Employee Attendance</p>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-[250px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>

      <div className="overflow-x-auto w-[1040px] h-[692px] border border-gray-200 rounded-[10px]">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4 text-gray-500">Employee Name</th>
              <th className="py-3 px-4 text-gray-500">Designation</th>
              <th className="py-3 px-4 text-gray-500">Type</th>
              <th className="py-3 px-4 text-gray-500">Check In Time</th>
              <th className="py-3 px-4 text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="px-4 py-3 flex items-center gap-2 h-[44px]">
                  {/* Placeholder avatar */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.userName}`}
                    alt={item.userName}
                    className="w-8 h-8 rounded-full"
                  />
                  {item.userName}
                </td>
                <td className="px-4 py-3 h-[44px]">{"Software Engineer"}</td> {/* Optional */}
                <td className="px-4 py-3 h-[44px]">{"Full-Time"}</td> {/* Optional */}
                <td className="px-4 py-3 h-[44px]">
                  {new Date(item.time?.[0]).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
                <td className="px-4 py-3 h-[44px]">
                  {item.status?.[0] === "check-in" ? (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                      On Time
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                      Late
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 w-[1040px]">
        <div className="text-sm text-gray-500">Showing {attendanceData.length} records</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded">{"<"}</button>
          <button className="px-3 py-1 border rounded bg-[#7152F3] text-white">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <button className="px-3 py-1 border rounded">{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
