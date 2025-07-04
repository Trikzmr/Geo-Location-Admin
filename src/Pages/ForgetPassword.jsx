import React from 'react';

const ForgetPassword = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex max-w-4xl w-full bg-white rounded-lg shadow overflow-hidden">
        
        {/* Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/src/AttandenceOverview_Image.png"
            alt="Login Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-8">
          {/* Back */}
          <button
            className="flex items-center w-[67px] h-[24px] gap-[5px] text-sm text-gray-600 mb-6 opacity-100"
          >
            <span className="text-lg leading-none">&lt;</span> Back
          </button>

          {/* Title */}
          <h2 className="text-xl font-bold text-gray-800 mb-1">Forgot Password</h2>
          <p className="text-gray-400 mb-6 text-sm">
            Enter your registered email address. We’ll send you a code to reset your password.
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <label className="block text-sm text-purple-600 mb-1">Email Address</label>
            <input
              type="email"
              defaultValue="robertallen@example.com"
              className="w-full border border-purple-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Send OTP Button */}
          <button
            className="w-full text-white py-2 rounded hover:opacity-90 transition"
            style={{ backgroundColor: '#7152F3' }}
          >
            Send OTP
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
