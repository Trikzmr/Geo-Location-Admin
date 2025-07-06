import React from "react";
import { Users } from "lucide-react";

const StatsCard = ({ title, value }) => {
  return (
    <div className="flex flex-col justify-between border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded bg-purple-100 text-purple-500 flex items-center justify-center text-lg">
            <Users size={16} />
          </div>
          <h3 className="font-medium text-gray-700">{title}</h3>
        </div>
        
      </div>

      <div className="text-2xl font-bold text-gray-800 mt-4">{value}</div>

    </div>
  );
};

export default StatsCard;
