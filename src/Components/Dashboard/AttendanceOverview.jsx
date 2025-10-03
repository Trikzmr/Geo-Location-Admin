// src/Components/AttendanceOverview.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const data = [
  { name: "Mon", present: 60, late: 20, absent: 20 },
  { name: "Tue", present: 60, late: 20, absent: 20 },
  { name: "Wed", present: 60, late: 15, absent: 25 },
  { name: "Thu", present: 60, late: 25, absent: 15 },
  { name: "Fri", present: 60, late: 20, absent: 20 },
  { name: "Sat", present: 55, late: 25, absent: 20 },
  { name: "Sun", present: 50, late: 30, absent: 20 },
];

const AttendanceOverview = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Attendance Overview
        </h2>
        <button className="flex items-center border px-3 py-1 rounded-lg text-sm text-gray-600 hover:bg-gray-50">
          Today <ChevronDownIcon className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Chart */}
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            stackOffset="expand"
            barSize={10}
            barGap={3} 
            // ✅ small gap between stacked bars
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tickFormatter={(value) => `${value * 100}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip
              formatter={(value, name) => [`${(value * 100).toFixed(0)}%`, name]}
              contentStyle={{ borderRadius: "8px", fontSize: "12px" }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", marginBottom: "10px" }}
            />

            {/* Bars with gap simulation */}
            <Bar
              dataKey="present"
              stackId="a"
              fill="#6366F1"
              radius={[6, 6, 0, 0]}
            />
            <Bar
              dataKey="late"
              stackId="a"
              fill="#F59E0B"
              radius={[0, 0, 0, 0]}
            />
            <Bar
              dataKey="absent"
              stackId="a"
              fill="#EF4444"
              radius={[0, 0, 6, 6]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceOverview;
