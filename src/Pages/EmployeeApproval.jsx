import React, { useEffect, useState } from 'react';
import { FiEye, FiEdit, FiTrash2, FiFilter } from 'react-icons/fi'; 
import { BiSearch } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

const EmployeeApproval = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPending = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('https://geo-location-based-attendence-tracking.onrender.com/api/GetPendingRegistration');
        if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
        const data = await res.json();
        setEmployees(data || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch');
      } finally {
        setLoading(false);
      }
    };

    fetchPending();
  }, []);

  // reset page when itemsPerPage or employees change
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage, employees.length]);

  const totalItems = employees.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginated = employees.slice(startIndex, endIndex);

  const goToPage = (p) => {
    const page = Math.max(1, Math.min(totalPages, p));
    setCurrentPage(page);
  };

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
      {loading && (
        <div className="p-6 bg-white rounded-md shadow mb-4">Loading pending registrations...</div>
      )}
      {error && (
        <div className="p-6 bg-red-50 text-red-700 rounded-md shadow mb-4">Error: {error}</div>
      )}

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
            {paginated.map((emp, index) => (
              <tr key={`${emp._id || index}`} className="hover:bg-gray-50">
                <td className="px-5 py-3 flex items-center gap-3">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent((emp.firstName || '') + ' ' + (emp.lastName || ''))}&background=ddd&color=555&rounded=true`}
                    alt={`${emp.firstName} ${emp.lastName}`}
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="font-medium text-gray-800">{(emp.firstName || '') + ' ' + (emp.lastName || '')}</span>
                </td>
                <td className="px-5 py-3">{emp._id}</td>
                <td className="px-5 py-3">{emp.role || '-'}</td>
                <td className="px-5 py-3">{emp.qualification ? emp.qualification.join(', ') : '-'}</td>
                <td className="px-5 py-3">{emp.skills ? emp.skills.join(', ') : '-'}</td>
                <td className="px-5 py-3">
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold">
                    {emp.status}
                  </span>
                </td>
                <td className="px-5 py-3 flex gap-3 text-gray-500">
                  <FiEye
                    className="cursor-pointer hover:text-purple-600"
                    title="View"
                    onClick={() => navigate(`/dashboard/employeeRequestDetails/${emp._id}`)}
                  />
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
          Showing <strong>{totalItems === 0 ? 0 : startIndex + 1} to {endIndex}</strong> of <strong>{totalItems}</strong> records
        </div>

        <div className="flex items-center gap-3">
          <div className="flex gap-2 items-center">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              {'<'}
            </button>

            {/* page buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`px-3 py-1 border rounded-md ${p === currentPage ? 'bg-purple-600 text-white' : ''}`}
              >
                {p}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
            >
              {'>'}
            </button>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Per page:</label>
            <select
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeApproval;
