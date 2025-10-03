// src/Components/Schedule.jsx
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import "./calendar-custom.css"; // custom override styles

const Schedule = () => {
  const [date, setDate] = useState(new Date());

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
        <Calendar
          onChange={setDate}
          value={date}
          nextLabel="›"
          prevLabel="‹"
          navigationLabel={({ date }) =>
            date.toLocaleString("default", { month: "long", year: "numeric" })
          }
          tileClassName={({ date, view }) =>
            view === "month" &&
            date >= new Date(date.getFullYear(), date.getMonth(), 2) &&
            date <= new Date(date.getFullYear(), date.getMonth(), 8)
              ? "highlight-day"
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Schedule;
