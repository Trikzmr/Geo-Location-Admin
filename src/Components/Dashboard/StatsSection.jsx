
import React from "react";
import StatsCard from "./StatsCard";

const statsData = [
  { title: "Total Employees", value: 560 },
  { title: "Active Employees", value: 490 },
  { title: "Departments", value: 12 },
  { title: "Leaves Today", value: 8 },
];

const StatsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
        />
      ))}
    </div>
  );
};

export default StatsSection;
