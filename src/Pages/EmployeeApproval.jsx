import React from 'react';
import { FiEye, FiEdit, FiTrash2, FiFilter } from 'react-icons/fi'; 
import { BiSearch } from 'react-icons/bi';

const EmployeeApproval = () => {
  const employees = [
    {
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Darlene Robertson",
      id: "345321231",
      department: "Design",
      designation: "UI/UX Designer",
      type: "Office",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      name: "Floyd Miles",
      id: "987890345",
      department: "Development",
      designation: "PHP Developer",
      type: "Office",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Cody Fisher",
      id: "453367122",
      department: "Sales",
      designation: "Sales Manager",
      type: "Office",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Dianne Russell",
      id: "345321231",
      department: "Sales",
      designation: "BDM",
      type: "Remote",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/5.jpg",
      name: "Savannah Nguyen",
      id: "453677881",
      department: "Design",
      designation: "Design Lead",
      type: "Office",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      name: "Jacob Jones",
      id: "223456789",
      department: "Development",
      designation: "React Developer",
      type: "Remote",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      name: "Kathryn Murphy",
      id: "998812300",
      department: "HR",
      designation: "HR Manager",
      type: "Office",
      status: "Permanent",
    },
  ];

  return (
    <div className="p-6 ">
      {/* Header */}
      <div className=" mb-6 ">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Employees Requests</h1>
          <p className="text-gray-500 text-sm">All employee information</p>
        </div>
      </div>

      {/* Search */}
      {/* Search + Actions in one row */}
<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
  <div className="relative w-full md:w-1/2">
    <BiSearch className="absolute top-3.5 left-3 text-gray-400 text-lg" />
    <input
      type="text"
      placeholder="Search"
      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
    />
  </div>

  <div className="flex gap-3">
  <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium shadow">
    + Add New Employee
  </button>
  <button className="border border-gray-300 px-4 py-2 rounded-md font-medium shadow-sm flex items-center gap-2">
    <FiFilter className="text-gray-600" />
    Filter
  </button>
</div>

</div>


      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium">
            <tr>
              <th className="px-5 py-3">Employee Name</th>
              <th className="px-5 py-3">Employee ID</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Designation</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {employees.map((emp, index) => (
              <tr key={`${emp.id}-${index}`} className="hover:bg-gray-50">
                <td className="px-5 py-3 flex items-center gap-3">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="font-medium text-gray-800">{emp.name}</span>
                </td>
                <td className="px-5 py-3">{emp.id}</td>
                <td className="px-5 py-3">{emp.department}</td>
                <td className="px-5 py-3">{emp.designation}</td>
                <td className="px-5 py-3">{emp.type}</td>
                <td className="px-5 py-3">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-3 flex gap-3 text-gray-500">
                  <FiEye className="cursor-pointer hover:text-purple-600" title="View" />
                  <FiEdit className="cursor-pointer hover:text-blue-500" title="Edit" />
                  <FiTrash2 className="cursor-pointer hover:text-red-500" title="Delete" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 text-sm text-gray-500">
        <div>
          Showing <strong>1 to {employees.length}</strong> of <strong>60</strong> records
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

export default EmployeeApproval;
