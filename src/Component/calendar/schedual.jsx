'use client';

import { useState, useEffect } from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import { IoMdArrowDropdown } from 'react-icons/io';
import toast from 'react-hot-toast';

export default function SchedualPage({ initialDate, addEvent, closeModal }) {
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [participants, setParticipants] = useState('');
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);

  const generateTimes = () => {
    const times = [];
    for (let i = 0; i < 24; i++) {
      const hour = i % 12 === 0 ? 12 : i % 12;
      const ampm = i < 12 ? 'am' : 'pm';
      times.push(`${hour.toString().padStart(2, '0')}:00 ${ampm}`);
    }
    return times;
  };

  const times = generateTimes();

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'pm' && hours !== 12) hours += 12;
    if (modifier === 'am' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };

  const handleSchedule = () => {
    const validStart = !!startTime;
    const validEnd = !!endTime;
    const validRange = validStart && validEnd && parseTime(startTime) < parseTime(endTime);

    if (selectedDate && title && validStart && validRange && participants) {
      const meeting = {
        date: selectedDate,
        startTime,
        endTime,
        title,
        participants,
      };
      addEvent(meeting);
      toast.success('Meeting scheduled successfully!');
      closeModal();
    } else {
      toast.error('Please enter valid time, date, title, and participants.');
    }
  };

  const handleCancel = () => {
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setTitle('');
    setParticipants('');
    closeModal();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Date Picker */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-gray-600 font-medium gap-2 mb-1">
          <LuCalendarClock className="text-xl" />
          <input
            type="date"
            value={selectedDate}
            min={new Date().toISOString().split('T')[0]}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="ml-2 w-full max-w-[180px] focus:outline-none py-1 text-sm text-gray-700 rounded px-2 appearance-none"
          />
        </label>
      </div>

      {/* Time Pickers */}
      <div className="flex items-center gap-2 mb-4">
        <label className="text-sm text-[#717171] font-medium min-w-[50px]">Time:</label>

        {/* Start Time */}
        <div className="relative">
          <button
            onClick={() => setIsStartOpen(!isStartOpen)}
            className="flex items-center justify-between gap-1 -ml-5 px-4 py-[2px] text-sm rounded-full bg-[#F1F2F8] text-[#333] w-[120px] border border-gray-200"
          >
            <span className="truncate">{startTime || 'Start'}</span>
            <IoMdArrowDropdown className="text-gray-600 text-base" />
          </button>

          {isStartOpen && (
            <div
              onMouseLeave={() => setIsStartOpen(false)}
              className="absolute z-10 mt-2 w-[120px] bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto p-1"
            >
              {times.map((time, index) => (
                <button
                  key={`start-${index}`}
                  onClick={() => {
                    setStartTime(time);
                    setIsStartOpen(false);
                  }}
                  className={`w-full text-sm text-left px-2 py-[4px] rounded-full ${
                    startTime === time ? 'bg-blue-500 text-white' : 'text-gray-800 bg-white'
                  } hover:bg-blue-100`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dash */}
        <span className="text-[#717171] text-sm">-</span>

        {/* End Time */}
        <div className="relative">
          <button
            onClick={() => setIsEndOpen(!isEndOpen)}
            className="flex items-center justify-between gap-1 px-4 py-[2px] text-sm rounded-full bg-[#F1F2F8] text-[#333] w-[120px] border border-gray-200"
          >
            <span className="truncate">{endTime || 'End'}</span>
            <IoMdArrowDropdown className="text-gray-600 text-base" />
          </button>

          {isEndOpen && (
            <div
              onMouseLeave={() => setIsEndOpen(false)}
              className="absolute z-10 mt-2 w-[120px] bg-white rounded-lg shadow-lg max-h-40 overflow-y-auto p-1"
            >
              {times.map((time, index) => (
                <button
                  key={`end-${index}`}
                  onClick={() => {
                    setEndTime(time);
                    setIsEndOpen(false);
                  }}
                  className={`w-full text-sm text-left px-2 py-[4px] rounded-full ${
                    endTime === time ? 'bg-green-500 text-white' : 'text-gray-800 bg-white'
                  } hover:bg-green-100`}
                >
                  {time}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Participants */}
      <div className="mb-4">
        <label className="text-sm font-medium text-[#717171] block mb-1 px-2 py-1 font-poppins">
          Add Participants:
        </label>
        <div className="relative">
          <select
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="w-58 border border-[#877575] rounded-lg px-2 py-2 text-sm text-[#717171] bg-[#F8FDFF] font-poppins appearance-none cursor-pointer"
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)' }}
          >
            <option value="" disabled>
              Select Email Address
            </option>
            <option value="user1@example.com">user1@example.com</option>
            <option value="user2@example.com">user2@example.com</option>
            <option value="user3@example.com">user3@example.com</option>
            <option value="user4@example.com">user4@example.com</option>
          </select>
          <IoMdArrowDropdown className="absolute top-1/2 right-[20%] transform -translate-y-1/2 text-gray-600 pointer-events-none" />
        </div>
      </div>

      {/* Title */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Add Meeting Title, e.g, Project Stand-up Meeting"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border-b border-gray-900 focus:outline-none py-1 text-sm placeholder:text-[#717171]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-6 text-sm font-semibold">
        <button onClick={handleCancel} className="text-black hover:underline">
          Cancel
        </button>
        <button onClick={handleSchedule} className="text-[#058CBF] hover:underline">
          Schedule Meeting
        </button>
      </div>
    </div>
  );
}
