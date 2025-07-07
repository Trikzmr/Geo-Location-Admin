// import React from 'react';
// import StatsSection from '../Components/Dashboard/StatsSection';
// import Schedule from "../Components/Schedule";

// const DashboardPage = () => {
//   return (
//     <div className="p-4">
//       <h1 className="text-xl font-semibold mb-4">Dashboard</h1>
//       <StatsSection />
//       <Schedule />
//     </div>
//   );
// };

// export default DashboardPage;

import React from "react";
import StatsSection from "../Components/Dashboard/StatsSection";
import Schedule from "../Components/Schedule";

const DashboardPage = () => {
  return (
    <div className="flex flex-wrap gap-4">

      <div className="flex-1 min-w-[300px]">
        <StatsSection />
      </div>

      <div className="w-full md:w-[320px]">
        <Schedule />
      </div>
      
    </div>
  );
};

export default DashboardPage;
