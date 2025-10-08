import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const [error, setError] = useState(""); // error message
  const [isLoading, setIsLoading] = useState(false); // loading state
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    setIsLoading(true);

    // Input validation
    if (!email || !password) {
      setError("Email and Password are required.");
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("https://geo-location-based-attendence-tracking.onrender.com/api/login", {
        method: "POST",
        headers: {
          "credentials": "include",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Save user data to context and localStorage
        const userData = {
          email: email,
          name: data.user?.name || data.user?.firstName + ' ' + data.user?.lastName || email.split('@')[0],
          role: data.user?.role || 'Admin',
          id: data.user?.id || data.user?._id
        };
        
        login(userData);

        // Redirect to dashboard or home
        navigate("/dashboard/overview");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex  w-full overflow-hidden background: #7152F30D">
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
            disabled={isLoading}
            className={`w-full rounded text-white py-3 font-medium transition-all duration-200 flex items-center justify-center ${
              isLoading 
                ? 'opacity-75 cursor-not-allowed' 
                : 'hover:opacity-90 hover:shadow-lg'
            }`}
            style={{ backgroundColor: "#7152F3" }}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Signing In...
              </>
            ) : (
              'Login'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
