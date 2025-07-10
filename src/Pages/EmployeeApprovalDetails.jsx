import React from "react";
import { useParams } from "react-router-dom";

const EmployeeApprovalDetails = () => {
  const { id } = useParams();

  // Sample data for demo - in real app, you'd fetch by ID
  const employee = {
    firstName: "Brooklyn",
    lastName: "Simmons",
    email: "brooklyn.s@example.com",
    phone: "(702) 555-0122",
    department: "Design",
    designation: "UI/UX Designer",
    employeeType: "Remote",
    joiningDate: "July 15, 2025",
    address: "2464 Royal Ln. Mesa, New Jersey",
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Page Header */}
      <h1 className="text-2xl font-semibold mb-6">Employee Request Details</h1>

      <div className="bg-white border rounded-lg p-6 shadow flex flex-col md:flex-row justify-between">
        {/* Employee Details */}
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-500">First Name</p>
            <p className="font-medium">{employee.firstName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Last Name</p>
            <p className="font-medium">{employee.lastName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{employee.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium">{employee.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Department</p>
            <p className="font-medium">{employee.department}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Designation</p>
            <p className="font-medium">{employee.designation}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Employee Type</p>
            <p className="font-medium">{employee.employeeType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Joining Date</p>
            <p className="font-medium">{employee.joiningDate}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium">{employee.address}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 md:mt-0 md:ml-8 flex flex-col space-y-3">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition">
            Accept
          </button>
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeApprovalDetails;
