import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTodayAttendance();
  }, []);

  async function fetchTodayAttendance() {
    try {
      setLoading(true);

      const today = new Date();
      const dateString = today.toISOString().split("T")[0];

      const response = await fetch(`http://localhost:3005/api/attendanceByDay?date=${dateString}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.error("API Error:", response.status);
        setAttendanceData([]);
        setLoading(false);
        return;
      }

      const data = await response.json();
      setAttendanceData(data);
      setLoading(false);
    } catch (error) {
      console.error("API call failed:", error);
      setLoading(false);
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-500">All Employee Attendance Today</p>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-[250px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>

      {loading ? (
        <div className="text-gray-500">Loading attendance data...</div>
      ) : attendanceData.length === 0 ? (
        <div className="text-gray-500">No attendance records found for today.</div>
      ) : (
        <div className="overflow-x-auto w-[1040px] h-[692px] border border-gray-200 rounded-[10px]">
          <table className="min-w-full text-left">
            <thead>
              <tr className="border-b border-gray-300">
                <th className="py-3 px-4 text-gray-500">Employee Name</th>
                <th className="py-3 px-4 text-gray-500">Date</th>
                <th className="py-3 px-4 text-gray-500">Status</th>
                <th className="py-3 px-4 text-gray-500">Time</th>
                <th className="py-3 px-4 text-gray-500">Location</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b"
                  style={{
                    borderBottom: "1px solid rgba(162, 161, 168, 0.1)",
                  }}
                >
                  <td className="px-4 py-3">{item.userName}</td>
                  <td className="px-4 py-3">{new Date(item.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{item.status}</td>
                  <td className="px-4 py-3">{new Date(item.time).toLocaleTimeString()}</td>
                  <td className="px-4 py-3">{item.locationName}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Attendance;
