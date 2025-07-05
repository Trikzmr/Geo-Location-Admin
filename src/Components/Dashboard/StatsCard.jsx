import React from "react";


const StatsCard = ({ icon, title, value }) => {
  const Icon = icon ;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Icon className="h-5 w-5 text-purple-500" />
          </div>
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
      </div>
      <div className="mt-4 text-2xl font-bold">{value}</div>
    </div>
  );
};

export default StatsCard;
