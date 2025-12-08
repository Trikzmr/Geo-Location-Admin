import React, { useState, useEffect, useRef } from 'react';
import { FiEye, FiFilter } from 'react-icons/fi'; 
import { BiSearch } from 'react-icons/bi';
import { MdMoreVert } from 'react-icons/md';

const EmployeeApproval = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [actioningUserName, setActioningUserName] = useState(null);
  const [actioning, setActioning] = useState(false);
  const menuRef = useRef(null);

  // Fetch pending registrations
  useEffect(() => {
    fetchPendingRegistrations();
  }, []);

  const fetchPendingRegistrations = async () => {
    try {
      setLoading(true);
      setError("");
      const api = "https://geo-location-based-attendence-tracking.onrender.com/api/GetPendingRegistration";
      const response = await fetch(api, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch pending registrations");
      }

      const data = await response.json();
      setEmployees(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching employees:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (userName) => {
    try {
      setActioning(true);
      const api = "https://geo-location-based-attendence-tracking.onrender.com/api/approveRegistration";
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({ userName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to approve registration");
      }

      // Remove from list
      setEmployees(employees.filter(emp => emp.userName !== userName));
      setActioningUserName(null);
    } catch (err) {
      console.error("Error approving:", err);
      alert("Failed to approve registration");
    } finally {
      setActioning(false);
    }
  };

  const handleReject = async (userName) => {
    try {
      setActioning(true);
      const api = "https://geo-location-based-attendence-tracking.onrender.com/api/rejectRegistration";
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify({ userName }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to reject registration");
      }

      // Remove from list
      setEmployees(employees.filter(emp => emp.userName !== userName));
      setActioningUserName(null);
    } catch (err) {
      console.error("Error rejecting:", err);
      alert("Failed to reject registration");
    } finally {
      setActioning(false);
    }
  };

  // Filter employees based on search
  const filteredEmployees = employees.filter(emp => 
    emp.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Pending Registrations</h1>
          <p className="text-gray-500 text-sm">Approve or reject new employee requests</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Search + Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <BiSearch className="absolute top-3.5 left-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search by name, email, or username"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7152F3] transition"
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={fetchPendingRegistrations} className="flex-1 md:flex-none bg-[#7152F3] hover:bg-[#5f45cc] text-white px-4 py-2.5 rounded-lg font-medium shadow transition">
            Refresh
          </button>
          <button className="flex-1 md:flex-none border border-gray-300 px-4 py-2.5 rounded-lg font-medium shadow-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition">
            <FiFilter className="text-gray-600" />
            Filter
          </button>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#7152F3]"></div>
            <p className="mt-4 text-gray-600">Loading pending registrations...</p>
          </div>
        </div>
      ) : filteredEmployees.length === 0 ? (
        <div className="flex items-center justify-center py-12 rounded-xl border border-gray-200 bg-white">
          <div className="text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p className="mt-4 text-gray-600 font-medium">No pending registrations</p>
            <p className="text-sm text-gray-500">All new employee requests have been processed</p>
          </div>
        </div>
      ) : (
        /* Table */
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
              <tr>
                <th className="px-4 md:px-5 py-3">Name</th>
                <th className="px-4 md:px-5 py-3">Email</th>
                <th className="px-4 md:px-5 py-3">Username</th>
                <th className="px-4 md:px-5 py-3">Phone</th>
                <th className="px-4 md:px-5 py-3">Applied On</th>
                <th className="px-4 md:px-5 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEmployees.map((emp, index) => (
                <tr key={`${emp._id}-${index}`} className="hover:bg-gray-50 transition">
                  <td className="px-4 md:px-5 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{emp.firstName} {emp.lastName}</p>
                      <p className="text-xs text-gray-500">{emp.qualification?.join(", ") || "N/A"}</p>
                    </div>
                  </td>
                  <td className="px-4 md:px-5 py-3 text-gray-700">{emp.email}</td>
                  <td className="px-4 md:px-5 py-3">
                    <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                      {emp.userName}
                    </span>
                  </td>
                  <td className="px-4 md:px-5 py-3 text-gray-700">{emp.number}</td>
                  <td className="px-4 md:px-5 py-3 text-gray-600">
                    {new Date(emp.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </td>
                  <td className="px-4 md:px-5 py-3 relative">
                    <button
                      onClick={() => setActioningUserName(actioningUserName === emp.userName ? null : emp.userName)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition"
                      disabled={actioning}
                    >
                      <MdMoreVert className="text-gray-600 text-lg" />
                    </button>

                    {/* Floating Action Menu */}
                    {actioningUserName === emp.userName && (
                      <div ref={menuRef} className="absolute right-0 top-10 z-50 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
                        <button
                          onClick={() => handleApprove(emp.userName)}
                          disabled={actioning}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-green-700 hover:bg-green-50 transition flex items-center gap-2 border-b border-gray-200 disabled:opacity-50"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {actioning ? "Processing..." : "Approve"}
                        </button>
                        <button
                          onClick={() => handleReject(emp.userName)}
                          disabled={actioning}
                          className="w-full px-4 py-2.5 text-left text-sm font-medium text-red-700 hover:bg-red-50 transition flex items-center gap-2 disabled:opacity-50"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                          {actioning ? "Processing..." : "Reject"}
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Info */}
      {!loading && filteredEmployees.length > 0 && (
        <div className="mt-6 text-sm text-gray-600 text-center">
          Showing <strong>{filteredEmployees.length}</strong> pending registration{filteredEmployees.length !== 1 ? 's' : ''}
        </div>
      )}
    </div>
  );
};

export default EmployeeApproval;
