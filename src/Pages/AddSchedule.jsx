import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const monthNames = [
  "January","February","March","April","May","June","July","August","September","October","November","December"
];

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function formatDateKey(year, monthIndex, day) {
  const mm = String(monthIndex + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
}

const AddSchedule = () => {
  const navigate = useNavigate();
  const today = new Date();
  // default to next month
  const defaultNext = useMemo(() => {
    const d = new Date(today.getFullYear(), today.getMonth() + 1, 1);
    return { year: d.getFullYear(), monthIndex: d.getMonth(), monthName: monthNames[d.getMonth()] };
  }, [today]);

  const [year, setYear] = useState(defaultNext.year);
  const [monthIndex, setMonthIndex] = useState(defaultNext.monthIndex);
  const [days, setDays] = useState([]); // { date, dayType, title }
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    generateDays(year, monthIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year, monthIndex]);

  function generateDays(y, mIndex) {
    const total = daysInMonth(y, mIndex);
    const arr = [];
    for (let d = 1; d <= total; d++) {
      const dt = new Date(y, mIndex, d);
      const weekday = dt.getDay(); // 0 Sun, 6 Sat
      const isWeekend = weekday === 0 || weekday === 6;
      arr.push({
        date: formatDateKey(y, mIndex, d),
        dayType: isWeekend ? 0 : 1,
        title: isWeekend ? "Weekend" : "Working Day",
      });
    }
    setDays(arr);
  }

  const onDayTypeChange = (index, newType) => {
    setDays((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], dayType: newType, title: newType === 0 ? (copy[index].title === "Working Day" ? "Weekend" : copy[index].title) : (copy[index].title === "Weekend" ? "Working Day" : copy[index].title) };
      return copy;
    });
  };

  const onTitleChange = (index, newTitle) => {
    setDays((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], title: newTitle };
      return copy;
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    const payload = { year, month: monthNames[monthIndex], dayCalander: days };
    try {
      setLoading(true);
      const res = await fetch("https://geo-location-based-attendence-tracking.onrender.com/api/addCalender", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const text = await res.text();
      let parsed;
      try { parsed = text ? JSON.parse(text) : null; } catch(e){ parsed = text }
      if (!res.ok) throw new Error(typeof parsed === "string" ? parsed : JSON.stringify(parsed));
      setMessage({ type: "success", text: "Schedule saved successfully." });
      setTimeout(() => navigate("/dashboard/schedule"), 700);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Save failed: " + (err.message || err) });
    } finally { setLoading(false); }
  };

  return (
    <div className="p-6">
      <div className="w-[1140px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Create Next Month Schedule</h1>
            <p className="text-sm text-gray-500">Generate daily schedule for selected month, edit days and save.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="border border-gray-300 rounded-[10px] p-6 bg-white">
          <div className="flex gap-4 mb-4 items-end">
            <div>
              <label className="text-xs text-gray-500">Year</label>
              <input type="number" value={year} onChange={(e) => setYear(Number(e.target.value) || defaultNext.year)} className="block mt-1 p-2 border rounded w-32" />
            </div>
            <div>
              <label className="text-xs text-gray-500">Month</label>
              <select value={monthIndex} onChange={(e) => setMonthIndex(Number(e.target.value))} className="block mt-1 p-2 border rounded">
                {monthNames.map((m, i) => <option key={m} value={i}>{m}</option>)}
              </select>
            </div>
            <div className="ml-auto text-sm text-gray-500">Days: <span className="font-medium">{days.length}</span></div>
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-[420px] overflow-y-auto border-t pt-4">
            {days.map((d, idx) => (
              <div key={d.date} className="flex items-center gap-3 p-2 rounded hover:bg-gray-50">
                <div className="w-36 text-sm text-gray-700">{d.date} <span className="text-xs text-gray-400">({new Date(d.date).toLocaleString(undefined,{weekday:'short'})})</span></div>
                <div>
                  <select value={d.dayType} onChange={(e) => onDayTypeChange(idx, Number(e.target.value))} className="p-1 border rounded">
                    <option value={1}>Working Day</option>
                    <option value={0}>Off Day / Weekend</option>
                  </select>
                </div>
                <input value={d.title} onChange={(e) => onTitleChange(idx, e.target.value)} className="flex-1 p-1 border rounded" />
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button type="submit" disabled={loading} className="bg-[#7152F3] text-white px-4 py-2 rounded-[10px] hover:bg-[#5b3fe0] disabled:opacity-60">
              {loading ? 'Saving...' : 'Save Schedule'}
            </button>
            <button type="button" onClick={() => { generateDays(year, monthIndex); setMessage(null); }} className="bg-gray-100 px-3 py-2 rounded">Regenerate</button>
            <button type="button" onClick={() => { setYear(defaultNext.year); setMonthIndex(defaultNext.monthIndex); setMessage(null); generateDays(defaultNext.year, defaultNext.monthIndex); }} className="bg-gray-100 px-3 py-2 rounded">Reset to Next Month</button>
          </div>

          {message && (
            <div className={`mt-4 p-3 rounded ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddSchedule;
