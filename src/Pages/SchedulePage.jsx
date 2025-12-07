import React from "react";
import { Link } from "react-router-dom";
import Schedule from "../Components/Dashboard/Schedule";

const SchedulePage = () => {
  return (
    <div className="p-6">
      <div className="w-[1140px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Schedule</h1>
            <p className="text-sm text-gray-500">View monthly calendar and company schedule</p>
          </div>
          <div>
            <Link
              to="add"
              className="bg-[#7152F3] text-white px-4 py-2 rounded-[10px] hover:bg-[#5b3fe0]"
            >
              Add Schedule
            </Link>
          </div>
        </div>

        <Schedule />
      </div>
    </div>
  );
};

export default SchedulePage;
