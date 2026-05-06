// Central configuration file for API endpoints
export const API_BASE_URL = "https://geoserver-ph8p.onrender.com";

// Export commonly used endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/login`,

  // Employees
  GET_EMPLOYEES: `${API_BASE_URL}/api/getEmployes`,
  GET_EMPLOYEE_BY_USERNAME: `${API_BASE_URL}/api/getEmployeeByUsername`,
  GET_PENDING_REGISTRATION: `${API_BASE_URL}/api/GetPendingRegistration`,

  // Attendance
  GET_ATTENDANCE_BY_USERNAME: `${API_BASE_URL}/api/getAttendanceByUsername`,
  GET_ATTENDANCE_BY_DAY: `${API_BASE_URL}/api/attendanceByDay`,
  CURRENT_LOCATION: `${API_BASE_URL}/api/currentLocation`,

  // Leaves
  GET_LEAVE_BY_USER_ID: `${API_BASE_URL}/api/LeaveDataByuserId`,
  GET_ALL_LEAVE_REQUEST: `${API_BASE_URL}/api/getAllLeaveRequest`,
  GET_LEAVE_REQUEST_BY_ID: `${API_BASE_URL}/api/getLeaveRequestByid`,
  APPROVE_LEAVE_REQUEST: `${API_BASE_URL}/api/approveLeaveRequest`,
  REJECT_LEAVE_REQUEST: `${API_BASE_URL}/api/RejectLeaveRequest`,
  UPDATE_LEAVE_STATUS: `${API_BASE_URL}/api/updateLeaveStatus`,

  // Company Setup
  COMPANY: `${API_BASE_URL}/api/company`,

  // Location
  GET_ACTIVE_OFF_SITE: `${API_BASE_URL}/api/getActiveOffSite`,
  ASSIGN_OFF_SITE: `${API_BASE_URL}/api/assignOffSite`,

  // Schedule/Calendar
  GET_CALENDARS: `${API_BASE_URL}/api/getCalenders`,
  ADD_CALENDAR: `${API_BASE_URL}/api/addCalender`,
  GET_WEEKEND: `${API_BASE_URL}/api/getWeekend`,

  // Dashboard
  DASHBOARD_STATS: `${API_BASE_URL}/api/dashboardStats`,
};
