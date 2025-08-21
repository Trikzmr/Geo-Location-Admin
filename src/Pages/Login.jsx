import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const [error, setError] = useState(""); // error message
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    // Input validation
    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3005/api/login", {
        method: "POST",
        headers: {
          "credentials": "include",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save token or user data to localStorage if needed
        

        // Redirect to dashboard or home
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex max-w-4xl w-full overflow-hidden background: #7152F30D">
        <div className="hidden md:block md:w-1/2">
          <img
            src="/src/AttandenceOverview_Image.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="w-full md:w-1/2 p-10 h-full flex flex-col justify-center">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg">M</div>
            <h1 className="text-2xl font-semibold ml-2">HRMS</h1>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
            Welcome <span className="ml-1">👋</span>
          </h2>
          <p className="text-gray-400 mb-8">Please login here</p>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm text-purple-600 mb-1">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-sm text-purple-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-purple-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </span>
            </div>
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center space-x-2">
              <input type="checkbox" defaultChecked className="accent-purple-500" />
              <span className="text-sm font-medium">Remember Me</span>
            </label>
            <button className="text-sm text-purple-500 hover:underline">Forgot Password?</button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full rounded text-white py-2 hover:opacity-90 transition"
            style={{ backgroundColor: "#7152F3" }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
