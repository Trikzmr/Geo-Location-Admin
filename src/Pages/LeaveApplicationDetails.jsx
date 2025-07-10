import React from 'react';

const LeaveApplicationDetails = () => {

  const leave = {
    title: "Sick Leave",
    startDate: "July 15, 2025",
    endDate: "July 17, 2025",
    username: "Brooklyn Simmons",
    cause: "Fever and weakness",
    message: "I have been feeling unwell since last night. Kindly approve my sick leave for 3 days.",
    applicationDate: "July 14, 2025",
  };

  return (
    <div className="p-8 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
      {/* Page Header */}
      
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Leave Application Details</h1>

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 mb-6">
        <div>
          <p className="text-gray-500">Leave Title</p>
          <p className="font-medium">{leave.title}</p>
        </div>
        <div>
          <p className="text-gray-500">Username</p>
          <p className="font-medium">{leave.username}</p>
        </div>
        <div>
          <p className="text-gray-500">Start Date</p>
          <p className="font-medium">{leave.startDate}</p>
        </div>
        <div>
          <p className="text-gray-500">End Date</p>
          <p className="font-medium">{leave.endDate}</p>
        </div>
        <div>
          <p className="text-gray-500">Cause</p>
          <p className="font-medium">{leave.cause}</p>
        </div>
        <div>
          <p className="text-gray-500">Application Date</p>
          <p className="font-medium">{leave.applicationDate}</p>
        </div>
        <div className="col-span-2">
          <p className="text-gray-500">Message</p>
          <p className="font-medium">{leave.message}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">Accept</button>
        <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded">Reject</button>
      </div>
    </div>
  );
};

export default LeaveApplicationDetails;
