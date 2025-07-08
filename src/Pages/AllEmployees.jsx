import React from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const AllEmployees = () => {
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
      id: "009918765",
      department: "Development",
      designation: "Python Developer",
      type: "Remote",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Marvin McKinney",
      id: "238870122",
      department: "Development",
      designation: "Sr. UI Developer",
      type: "Remote",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      name: "Brooklyn Simmons",
      id: "124335111",
      department: "PM",
      designation: "Project Manager",
      type: "Office",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      name: "Kristin Watson",
      id: "435540099",
      department: "HR",
      designation: "HR Executive",
      type: "Office",
      status: "Permanent",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      name: "Kathryn Murphy",
      id: "009812890",
      department: "Development",
      designation: "React JS Developer",
      type: "Office",
      status: "Permanent",
    },
  ];

  return (
    <div className="p-8">
      
      <div className="flex justify-between items-center mb-6 w-[1140px]">
        <div>
          <h1 className="text-2xl font-semibold">All Employees</h1>
          <p className="text-gray-500">All Employee Information</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center bg-[#7152F3] text-white px-5 py-3 rounded-[10px] gap-2">
            + Add New Employee
          </button>
          <button className="flex items-center border border-gray-300 px-5 py-3 rounded-[10px] gap-2">
            Filter
          </button>
        </div>
      </div>

      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-[330px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>


      <div className="overflow-x-auto w-[1040px] border border-gray-200 rounded-[10px]">
        <table className="min-w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="py-3 px-4 text-gray-500">Employee Name</th>
              <th className="py-3 px-4 text-gray-500">Employee ID</th>
              <th className="py-3 px-4 text-gray-500">Department</th>
              <th className="py-3 px-4 text-gray-500">Designation</th>
              <th className="py-3 px-4 text-gray-500">Type</th>
              <th className="py-3 px-4 text-gray-500">Status</th>
              <th className="py-3 px-4 text-gray-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-4 flex items-center gap-2">
                  <img
                    src={emp.avatar}
                    alt={emp.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {emp.name}
                </td>
                <td className="py-3 px-4">{emp.id}</td>
                <td className="py-3 px-4">{emp.department}</td>
                <td className="py-3 px-4">{emp.designation}</td>
                <td className="py-3 px-4">{emp.type}</td>
                <td className="py-3 px-4">
                  <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded text-sm">
                    {emp.status}
                  </span>
                </td>
                <td className="py-3 px-4 flex gap-2 text-gray-500">
                  <FiEye className="cursor-pointer" />
                  <FiEdit className="cursor-pointer" />
                  <FiTrash2 className="cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="flex justify-between items-center mt-4 w-[1040px]">
        <div className="text-sm text-gray-500">
          Showing 1 to 10 out of 60 records
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded">{"<"}</button>
          <button className="px-3 py-1 border rounded bg-[#7152F3] text-white">
            1
          </button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <button className="px-3 py-1 border rounded">{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default AllEmployees;
