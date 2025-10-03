import React, { useEffect, useState } from "react";

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    onload();
  }, []);

  async function onload() {
    try {
      const today = new Date();
      const dateString = today.toISOString().split("T")[0];

      const response = await fetch(
        "https://geo-location-based-attendence-tracking.onrender.com/api/attendanceByDay",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ date: dateString }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setAttendanceData(data);
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  // --- Filtering ---
  const filteredData = attendanceData.filter((item) =>
    item.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination ---
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6 w-full overflow-hidden">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-500">All Employee Attendance</p>
        </div>
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to first page on search
          }}
          className="w-[250px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>

      <div className="overflow-x-auto w-[100%] border border-gray-200 rounded-[10px]">
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
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="px-4 py-3 flex items-center gap-2 h-[44px]">
                    <img
                      src={`https://ui-avatars.com/api/?name=${item.userName}`}
                      alt={item.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    {item.userName}
                  </td>
                  <td className="px-4 py-3 h-[44px]">Software Engineer</td>
                  <td className="px-4 py-3 h-[44px]">Full-Time</td>
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
              ))
            ) : (
              <tr>
                <td className="px-4 py-3 text-center" colSpan="5">
                  No records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4 w-[1040px]">
        <div className="text-sm text-gray-500">
          Showing {paginatedData.length} of {filteredData.length} records
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {"<"}
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === i + 1 ? "bg-[#7152F3] text-white" : ""
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
