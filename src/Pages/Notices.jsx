import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const Notices = () => {
  const notifications = [
    {
      title: 'Leave Request',
      message: '@Robert Fox has applied for leave',
      time: 'Just Now',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      title: 'Check In Issue',
      message: '@Alexa shared a message regarding check in issue',
      time: '11:16 AM',
      avatar: null,
    },
    {
      title: 'Applied job for "Sales Manager" Position',
      message: '@shane Watson has applied for job',
      time: '09:00 AM',
      avatar: null,
    },
    {
      title: 'Robert Fox has share his feedback',
      message: '"It was an amazing experience with your organisation"',
      time: 'Yesterday',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    {
      title: 'Password Update successfully',
      message: 'Your password has been updated successfully',
      time: 'Yesterday',
      avatar: null,
    },
  ];

  return (
    <div className="p-6">

        {/* Header + Search Bar in Same Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Notifications</h1>
            <p className="text-gray-500 text-sm">All employee Notices requests</p>
          </div>
          <div className="relative w-full md:w-1/3">
            <BiSearch className="absolute top-3.5 left-3 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>


      {/* Notifications List */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <ul className="divide-y">
          {notifications.map((note, index) => (
            <li
              key={index}
              className="flex justify-between items-start gap-4 p-4 hover:bg-gray-50"
            >
              {/* Avatar or Icon */}
              <div className="flex-shrink-0">
                {note.avatar ? (
                  <img
                    src={note.avatar}
                    alt="avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold text-lg">
                    {note.title.charAt(0)}
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="flex-1">
                <p className="font-medium text-gray-800">{note.title}</p>
                <p className="text-sm text-gray-500">{note.message}</p>
              </div>

              {/* Time */}
              <div className="text-sm text-gray-400">{note.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notices;
