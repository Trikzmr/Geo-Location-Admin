import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";

const LeaveApplication = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  useEffect(() => {
    apicall();
  }, []);

  async function apicall() {
    try {
      let api =
        "https://geo-location-based-attendence-tracking.onrender.com/api/getAllLeaveRequest";

      let container = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      let response = await fetch(api, container);
      let data = await response.json();
      setLeaveRequests(data);
      setLoading(false);
    } catch (error) {
      console.error("API call failed : ", error);
      setLoading(false);
    }
  }

  // 🔍 Search filter
  const filteredRequests = leaveRequests.filter((req) =>
    req.userName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 📄 Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRequests.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRequests.length / recordsPerPage);

  const formatDate = (dateStr) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">
          Leave Application
        </h1>
        <p className="text-gray-500 text-sm">All employee leave requests</p>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full md:w-1/2">
          <BiSearch className="absolute top-3.5 left-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by username"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1); // reset to page 1 after search
            }}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-4">
            <div className="animate-pulse">
              {/* Table header skeleton */}
              <div className="flex space-x-4 mb-4 pb-3 border-b border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
              {/* Table rows skeleton */}
              {[1, 2, 3, 4, 5].map((index) => (
                <div key={index} className="flex space-x-4 py-3 border-b border-gray-100">
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium">
              <tr>
                <th className="px-5 py-3">UserName</th>
                <th className="px-5 py-3">Date</th>
                <th className="px-5 py-3">Duration</th>
                <th className="px-5 py-3">Days</th>
                <th className="px-5 py-3">Reporting Manager</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {currentRecords.length > 0 ? (
                currentRecords.map((req, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-5 py-3">{req.userName}</td>
                    <td className="px-5 py-3">
                      {formatDate(req.requestedDate)}
                    </td>
                    <td className="px-5 py-3">
                      {formatDate(req.startingDate)} to{" "}
                      {formatDate(req.endingDate)}
                    </td>
                    <td className="px-5 py-3">
                      {Math.ceil(
                        (new Date(req.endingDate) -
                          new Date(req.startingDate)) /
                          (1000 * 60 * 60 * 24)
                      ) + 1}{" "}
                      days
                    </td>

                    <td className="px-5 py-3">{req.adminId}</td>
                    <td className="px-5 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          req.approvalStatus === "Approved"
                            ? "bg-green-100 text-green-600"
                            : req.approvalStatus === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-500"
                        }`}
                      >
                        {req.approvalStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-4 text-gray-500"
                  >
                    No leave requests found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {filteredRequests.length > 0 && (
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-500">
          <div>
            Showing{" "}
            <strong>
              {indexOfFirstRecord + 1} to{" "}
              {Math.min(indexOfLastRecord, filteredRequests.length)}
            </strong>{" "}
            of <strong>{filteredRequests.length}</strong> records
          </div>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              {"<"}
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === i + 1
                    ? "bg-purple-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-3 py-1 border rounded-md hover:bg-gray-100 disabled:opacity-50"
            >
              {">"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaveApplication;
