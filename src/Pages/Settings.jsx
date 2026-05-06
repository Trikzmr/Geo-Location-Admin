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

  const handleSelectChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
        <p className="text-gray-600">Manage your account settings and preferences</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-8">
        {/* General Settings */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">General</h2>
            <p className="text-sm text-gray-500">Basic account and display settings</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Appearance */}
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Appearance</h3>
                <p className="text-sm text-gray-500">Customize how your theme looks on your device</p>
              </div>
              <select
                value={settings.appearance}
                onChange={(e) => handleSelectChange('appearance', e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[120px]"
              >
                <option value="Light">Light</option>
                <option value="Dark">Dark</option>
                <option value="System">System</option>
              </select>
            </div>

            {/* Language */}
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Language</h3>
                <p className="text-sm text-gray-500">Select your preferred language</p>
              </div>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent min-w-[120px]"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
              </select>
            </div>
          </div>
        </div>

        {/* Security & Privacy */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Security & Privacy</h2>
            <p className="text-sm text-gray-500">Manage your security and privacy settings</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Two-factor Authentication */}
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Two-factor Authentication</h3>
                <p className="text-sm text-gray-500">Keep your account secure by enabling 2FA via email</p>
              </div>
              <ToggleSwitch
                checked={settings.twoFactorAuth}
                onChange={() => handleToggle('twoFactorAuth')}
              />
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-500">Manage how you receive notifications</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {/* Mobile Push Notifications */}
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Mobile Push Notifications</h3>
                <p className="text-sm text-gray-500">Receive push notifications on your mobile device</p>
              </div>
              <ToggleSwitch
                checked={settings.mobilePush}
                onChange={() => handleToggle('mobilePush')}
              />
            </div>

            {/* Desktop Notifications */}
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Desktop Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications on your desktop</p>
              </div>
              <ToggleSwitch
                checked={settings.desktopNotification}
                onChange={() => handleToggle('desktopNotification')}
              />
            </div>

            {/* Email Notifications */}
            <div className="flex items-center justify-between p-6">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 mb-1">Email Notifications</h3>
                <p className="text-sm text-gray-500">Receive notifications via email</p>
              </div>
              <ToggleSwitch
                checked={settings.emailNotification}
                onChange={() => handleToggle('emailNotification')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Custom Toggle Switch Component
const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={onChange}
      />
      <div className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 ${
        checked ? 'bg-purple-600' : 'bg-gray-200'
      }`}>
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`} />
      </div>
    </label>
  );
};

export default Settings;
