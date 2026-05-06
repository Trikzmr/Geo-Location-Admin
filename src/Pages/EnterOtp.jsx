import React from "react";

const EnterOtp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full bg-white rounded-lg shadow overflow-hidden">
        {/* Image Section */}
        
        <div className="hidden md:block md:w-1/2 bg-[#7152F30D]">
          <img
            src="/src/AttandenceOverview_Image.png"
            alt="OTP Illustration"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-10 h-full flex flex-col justify-center bg-gray-50">
          {/* Back Button */}
          <button className="flex items-center text-sm text-gray-600 mb-6">
            <span className="mr-1 text-lg leading-none">&lt;</span> Back
          </button>

          {/* Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Enter OTP</h2>
          <p className="text-gray-400 mb-8 text-sm">
            We have shared a code to your registered email address
            <br />
            robertallen@example.com
          </p>

          {/* OTP Inputs */}
          <div className="flex space-x-3 mb-8">
            <input
              type="text"
              maxLength="1"
              defaultValue="5"
              className="w-12 h-12 text-center border-2 border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="text"
              maxLength="1"
              defaultValue="0"
              className="w-12 h-12 text-center border-2 border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center border-2 border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <input
              type="text"
              maxLength="1"
              className="w-12 h-12 text-center border-2 border-purple-400 rounded focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
          </div>

          {/* Verify Button */}
          <button
            className="w-full bg-[#7152F3] text-white py-2 rounded hover:bg-purple-700 transition"
          >
            Verify
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnterOtp;
