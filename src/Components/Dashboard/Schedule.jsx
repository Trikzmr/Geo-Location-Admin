// src/Components/Schedule.jsx
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import "./calendar-custom.css"; // custom override styles

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  const [activeStartDate, setActiveStartDate] = useState(new Date());
  const [workDaySet, setWorkDaySet] = useState(new Set());
  const [offDaySet, setOffDaySet] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const formatKey = (d) => {
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const fetchCalendar = async (year, monthName) => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch(
        "https://geo-location-based-attendence-tracking.onrender.com/api/getCalenders",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ year, month: monthName }),
        }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch calendar");
      }
      const data = await res.json();
      const work = new Set();
      const off = new Set();
      if (Array.isArray(data?.dayCalander)) {
        for (const item of data.dayCalander) {
          if (!item?.date) continue;
          const d = new Date(item.date);
          const key = formatKey(d);
          // Assuming dayType: 1 = working day, 0 = off day
          if (item.dayType === 1) {
            work.add(key);
            off.delete(key);
          } else if (item.dayType === 0) {
            off.add(key);
            work.delete(key);
          }
        }
      }
      setWorkDaySet(work);
      setOffDaySet(off);
    } catch (err) {
      console.error(err);
      setWorkDaySet(new Set());
      setOffDaySet(new Set());
      setError("Could not load working calendar");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const y = activeStartDate.getFullYear();
    const monthName = activeStartDate.toLocaleString("default", { month: "long" });
    fetchCalendar(y, monthName);
  }, [activeStartDate]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">My Schedule</h2>
        <div className="p-2 bg-purple-100 rounded-full">
          <CalendarDaysIcon className="h-6 w-6 text-purple-600" />
        </div>
      </div>

      {/* Calendar */}
      <div className="custom-calendar">
        {loading ? (
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4"></div>
            <div className="grid grid-cols-7 gap-2 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="h-8 bg-gray-200 rounded text-center flex items-center justify-center text-sm font-medium"></div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }, (_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <Calendar
            onChange={setDate}
            value={date}
            nextLabel="›"
            prevLabel="‹"
            navigationLabel={({ date }) =>
              date.toLocaleString("default", { month: "long", year: "numeric" })
            }
            onActiveStartDateChange={({ activeStartDate }) => {
              if (activeStartDate) setActiveStartDate(activeStartDate);
            }}
            tileClassName={({ date, view }) =>
              view === "month"
                ? (() => {
                    const key = formatKey(date);
                    if (offDaySet.has(key)) return "off-day";
                    if (workDaySet.has(key)) return "work-day";
                    return "";
                  })()
                : ""
            }
          />
        )}
      </div>
    </div>
  );
};

export default Schedule;
