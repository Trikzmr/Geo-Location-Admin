import React, { useEffect, useState, useRef } from "react";
import { BiSearch } from "react-icons/bi";

const LeaveApplication = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;

  // Dropdown state: store id of request with open menu (or null)
  const [openMenuFor, setOpenMenuFor] = useState(null);

  // Per-row updating state to disable actions while API in-flight
  const [updatingRowId, setUpdatingRowId] = useState(null);

  const containerRef = useRef(null);

  useEffect(() => {
    apicall();

    // close dropdown when clicking outside
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenMenuFor(null);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
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

  /**
   * updateStatus(requestId, newStatus, reqRow)
   *
   * - If newStatus === "Approved" -> calls Approve API
   * - If newStatus === "Rejected" -> calls Reject API (sends adminNote as empty string by default)
   * - If newStatus === "Pending" -> calls a generic update endpoint (change to your actual route if you have one)
   *
   * NOTE: Replace endpoint URLs and HTTP verbs with the actual ones in your backend.
   */
  async function updateStatus(requestId, newStatus, reqRow) {
  // Get the request id consistently
  const id = requestId ?? (reqRow?._id ?? reqRow?.id);
  if (!id) return console.error("No request id available");

  const prev = leaveRequests.find((r) => (r._id ?? r.id) === id);
  if (!prev) return;

  const adminId =
    localStorage.getItem("adminId") ||
    reqRow?.adminId ||
    "admin-placeholder";

  // Optimistic UI: keep a copy so we can rollback on error
  const prevStatus = prev.approvalStatus;
  setUpdatingRowId(id);
  setOpenMenuFor(null);

  // Option: comment out the optimistic update until backend confirmed
  setLeaveRequests((prevArr) =>
    prevArr.map((r) =>
      (r._id ?? r.id) === id ? { ...r, approvalStatus: newStatus } : r
    )
  );

  try {
    // Choose the correct endpoint and method used by your backend.
    // NOTE: endpoints are case-sensitive on many servers — ensure they match.
    let url;
    let method = "PUT";
    if (newStatus === "Approved") {
      url = `https://geo-location-based-attendence-tracking.onrender.com/api/approveLeaveRequest/${id}`;
    } else if (newStatus === "Rejected") {
      url = `https://geo-location-based-attendence-tracking.onrender.com/api/RejectLeaveRequest/${id}`;
    } else if (newStatus === "Pending") {
      url = `https://geo-location-based-attendence-tracking.onrender.com/api/updateLeaveStatus/${id}`;
    } else {
      throw new Error("Unsupported status");
    }

    const body = { approvalStatus: newStatus, adminId };

    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        // Add auth header if your backend needs it:
        // "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(body),
    });

    // Helpful logs for debugging:
    console.log("updateStatus response status:", res.status);
    const text = await res.text(); // read raw text first for safety
    let parsed;
    try {
      parsed = text ? JSON.parse(text) : null;
    } catch (parseErr) {
      // server returned non-JSON text
      parsed = text;
    }
    console.log("updateStatus response body:", parsed);

    if (!res.ok) {
      // Backend signalled failure -> rollback optimistic update
      throw new Error(
        `Server error ${res.status}: ${typeof parsed === "string" ? parsed : JSON.stringify(parsed)}`
      );
    }

    // If server returned the updated object, use it to update state (best)
    // Example: parsed = { success: true, updatedLeaveRequest: {...} }
    const updatedObj =
      parsed && (parsed.updatedLeaveRequest || parsed.leaveRequest || parsed.data || parsed);

    if (updatedObj && (updatedObj._id || updatedObj.id)) {
      const updatedId = updatedObj._id ?? updatedObj.id ?? id;
      setLeaveRequests((prevArr) =>
        prevArr.map((r) => ((r._id ?? r.id) === updatedId ? { ...r, ...updatedObj } : r))
      );
    } else {
      // If server returned no body (204), keep optimistic change. Or re-fetch list:
      // Option A: Do nothing (optimistic already set)
      // Option B: re-fetch entire list to be sure backend persisted it:
      // await apicall();
      console.warn("No updated object returned by server — consider re-fetching data to confirm.");
    }
  } catch (err) {
    console.error("Update failed:", err);
    // rollback
    setLeaveRequests((prevArr) =>
      prevArr.map((r) =>
        (r._id ?? r.id) === id ? { ...r, approvalStatus: prevStatus } : r
      )
    );
    alert("Could not update status. Please try again.");
  } finally {
    setUpdatingRowId(null);
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

  // Decide the allowed next statuses depending on current status
  const allowedTransitions = (status) => {
    if (status === "Pending") return ["Approved", "Rejected"];
    if (status === "Rejected") return ["Pending", "Approved"];
    // for Approved: no menu. Add transitions if you want revert ability.
    return [];
  };

  return (
    <div className="p-6" ref={containerRef}>
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
              {/* skeleton */}
              <div className="flex space-x-4 mb-4 pb-3 border-b border-gray-200">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
                <div className="h-4 bg-gray-200 rounded w-12"></div>
                <div className="h-4 bg-gray-200 rounded w-28"></div>
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
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
                currentRecords.map((req, index) => {
                  // use unique id if available, else fallback to index
                  const id = req._id ?? req.id ?? index;
                  const allowed = allowedTransitions(req.approvalStatus);
                  const isMenuOpen = openMenuFor === id;
                  return (
                    <tr key={id} className="hover:bg-gray-50">
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
                      <td className="px-5 py-3 relative">
                        {/* Status badge (clickable if there are allowed transitions) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (allowed.length === 0) return;
                            setOpenMenuFor((prevOpen) => (prevOpen === id ? null : id));
                          }}
                          className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-2 ${
                            req.approvalStatus === "Approved"
                              ? "bg-green-100 text-green-600"
                              : req.approvalStatus === "Pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : "bg-red-100 text-red-500"
                          }`}
                          disabled={updatingRowId === id}
                        >
                          <span>{req.approvalStatus}</span>
                          {allowed.length > 0 && (
                            <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06-.02L10 10.66l3.71-3.47a.75.75 0 111.04 1.08l-4.25 3.98a.75.75 0 01-1.04 0L5.25 8.27a.75.75 0 01-.02-1.06z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>

                        {/* Dropdown menu */}
                        {isMenuOpen && allowed.length > 0 && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50"
                          >
                            <ul className="py-1">
                              {allowed.map((opt) => (
                                <li key={opt}>
                                  <button
                                    onClick={() => updateStatus(id, opt, req)}
                                    className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 disabled:opacity-50"
                                    disabled={updatingRowId === id}
                                  >
                                    {updatingRowId === id && (
                                      <span className="mr-2 animate-pulse">⏳</span>
                                    )}
                                    {opt}
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })
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
