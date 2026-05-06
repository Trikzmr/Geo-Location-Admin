import React from 'react'

const EmployeeLeaves = ({leave}) => {
  return (
    <>
        <tr className="border-b border-gray-300">
                    <td className="py-2">{leave.date}</td>
                    <td>{leave.duration}</td>
                    <td>{leave.days}</td>
                    <td>{leave.manager}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          leave.status === "Approved"
                            ? "bg-green-100 text-green-600"
                            : leave.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {leave.status}
                      </span>
                    </td>
                  </tr>
    </>
  )
}

export default EmployeeLeaves
