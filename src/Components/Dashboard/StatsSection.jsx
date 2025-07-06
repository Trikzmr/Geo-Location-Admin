import React from "react";
import StatsCard from "./StatsCard";

const statsData = [
  { title: "Total Employee", value: "560" },
  { title: "Total Applicant", value: "1050" },
  { title: "Today Attendance", value: "470" },
  { title: "Total Projects", value: "250" },
];

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {statsData.map((item, index) => (
        <StatsCard
          key={index}
          title={item.title}
          value={item.value}
        />
      ))}
    </div>
  );
};

export default StatsSection;
