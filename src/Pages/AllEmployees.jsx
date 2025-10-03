import React, { useEffect, useState } from "react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const AllEmployees = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    apicall();
  }, []);

  async function apicall() {
    try {
      let api =
        "https://geo-location-based-attendence-tracking.onrender.com/api/getEmployes";
      let container = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      let response = await fetch(api, container);
      let data = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (err) {
      console.error("API error:", err);
      setLoading(false);
    }
  }

  const goToEmpProfile =(id)=>{
    navigate(`/dashboard/employeeDetails/${id}`);
  }

  // --- Filtering ---
  const filteredEmployees = employees.filter(
    (emp) =>
      (emp.firstName + " " + emp.lastName)
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Pagination ---
  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEmployees = filteredEmployees.slice(
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
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // reset to page 1 on search
          }}
          className="w-[330px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-[100%] border border-gray-200 rounded-[10px]">
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
              {paginatedEmployees.length > 0 ? (
                paginatedEmployees.map((emp, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 px-4 flex items-center gap-2">
                      <img
                        src={`https://ui-avatars.com/api/?name=${
                          emp.firstName || emp.userName
                        }`}
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
                      <div className="eye" onClick={() => goToEmpProfile(emp._id)}>
                        <FiEye className="cursor-pointer" />
                      </div>
                      
                      <FiEdit className="cursor-pointer" />
                      <FiTrash2 className="cursor-pointer" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="py-4 text-center text-gray-500">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {!loading && (
        <div className="flex justify-between items-center mt-4 w-[1040px]">
          <div className="text-sm text-gray-500">
            Showing {paginatedEmployees.length} of {filteredEmployees.length}{" "}
            records
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
      )}
    </div>
  );
};

export default AllEmployees;
