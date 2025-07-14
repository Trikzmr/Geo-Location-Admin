import React, { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

const AllEmployees = () => {

  const [loading, setLoading] = useState(true);
  const [Employes, setEmployes] = useState([]);

  function onload() {
    apicall();
  }

  async function apicall() {
    let api = "http://localhost:3005/api/getEmployes";
    let container = {
      method : "GET",
      headers : {
        "Content-Type" : "application/json"
      }
    }
    let response = await fetch(api, container);
    let data = await response.json();
    setEmployes(data);
    setLoading(false);
    console.log(data);

  }

  useEffect(onload, []);
  return (
    <div className="p-8">
      {/* Header */}
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

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search"
          className="w-[330px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-[1040px] border border-gray-200 rounded-[10px]">
        {loading ? (
          <p className="p-4">Loading employees...</p>
        ) : (
          <table className="min-w-full text-left">
            <thead className="border-b">
              <tr>
                <th className="py-3 px-4 text-gray-500">Employee Name</th>
                <th className="py-3 px-4 text-gray-500">Email</th>
                <th className="py-3 px-4 text-gray-500">Role</th>
                <th className="py-3 px-4 text-gray-500">Status</th>
                <th className="py-3 px-4 text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {Employes.map((emp, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 flex items-center gap-2">
                    <img
                      src={`https://ui-avatars.com/api/?name=${emp.firstName || emp.userName}`}
                      alt={emp.userName}
                      className="w-8 h-8 rounded-full"
                    />
                    {emp.firstName} {emp.lastName}
                  </td>
                  <td className="py-3 px-4">{emp.email}</td>
                  <td className="py-3 px-4">{emp.role}</td>
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
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 w-[1040px]">
        <div className="text-sm text-gray-500">
          Showing 1 to {Employes.length} out of {Employes.length} records
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
