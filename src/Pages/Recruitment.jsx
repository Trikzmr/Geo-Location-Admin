import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Recruitment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    number: "",
    dob: "",
    qualification: "",
    skills: "",
    presentAddress: "",
    permanentAddress: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Parse skills from comma-separated string to array
      const skillsArray = formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter((skill) => skill.length > 0);

      const payload = {
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        number: formData.number,
        dob: formData.dob,
        qualification: formData.qualification,
        skills: skillsArray,
        presentAddress: formData.presentAddress,
        permanentAddress: formData.permanentAddress,
      };

      const api = "https://geo-location-based-attendence-tracking.onrender.com/api/register";
      const response = await fetch(api, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      setSuccess(true);
      
      // Reset form
      setFormData({
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        number: "",
        dob: "",
        qualification: "",
        skills: "",
        presentAddress: "",
        permanentAddress: "",
      });

      // Show success message and redirect after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F3FF] via-white to-[#EDE9FE]">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7152F3] to-[#5f45cc] flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <span className="font-bold text-gray-900">GeoTrack</span>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="text-gray-600 hover:text-[#7152F3] transition font-medium"
          >
            Already a member? Login
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Inspiring Content */}
          <div className="order-2 lg:order-1">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#7152F3] bg-purple-50 px-3 py-1 rounded-full mb-4">
              Join Our Team
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900 mb-6">
              Build the Future with
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7152F3] to-[#22d3ee]"> Us</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Join our innovative team and be part of a modern workforce solution. We're looking for talented individuals who are passionate about technology and excellence.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#7152F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Smart Technology Stack</h3>
                  <p className="text-sm text-gray-600">Work with modern tools and frameworks</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#7152F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Competitive Compensation</h3>
                  <p className="text-sm text-gray-600">Attractive salary and benefits package</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#7152F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Growth Opportunities</h3>
                  <p className="text-sm text-gray-600">Continuous learning and development</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-[#7152F3]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M17.657 17.657L21.121 21.12m-4.243-4.243l4.242 4.242M3 12a9 9 0 1118 0 9 9 0 01-18 0zm3 0a6 6 0 1112 0 6 6 0 01-12 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Collaborative Team</h3>
                  <p className="text-sm text-gray-600">Work with passionate and innovative minds</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100 text-center">
                <p className="text-2xl font-bold text-[#7152F3]">50+</p>
                <p className="text-xs text-gray-600 mt-1">Team Members</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100 text-center">
                <p className="text-2xl font-bold text-[#7152F3]">10+</p>
                <p className="text-xs text-gray-600 mt-1">Countries</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm ring-1 ring-gray-100 text-center">
                <p className="text-2xl font-bold text-[#7152F3]">24/7</p>
                <p className="text-xs text-gray-600 mt-1">Support</p>
              </div>
            </div>
          </div>

          {/* Right Section - Registration Form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl ring-1 ring-gray-100 p-8 md:p-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Get Started Today</h2>
              <p className="text-gray-600 mb-8">Fill in your details and join our growing team</p>

              {success && (
                <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-green-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-green-900">Registration Successful!</p>
                      <p className="text-sm text-green-700">Redirecting to login...</p>
                    </div>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200">
                  <div className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-red-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="font-semibold text-red-900">Error</p>
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Username & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Username *</label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleChange}
                      required
                      placeholder="johndoe"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* First Name & Last Name Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      placeholder="John"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      placeholder="Doe"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* Password & Phone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                      required
                      placeholder="9876543210"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* Date of Birth & Qualification Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Date of Birth *</label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Qualification *</label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required
                      placeholder="B.Tech"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Skills (comma-separated) *</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    placeholder="Node.js, MongoDB, React"
                    rows="2"
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition resize-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate multiple skills with commas</p>
                </div>

                {/* Present Address & Permanent Address Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Present Address *</label>
                    <input
                      type="text"
                      name="presentAddress"
                      value={formData.presentAddress}
                      onChange={handleChange}
                      required
                      placeholder="City, State"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Permanent Address *</label>
                    <input
                      type="text"
                      name="permanentAddress"
                      value={formData.permanentAddress}
                      onChange={handleChange}
                      required
                      placeholder="City, State"
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-[#7152F3] focus:ring-2 focus:ring-[#7152F3]/20 outline-none transition"
                    />
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start gap-3 pt-2">
                  <input type="checkbox" id="terms" required className="w-4 h-4 rounded border-gray-300 text-[#7152F3] focus:ring-[#7152F3] mt-1" />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and conditions and privacy policy
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full bg-gradient-to-r from-[#7152F3] to-[#5f45cc] text-white font-semibold py-3 rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-6"
                >
                  {loading ? "Processing..." : success ? "Registration Successful!" : "Create Account"}
                </button>

                <p className="text-center text-sm text-gray-600 mt-6">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="text-[#7152F3] font-semibold hover:underline"
                  >
                    Login here
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruitment;
