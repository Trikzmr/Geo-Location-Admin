// src/Components/Schedule.jsx
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarDaysIcon } from '@heroicons/react/24/outline';

const Schedule = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">My Schedule</h2>
        <div className="p-2 bg-purple-50 rounded-full">
          <CalendarDaysIcon className="h-6 w-6 text-purple-500" />
        </div>
      </div>

      {/* React Calendar */}
      <div className="react-calendar border border-gray-200 rounded-lg">
        <Calendar
          onChange={setDate}
          value={date}
          nextLabel="›"
          prevLabel="‹"
          navigationLabel={({ date }) =>
            date.toLocaleString('default', { month: 'long', year: 'numeric' })
          }
          tileClassName={({ date, view }) =>
            view === 'month' && date >= new Date(date.getFullYear(), date.getMonth(), 6) && date <= new Date(date.getFullYear(), date.getMonth(), 8)
              ? 'bg-purple-100 text-purple-700 rounded-full'
              : null
          }
        />
      </div>
    </div>
  );
};

export default Schedule;
