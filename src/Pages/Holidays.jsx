import React, { useEffect, useState } from "react";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";

const Holidays = () => {
  const [holidays, setHolidays] = useState({});
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");

  // Track expanded months
  const [openMonths, setOpenMonths] = useState({});

  useEffect(() => {
    apicall();
  }, []);

  async function apicall() {
    try {
      const api =
        "https://geo-location-based-attendence-tracking.onrender.com/api/getWeekend";

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

      // Group by months
      const grouped = {};
      weekendData.forEach((monthData) => {
        monthData.dayCalander.forEach((day) => {
          const dateObj = new Date(day.date);
          const monthName = dateObj.toLocaleDateString("en-US", {
            month: "long",
          });

          if (!grouped[monthName]) {
            grouped[monthName] = [];
          }

          grouped[monthName].push({
            date: dateObj.toLocaleDateString(),
            day: dateObj.toLocaleDateString("en-US", {
              weekday: "long",
            }),
            title: day.title || "Unnamed Holiday",
          });
        });
      });

      setHolidays(grouped);

      // Initialize all months as collapsed
      const collapsed = {};
      Object.keys(grouped).forEach((month) => {
        collapsed[month] = false;
      });
      setOpenMonths(collapsed);

      setLoading(false);
    } catch (error) {
      console.error("API call failed:", error);
      setLoading(false);
    }
  }

  // 🔍 Filter holidays
  const filterHolidays = (holidays) => {
    if (!searchQuery) return holidays;

    const filtered = {};
    Object.keys(holidays).forEach((month) => {
      const matched = holidays[month].filter(
        (holiday) =>
          holiday.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          holiday.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
          holiday.date.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (matched.length > 0) {
        filtered[month] = matched;
      }
    });

    return filtered;
  };

  const filteredHolidays = filterHolidays(holidays);

  const toggleMonth = (month) => {
    setOpenMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  return (
    <div className="w-[100%] gap-5 opacity-100 bg-white shadow rounded-lg p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl font-semibold">Holidays</h1>
          <p className="text-gray-500">All Holiday Lists</p>
        </div>
        <button className="flex items-center bg-[#7152F3] text-white px-5 py-3 rounded-[10px] gap-2">
          + Add New Holiday
        </button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search holiday..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-[330px] h-[50px] border border-gray-300 rounded-[10px] px-4 py-3"
        />
      </div>

      {/* Table grouped by collapsible months */}
      <div className="overflow-y-auto flex-1">
        {loading ? (
          <div className="p-4">
            <div className="animate-pulse space-y-4">
              {/* Month skeleton */}
              {[1, 2, 3].map((monthIndex) => (
                <div key={monthIndex} className="rounded-md">
                  {/* Month header skeleton */}
                  <div className="flex justify-between items-center w-full px-4 py-3 bg-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                    <div className="h-4 bg-gray-200 rounded w-4"></div>
                  </div>
                  {/* Table skeleton */}
                  <div className="border-t">
                    <div className="flex space-x-4 py-3 px-4 border-b border-gray-200">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                      <div className="h-4 bg-gray-200 rounded w-32"></div>
                    </div>
                    {[1, 2].map((rowIndex) => (
                      <div key={rowIndex} className="flex space-x-4 py-3 px-4 border-b border-gray-100">
                        <div className="h-4 bg-gray-200 rounded w-20"></div>
                        <div className="h-4 bg-gray-200 rounded w-16"></div>
                        <div className="h-4 bg-gray-200 rounded w-32"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : Object.keys(filteredHolidays).length > 0 ? (
          Object.keys(filteredHolidays).map((month) => (
            <div key={month} className="mb-4 rounded-md">
              {/* Month Header */}
              <button
                className="flex justify-between items-center w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 font-semibold"
                onClick={() => toggleMonth(month)}
              >
                <span>{month}</span>
                {openMonths[month] ? <FiChevronDown /> : <FiChevronRight />}
              </button>

              {/* Collapsible Table */}
              {openMonths[month] && (
                <table className="min-w-full text-left border-t">
                  <thead>
                    <tr className="h-[44px] border-b border-gray-300">
                      <th className="py-3 px-4 text-gray-500">Date</th>
                      <th className="py-3 px-4 text-gray-500">Day</th>
                      <th className="py-3 px-4 text-gray-500">Holiday Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredHolidays[month].map((holiday, index) => (
                      <tr key={index} className="border-b border-gray-200">
                        <td className="py-3 px-4">{holiday.date}</td>
                        <td className="py-3 px-4">{holiday.day}</td>
                        <td className="py-3 px-4">{holiday.title}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          ))
        ) : (
          <p className="text-center py-4 text-gray-500">No holidays found.</p>
        )}
      </div>
    </div>
  );
};

export default Holidays;
