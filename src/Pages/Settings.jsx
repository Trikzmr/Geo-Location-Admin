import React, { useState } from 'react';

const Settings = () => {
  const [settings, setSettings] = useState({
    appearance: 'Light',
    language: 'English',
    twoFactorAuth: true,
    mobilePush: true,
    desktopNotification: true,
    emailNotification: true,
  });

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Settings</h1>
        <p className="text-gray-500 text-sm">All System Settings</p>
      </div>

      {/* Settings List */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm divide-y">
        {/* Appearance */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="font-medium text-gray-800">Appearance</p>
            <p className="text-sm text-gray-500">Customize how your theme looks on your device</p>
          </div>
          <select
            value={settings.appearance}
            onChange={(e) => setSettings({ ...settings, appearance: e.target.value })}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option>Light</option>
            <option>Dark</option>
          </select>
        </div>

        {/* Language */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="font-medium text-gray-800">Language</p>
            <p className="text-sm text-gray-500">Select your language</p>
          </div>
          <select
            value={settings.language}
            onChange={(e) => setSettings({ ...settings, language: e.target.value })}
            className="border border-gray-300 rounded px-3 py-1 text-sm"
          >
            <option>English</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>

        {/* Toggle Switch Items */}
        {[
          {
            label: 'Two-factor Authentication',
            desc: 'Keep your account secure by enabling 2FA via mail',
            key: 'twoFactorAuth',
          },
          {
            label: 'Mobile Push Notifications',
            desc: 'Receive push notification',
            key: 'mobilePush',
          },
          {
            label: 'Desktop Notification',
            desc: 'Receive push notification in desktop',
            key: 'desktopNotification',
          },
          {
            label: 'Email Notifications',
            desc: 'Receive email notification',
            key: 'emailNotification',
          },
        ].map(({ label, desc, key }) => (
          <div key={key} className="flex items-center justify-between p-4">
            <div>
              <p className="font-medium text-gray-800">{label}</p>
              <p className="text-sm text-gray-500">{desc}</p>
            </div>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[key]}
                onChange={() => handleToggle(key)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-400 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:left-[calc(100%-20px)] after:shadow-sm relative" />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;
