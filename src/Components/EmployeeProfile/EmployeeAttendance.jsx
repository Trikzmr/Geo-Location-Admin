import React, { useEffect, useState } from 'react'

const EmployeeAttendance = ({i, att}) => {
  const [time, setTime]= useState();
  const [breakTime, setBreakTime] =useState(0);
  const getTime=()=>{
    let count = 0;
    for(let i = 0; i<att.status.length; i++){
      if(att.status[i] === "check-in"){
        count++;
      }
    }
    console.log(count);
    setTime(count);
    setBreakTime(att.status.length-count);
  }
  
  useEffect(getTime, [att]);
  return (
    <>
      <tr key={i} className="border-b border-gray-300">
                    <td className="py-2">{att.date}</td>
                    <td>{att.time[0]}</td>
                    <td>{att.time[att.time.length-1]}</td>
                    <td>{breakTime + " Mins"}</td>
                    <td>{time + " Mins"}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          att.status[att.status.length-1] === "check-in"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {att.status[att.status.length-1]}
                      </span>
                    </td>
                  </tr>
    </>
  )
}

export default EmployeeAttendance
