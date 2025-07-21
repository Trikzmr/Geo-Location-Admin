import React, { useEffect, useState } from "react";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    apicall();
  }, []);

  async function apicall() {
    try {
      const api = "http://localhost:3005/api/getWeekend";

      const currentYear = new Date().getFullYear();

      const container = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ year: currentYear }),
      };

      const response = await fetch(api, container);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const weekendData = await response.json();

      const holidays = weekendData.flatMap(monthData => {
        return monthData.dayCalander.map(day => ({
          date: new Date(day.date).toLocaleDateString(),
          day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' }),
          title: day.title || "Unnamed Holiday"
        }));
      });

      setHolidays(holidays);
    } catch (error) {
      console.error("API call failed:", error);
    }
  }

  return (
    <div
      className="w-[1040px] h-[680px] gap-5 opacity-100 bg-white shadow rounded-lg p-6 flex flex-col"
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
            <tr className="h-[44px] border-b border-gray-300">
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
                <td className="py-3 px-4">{holiday.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Holidays;
