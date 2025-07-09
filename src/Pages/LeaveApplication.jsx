import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { FiFilter } from 'react-icons/fi';

const LeaveApplication = () => {
  const leaveRequests = [
    {
      date: 'July 01, 2025',
      duration: 'July 05 - July 08',
      days: '3 Days',
      manager: 'Mark Willans',
      status: 'Pending',
    },
    {
      date: 'Apr 05, 2025',
      duration: 'Apr 06 - Apr 10',
      days: '4 Days',
      manager: 'Mark Willans',
      status: 'Approved',
    },
    {
      date: 'Mar 12, 2025',
      duration: 'Mar 14 - Mar 16',
      days: '2 Days',
      manager: 'Mark Willans',
      status: 'Approved',
    },
    {
      date: 'Feb 01, 2025',
      duration: 'Feb 02 - Feb 10',
      days: '8 Days',
      manager: 'Mark Willans',
      status: 'Approved',
    },
    {
      date: 'Jan 01, 2025',
      duration: 'Jan 16 - Jan 19',
      days: '3 Days',
      manager: 'Mark Willans',
      status: 'Rejected',
    },
    {
      date: 'Feb 01, 2025',
      duration: 'Feb 02 - Feb 10',
      days: '8 Days',
      manager: 'Mark Willans',
      status: 'Approved',
    },
    {
      date: 'Jan 01, 2025',
      duration: 'Jan 16 - Jan 19',
      days: '3 Days',
      manager: 'Mark Willans',
      status: 'Rejected',
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState('All');
  const [showFilter, setShowFilter] = useState(false);

  const filteredRequests =
    selectedStatus === 'All'
      ? leaveRequests
      : leaveRequests.filter((req) => req.status === selectedStatus);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Leave Application</h1>
        <p className="text-gray-500 text-sm">All employee leave requests</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div className="relative w-full md:w-1/2">
          <BiSearch className="absolute top-3.5 left-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setShowFilter(!showFilter)}
            className="border border-gray-300 px-4 py-2 rounded-md font-medium shadow-sm flex items-center gap-2"
          >
            <FiFilter className="text-gray-600" />
            Filter
          </button>

          {/* Dropdown */}
          {showFilter && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md z-10">
              {['All', 'Approved', 'Pending', 'Rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setSelectedStatus(status);
                    setShowFilter(false);
                  }}
                  className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                    selectedStatus === status ? 'bg-gray-100 font-semibold' : ''
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Duration</th>
              <th className="px-5 py-3">Days</th>
              <th className="px-5 py-3">Reporting Manager</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredRequests.length > 0 ? (
              filteredRequests.map((req, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-5 py-3">{req.date}</td>
                  <td className="px-5 py-3">{req.duration}</td>
                  <td className="px-5 py-3">{req.days}</td>
                  <td className="px-5 py-3">{req.manager}</td>
                  <td className="px-5 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        req.status === 'Approved'
                          ? 'bg-green-100 text-green-600'
                          : req.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-500'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No leave requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-500">
        <div>
          Showing <strong>1 to {filteredRequests.length}</strong> of <strong>{leaveRequests.length}</strong> records
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">{'<'}</button>
          <button className="px-3 py-1 border rounded-md bg-purple-600 text-white">1</button>
          <button className="px-3 py-1 border rounded-md">2</button>
          <button className="px-3 py-1 border rounded-md">3</button>
          <button className="px-3 py-1 border rounded-md">4</button>
          <button className="px-3 py-1 border rounded-md hover:bg-gray-100">{'>'}</button>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplication;
