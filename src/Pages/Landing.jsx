import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#EDE9FE]">

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#7152F3] bg-purple-50 px-3 py-1 rounded-full">Smart Workforce Platform</span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
            Geo-Location Based
            <span className="text-[#7152F3]"> Attendance</span> Tracking
          </h1>
          <p className="mt-4 text-gray-600 leading-relaxed">
            Monitor attendance in real time, manage leaves, and gain insights with a clean, modern admin experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#7152F3] text-white font-semibold shadow-sm hover:bg-[#5f45cc] transition-colors">
              Get Started
            </Link>
            <Link to="/dashboard/overview" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#7152F3] font-semibold shadow-sm ring-1 ring-[#7152F3]/20 hover:ring-[#7152F3]/30 transition-all">
              View Dashboard
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
              <p className="text-2xl font-bold text-gray-900">Live</p>
              <p className="text-xs text-gray-500">Attendance</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
              <p className="text-2xl font-bold text-gray-900">Leaves</p>
              <p className="text-xs text-gray-500">Requests</p>
            </div>
            <div className="p-4 rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
              <p className="text-2xl font-bold text-gray-900">Calendar</p>
              <p className="text-xs text-gray-500">Working Days</p>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-6 bg-gradient-to-tr from-[#7152F3]/10 to-[#22d3ee]/10 rounded-3xl blur-2xl"></div>
          <div className="relative bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-purple-50 p-4">
                <p className="text-sm font-medium text-purple-800">Employees</p>
                <p className="mt-2 text-3xl font-extrabold text-purple-900">+120</p>
              </div>
              <div className="rounded-2xl bg-indigo-50 p-4">
                <p className="text-sm font-medium text-indigo-800">Attendance</p>
                <p className="mt-2 text-3xl font-extrabold text-indigo-900">98%</p>
              </div>
              <div className="rounded-2xl bg-cyan-50 p-4">
                <p className="text-sm font-medium text-cyan-800">Leaves</p>
                <p className="mt-2 text-3xl font-extrabold text-cyan-900">8</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-4">
                <p className="text-sm font-medium text-emerald-800">On Time</p>
                <p className="mt-2 text-3xl font-extrabold text-emerald-900">92%</p>
              </div>
            </div>
            <div className="mt-6 h-48 rounded-2xl bg-gradient-to-r from-[#7152F3] to-[#22d3ee] flex items-center justify-center text-white font-semibold">
              Modern Admin Experience
            </div>
          </div>
        </div>
      </main>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="h-10 w-10 rounded-lg bg-purple-100 text-[#7152F3] flex items-center justify-center font-bold">1</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Real-time Attendance</h3>
          <p className="mt-2 text-gray-600">Live punch-in/out, geo-fencing, and instant insights.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="h-10 w-10 rounded-lg bg-purple-100 text-[#7152F3] flex items-center justify-center font-bold">2</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Leave Management</h3>
          <p className="mt-2 text-gray-600">Submit, approve, and track leave requests with ease.</p>
        </div>
        <div className="p-6 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="h-10 w-10 rounded-lg bg-purple-100 text-[#7152F3] flex items-center justify-center font-bold">3</div>
          <h3 className="mt-4 text-lg font-semibold text-gray-900">Working Calendar</h3>
          <p className="mt-2 text-gray-600">Customizable working days and holiday schedules.</p>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="bg-white/60">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <ol className="mt-6 space-y-4 text-gray-700 list-decimal list-inside">
              <li>Login to your admin dashboard</li>
              <li>Manage employees and approvals</li>
              <li>Monitor attendance and leaves</li>
              <li>Review calendar and insights</li>
            </ol>
            <div className="mt-6">
              <Link to="/dashboard/overview" className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-[#7152F3] text-white font-semibold shadow-sm hover:bg-[#5f45cc] transition-colors">Open Dashboard</Link>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-tr from-[#7152F3]/10 to-[#22d3ee]/10 rounded-3xl blur-2xl"></div>
            <div className="relative bg-white rounded-3xl shadow-xl ring-1 ring-gray-100 p-6">
              <div className="mt-6 h-56 rounded-2xl bg-gradient-to-r from-[#7152F3] to-[#22d3ee] flex items-center justify-center text-white font-semibold">
                Seamless Admin Controls
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-gray-900 text-center">What teams say</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {["Reliable and intuitive.", "Streamlined our HR ops.", "Great design and speed."].map((quote, i) => (
            <div key={i} className="p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-100">
              <p className="text-gray-700">“{quote}”</p>
              <p className="mt-3 text-sm text-gray-500">— Admin User</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call To Action */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="rounded-3xl bg-gradient-to-r from-[#7152F3] to-[#22d3ee] p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold">Ready to modernize attendance?</h3>
          <p className="mt-2 text-white/90">Log in and start managing your workforce today.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/login" className="px-6 py-3 rounded-xl bg-white text-[#7152F3] font-semibold">Login</Link>
            <Link to="/dashboard/overview" className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-semibold">Go to Dashboard</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;


