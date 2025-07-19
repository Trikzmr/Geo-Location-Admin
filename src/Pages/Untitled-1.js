import React from "react";

const Attendance = () => {
  const attendanceData = [
    {
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      name: "Leasie Watson",
      designation: "Team Lead - Design",
      type: "Office",
      checkIn: "09:27 AM",
      status: "On Time",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/2.jpg",
      name: "Darlene Robertson",
      designation: "Web Designer",
      type: "Office",
      checkIn: "10:15 AM",
      status: "Late",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      name: "Jacob Jones",
      designation: "Medical Assistant",
      type: "Remote",
      checkIn: "10:24 AM",
      status: "Late",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      name: "Kathryn Murphy",
      designation: "Marketing Coordinator",
      type: "Office",
      checkIn: "09:10 AM",
      status: "On Time",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/5.jpg",
      name: "Leslie Alexander",
      designation: "Data Analyst",
      type: "Office",
      checkIn: "09:15 AM",
      status: "On Time",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      name: "Ronald Richards",
      designation: "Python Developer",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/7.jpg",
      name: "Guy Hawkins",
      designation: "UI/UX Design",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/8.jpg",
      name: "Albert Flores",
      designation: "React JS",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
    },
    {
      avatar: "https://randomuser.me/api/portraits/women/9.jpg",
      name: "Savannah Nguyen",
      designation: "IOS Developer",
      type: "Remote",
      checkIn: "10:50 AM",
      status: "Late",
    },
    {
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      name: "Jerome Bell",
      designation: "Sales Manager",
      type: "Remote",
      checkIn: "09:29 AM",
      status: "On Time",
    },
  ];

  return (
    <div className="p-8">


      <div className="flex justify-between items-center mb-6 w-[100%] overflow-hidden">
        <div>
          <h1 className="text-2xl font-semibold">Attendance</h1>
          <p className="text-gray-500">All Employee Attendance</p>
        </div>
        <input
          type="text"
          placeholder="Search"
          className="w-[250px] h-[50px] border border-gray-300 rounded-[10px] px-4"
        />
      </div>

      
      <div className="overflow-x-auto w-[1040px] h-[692px] border border-gray-200 rounded-[10px]">
        <table className="min-w-full text-left">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="py-3 px-4 text-gray-500">Employee Name</th>
              <th className="py-3 px-4 text-gray-500">Designation</th>
              <th className="py-3 px-4 text-gray-500">Type</th>
              <th className="py-3 px-4 text-gray-500">Check In Time</th>
              <th className="py-3 px-4 text-gray-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((item, index) => (
              <tr
                key={index}
                className="border-b"
                style={{
                  borderBottom: "1px solid rgba(162, 161, 168, 0.1)", 
                }}
              >
                <td className="px-4 py-3 flex items-center gap-2 h-[44px] ">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-8 h-8 rounded-full"
                  />
                  {item.name}
                </td>
                <td className="px-4 py-3 h-[44px]">{item.designation}</td>
                <td className="px-4 py-3 h-[44px]">{item.type}</td>
                <td className="px-4 py-3 h-[44px]">{item.checkIn}</td>
                <td className="px-4 py-3 h-[44px]">
                  {item.status === "On Time" ? (
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-sm">
                      On Time
                    </span>
                  ) : (
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm">
                      Late
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <div className="flex justify-between items-center mt-4 w-[1040px]">
        <div className="text-sm text-gray-500">Showing 1 to 10 out of 60 records</div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 border rounded">{"<"}</button>
          <button className="px-3 py-1 border rounded bg-[#7152F3] text-white">1</button>
          <button className="px-3 py-1 border rounded">2</button>
          <button className="px-3 py-1 border rounded">3</button>
          <button className="px-3 py-1 border rounded">4</button>
          <button className="px-3 py-1 border rounded">{">"}</button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
