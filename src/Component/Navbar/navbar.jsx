'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FaBell,
  FaVideo,
  FaUser,
  FaCog,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useUser } from '../usersignup/usercontext';

export default function NavBar() {
  const { userName } = useUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMeetingPopup, setShowMeetingPopup] = useState(false); // Added state for popup visibility
  const notifications = []; // Replace with actual notifications if needed

  const handleProfileAction = (action) => {
    alert(`Profile action: ${action}`);
    setShowProfileMenu(false);
  };

  const toggleMeetingPopup = () => {
    setShowMeetingPopup(!showMeetingPopup); // Toggle popup visibility
  };

  return (
    <div className="bg-cyan-300 px-6 py-3 shadow flex items-center min-w-full relative">
      {/* Centered Welcome Message */}
      <h1 className="text-3xl font-bold text-black absolute left-10 transform whitespace-nowrap">
        Welcome {userName || 'Ayaan Raje'}!
      </h1>

      <div className="ml-auto flex items-center gap-12 mr-10">
        {/* Video Icon */}
        <button title="Video Call" onClick={toggleMeetingPopup}>
          <FaVideo className="w-5 h-5 text-black cursor-pointer" />
        </button>

        {/* Video Call Popup */}
        {showMeetingPopup && (
          <div className="min-h-screen flex items-center justify-center bg-gray-400/50 bg-opacity-50 backdrop-blur-[1px] p-6 fixed inset-0 z-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center w-full max-w-xl relative">
              <h2 className="text-2xl font-bold text-center mb-6 border-b-2 border-black inline-block">
                SCHEDULE MEETING
              </h2>

              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Meeting Title"
                  required
                  className="w-full p-2 border border-black rounded"
                />

                <textarea
                  placeholder="Description"
                  required
                  className="w-full p-2 border border-black rounded"
                ></textarea>

                <select
                  required
                  className="w-full p-2 border border-black rounded"
                >
                  <option value="">Select Team Members</option>
                  <option value="Member 1">Member 1</option>
                  <option value="Member 2">Member 2</option>
                  <option value="Member 3">Member 3</option>
                </select>

                <div className="flex gap-4">
                  <div className="relative w-1/2">
                    <input
                      type="date"
                      required
                      className="w-full p-2 border border-gray-300 rounded text-transparent bg-transparent"
                    />
                    <span className="absolute left-3 top-2 text-black pointer-events-none">
                      Meeting Date
                    </span>
                  </div>

                  <div className="relative w-1/2">
                    <input
                      type="time"
                      required
                      className="w-full p-2 border border-gray-300 rounded text-transparent bg-transparent"
                    />
                    <span className="absolute left-3 top-2 text-black pointer-events-none">
                      Meeting Time
                    </span>
                  </div>
                </div>

                <select
                  required
                  className="w-full p-2 border border-black rounded"
                >
                  <option value="">Select Duration</option>
                  <option value="30">30 minutes</option>
                  <option value="60">1 hour</option>
                  <option value="90">1.5 hours</option>
                </select>

                <div className="flex items-center w-full">
                  <label className="mr-2 text-gray-400 whitespace-nowrap">Link</label>
                  <input
                    type="url"
                    required
                    className="flex-1 p-2 border border-black rounded"
                  />
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    style={{ backgroundColor: '#018ABE' }}
                    className="px-6 py-2 text-white rounded hover:opacity-90"
                  >
                    Create
                  </button>
                </div>
              </form>

              {/* Close button for popup */}
              <button
                onClick={toggleMeetingPopup}
                className="absolute top-2 right-2 text-2xl text-gray-500"
              >
                &times;
              </button>
            </div>
          </div>
        )}

        {/* Notification Icon */}
        <div className="relative">
          <button
            title="Notifications"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="relative cursor-pointer"
          >
            <FaBell className="w-5 h-5 text-black" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {notifications.length}
            </span>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
              <div className="p-4 font-semibold border-b">Notifications</div>
              <div className="p-4 text-gray-500 text-sm">
                {notifications.length === 0
                  ? 'No new notifications'
                  : notifications.map((note, idx) => (
                    <div key={idx} className="mb-2">
                      {note}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* User Avatar with Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="focus:outline-none"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white hover:border-gray-300 transition-all relative">
              <Image
                src="/profile.png"
                width={500}
                height={500}
                alt="Profile picture" // Add a description here
                style={{ objectFit: 'cover' }}
              />
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg z-10">
              <div className="p-4 border-b">
                <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src="/profile.png"
                      width={500}
                      height={500}
                      alt="Profile picture" // Add a description here
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div>
                    <div className="font-semibold">{userName || 'Guest'}</div>
                    <div className="text-sm text-gray-500">user@example.com</div>
                  </div>
                </div>
              </div>

              <div className="py-2">
                <button
                  onClick={() => handleProfileAction('view-profile')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100"
                >
                  <FaUser className="text-gray-600" />
                  <Link href="/profile">
                    <span>View Profile</span>
                  </Link>
                </button>

                <div className="border-t my-1"></div>

                <button
                  onClick={() => handleProfileAction('logout')}
                  className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-100 text-red-500"
                >
                  <FaSignOutAlt />
                  <Link href="/">
                    <span>Logout</span>
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
