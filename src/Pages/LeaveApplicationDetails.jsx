import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LeaveApplicationDetails = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function fetchDetails() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://geo-location-based-attendence-tracking.onrender.com/api/getLeaveRequestByid",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        }
      );

      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || `Server returned ${res.status}`);
      }

      const data = await res.json();
      setLeave(data);
    } catch (err) {
      console.error("Failed to fetch leave details:", err);
      setError(err.message || "Failed to load details");
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (dateStr) => {
    try {
      return new Date(dateStr).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const daysCount = (start, end) => {
    try {
      const s = new Date(start);
      const e = new Date(end);
      const msPerDay = 1000 * 60 * 60 * 24;
      return Math.max(1, Math.round((e - s) / msPerDay) + 1);
    } catch (e) {
      return "-";
    }
  };

  async function handleAction(newStatus) {
    if (!leave) return;
    if (newStatus === "Rejected") {
      const ok = window.confirm("Are you sure you want to reject this leave request?");
      if (!ok) return;
    }

    setActionLoading(true);
    try {
      const adminId = localStorage.getItem("adminId") || leave.adminId || "admin-placeholder";
      let url;
      if (newStatus === "Approved") {
        url = `https://geo-location-based-attendence-tracking.onrender.com/api/approveLeaveRequest/${id}`;
      } else if (newStatus === "Rejected") {
        url = `https://geo-location-based-attendence-tracking.onrender.com/api/RejectLeaveRequest/${id}`;
      } else {
        url = `https://geo-location-based-attendence-tracking.onrender.com/api/updateLeaveStatus/${id}`;
      }

      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ approvalStatus: newStatus, adminId }),
      });

      const text = await res.text();
      let parsed;
      try {
        parsed = text ? JSON.parse(text) : null;
      } catch (err) {
        parsed = text;
      }

      if (!res.ok) {
        throw new Error(typeof parsed === "string" ? parsed : JSON.stringify(parsed));
      }

      // If API returns updated object, use it; otherwise apply optimistic update
      const updatedObj = parsed && (parsed.updatedLeaveRequest || parsed.leaveRequest || parsed.data || parsed);
      if (updatedObj && (updatedObj._id || updatedObj.id)) {
        setLeave((prev) => ({ ...prev, ...updatedObj }));
      } else {
        setLeave((prev) => ({ ...prev, approvalStatus: newStatus }));
      }

      alert(`Request ${newStatus}`);
    } catch (err) {
      console.error("Action failed:", err);
      alert("Could not update status: " + (err.message || err));
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="w-[1140px]">
          <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
              </div>
            </div>
            <div className="h-10 bg-gray-200 rounded-[10px] w-32 animate-pulse"></div>
          </div>

          <div className="flex">
            <div className="w-48 mr-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-200 rounded mb-2 animate-pulse"></div>
              ))}
            </div>

            <div className="flex-1 border border-gray-300 rounded-[10px] p-6">
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
                <div className="grid grid-cols-2 gap-6">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 w-full max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <h1 className="text-xl font-semibold text-gray-800 mb-4">Error</h1>
        <p className="text-sm text-red-500">{error}</p>
      </div>
    );
  }

  if (!leave) {
    return (
      <div className="p-6">
        <div className="w-[1140px]">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-700">No leave details available.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="w-[1140px]">
        <div className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Leave Application Details</h1>
            <p className="text-gray-500 text-sm">Requested by {leave.userName || leave.username}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold inline-flex items-center gap-2 ${
              leave.approvalStatus === "Approved"
                ? "bg-green-100 text-green-600"
                : leave.approvalStatus === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : "bg-red-100 text-red-500"
            }`}>{leave.approvalStatus || "-"}</div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center bg-[#7152F3] text-white px-5 py-2 rounded-[10px]"
            >
              Back
            </button>
          </div>
        </div>

        <div className="flex">
          <div className="w-48 mr-4">
            <div className="border border-gray-300 rounded-[10px] p-4">
              <p className="text-xs text-gray-500">Contact</p>
              <p className="font-medium">{leave.number || "-"}</p>
              <p className="text-xs text-gray-500 mt-4">Admin</p>
              <p className="font-medium">{leave.adminId || "-"}</p>
            </div>
          </div>

          <div className="flex-1 border border-gray-300 rounded-[10px] p-6">
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500">Leave Title</p>
                <p className="font-medium">{leave.title || leave.leaveType}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="font-medium">{formatDate(leave.startingDate || leave.startDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="font-medium">{formatDate(leave.endingDate || leave.endDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Leave Type</p>
                  <p className="font-medium">{leave.leaveType || "-"}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Days</p>
                  <p className="font-medium">{daysCount(leave.startingDate || leave.startDate, leave.endingDate || leave.endDate)}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Requested Date</p>
                  <p className="font-medium">{formatDate(leave.requestedDate)}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs text-gray-500">Message</p>
                  <p className="font-medium">{leave.message || "-"}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleAction("Approved")}
                  className="bg-[#7152F3] hover:bg-[#5b3fe0] text-white px-6 py-2 rounded-[10px] flex items-center gap-2"
                  disabled={actionLoading || leave.approvalStatus === "Approved"}
                >
                  {actionLoading ? <span className="animate-pulse">⏳</span> : null}
                  <span>{leave.approvalStatus === "Approved" ? "Approved" : "Approve"}</span>
                </button>
                <button
                  onClick={() => handleAction("Rejected")}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-[10px] flex items-center gap-2"
                  disabled={actionLoading || leave.approvalStatus === "Rejected"}
                >
                  {actionLoading ? <span className="animate-pulse">⏳</span> : null}
                  <span>{leave.approvalStatus === "Rejected" ? "Rejected" : "Reject"}</span>
                </button>
                <button
                  onClick={() => handleAction("Pending")}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-[10px]"
                  disabled={actionLoading || leave.approvalStatus === "Pending"}
                >
                  Mark Pending
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaveApplicationDetails;
