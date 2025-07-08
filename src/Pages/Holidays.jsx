import React from "react";

const Holidays = () => {
  const holidays = [
    { date: "January 01, 2023", day: "Tuesday", name: "New Year" },
    { date: "January 07, 2023", day: "Saturday", name: "International Programmers’ Day" },
    { date: "February 04, 2023", day: "Saturday", name: "World Cancer Day" },
    { date: "April 01, 2023", day: "Saturday", name: "April Fool Day" },
    { date: "May 07, 2023", day: "Monday", name: "International Programmers’ Day" },
    { date: "May 22, 2023", day: "Tuesday", name: "International Day for Biological Diversity" },
    { date: "June 05, 2023", day: "Monday", name: "International Day for Biological Diversity" },
    { date: "August 07, 2023", day: "Monday", name: "International Friendship Day" },
    { date: "September 15, 2023", day: "Friday", name: "International Day of Democracy" },
    { date: "November 14, 2023", day: "Tuesday", name: "World Diabetes Day" },
    { date: "December 25, 2023", day: "Monday", name: "Merry Christmas" },
  ];

  return (
    <div
      className="
        w-[1040px]
        h-[680px]
        
        gap-5
        opacity-100
        bg-white
        shadow
        rounded-lg
        p-6
        flex flex-col
      "
    >
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Holidays</h1>
          <p className="text-gray-500">All Holiday Lists</p>
        </div>
        <button className="flex items-center bg-[#7152F3] text-white px-5 py-3 rounded-[10px] gap-2">
          + Add New Holiday
        </button>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search"
          className="w-[330px] h-[50px] border border-gray-300 rounded-[10px] px-4 py-3"
        />
      </div>

      <div className="overflow-y-auto flex-1">
        <table className="min-w-full text-left">
          <thead>
            <tr
              className="
                h-[44px]
                border-b
                border-gray-300
              "
            >
              <th className="py-3 px-4 text-gray-500">Date</th>
              <th className="py-3 px-4 text-gray-500">Day</th>
              <th className="py-3 px-4 text-gray-500">Holiday Name</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, index) => (
              <tr key={index} className="border-b border-gray-200">
                <td className="py-3 px-4">{holiday.date}</td>
                <td className="py-3 px-4">{holiday.day}</td>
                <td className="py-3 px-4">{holiday.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
