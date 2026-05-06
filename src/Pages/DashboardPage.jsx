import React from "react";
import StatsSection from "../Components/Dashboard/StatsSection";
import Schedule from "../Components/Dashboard/Schedule";
import AttendanceOverview from "../Components/Dashboard/AttendanceOverview";

const DashboardPage = () => {
  return (
    <div className="p-6 flex gap-6">
      {/* Stats Section (2x2 cards layout inside the component) */}
      <div className="w-[70%]">
        <StatsSection />
        <AttendanceOverview />
      </div>

      {/* Schedule on the right side */}
      <div className="w-[30%]">
        <Schedule />
      </div>
    </div>
  );
};

export default DashboardPage;
