'use client';

import { useState, useEffect } from 'react';
import { LuCalendarClock } from 'react-icons/lu';
import { IoMdArrowDropdown } from 'react-icons/io';
import toast from 'react-hot-toast';

export default function SchedualPage({ initialDate, addEvent, closeModal }) {
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [title, setTitle] = useState('');
  const [isStartValid, setIsStartValid] = useState(true);
  const [isEndValid, setIsEndValid] = useState(true);

  useEffect(() => {
    if (initialDate) {
      setSelectedDate(initialDate);
    }
  }, [initialDate]);

  const handleTimeInput = (value, setter, setValid) => {
    let newValue = value.replace(/[^\d]/g, '');
    if (newValue.length > 4) newValue = newValue.slice(0, 4);

    if (newValue.length >= 3) {
      newValue = newValue.slice(0, 2) + ':' + newValue.slice(2);
    }

    const [hh, mm] = newValue.split(':');
    const isValid =
      hh &&
      mm &&
      /^\d{2}$/.test(hh) &&
      /^\d{2}$/.test(mm) &&
      Number(hh) >= 0 &&
      Number(hh) <= 23 &&
      Number(mm) >= 0 &&
      Number(mm) <= 59;

    setter(newValue);
    setValid(isValid);
  };

  const handleSchedule = () => {
    if (isStartValid && isEndValid && selectedDate && startTime && endTime && title) {
      addEvent(selectedDate, 'Meeting');
      toast.success('Meeting scheduled successfully!');
      console.log({
        date: selectedDate,
        startTime,
        endTime,
        title,
      });
      closeModal();
    } else {
      toast.error('Please enter valid time, date, and title.');
    }
  };

  const handleCancel = () => {
    setSelectedDate('');
    setStartTime('');
    setEndTime('');
    setTitle('');
    closeModal();
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Date */}
      <div className="mb-4">
        <label className="flex items-center text-sm text-gray-600 font-medium gap-2 mb-1">
          <LuCalendarClock className="text-xl" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="ml-2 w-full max-w-[180px] focus:outline-none py-1 text-sm text-gray-700 rounded px-2 appearance-none"
          />
        </label>
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 mb-4 border-b pb-2">
        <label className="text-sm text-[#717171] font-Poppins min-w-[50px]">Time :</label>
        <input
          type="text"
          placeholder="9:00 am"
          maxLength={5}
          value={startTime}
          onChange={(e) => handleTimeInput(e.target.value, setStartTime, setIsStartValid)}
          className={`bg-[#F1F2F8] px-3 py-1 rounded-lg text-sm text-center w-[90px] ${
            !isStartValid ? 'border border-red-500' : ''
          }`}
          style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}
        />
        <span className="text-gray-600">-</span>
        <input
          type="text"
          placeholder="11:00 am"
          maxLength={5}
          value={endTime}
          onChange={(e) => handleTimeInput(e.target.value, setEndTime, setIsEndValid)}
          className={`w-[90px] bg-[#F1F2F8] px-3 py-1 rounded-lg text-Poppins text-center text-[#717171] ${
            !isEndValid ? 'border border-red-500' : ''
          }`}
          style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)' }}
        />
      </div>

      {/* Participants */}
      <div className="mb-4">
        <label className="text-sm font-medium text-[#717171] block mb-1 px-2 py-1 font-poppins">
          Add Participants:
        </label>
        <div className="relative">
          <select
            className="w-58 border border-[#877575] rounded-lg px-2 py-2 text-sm text-[#717171] bg-[#F8FDFF] font-poppins appearance-none cursor-pointer"
            style={{ boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)' }}
            defaultValue=""
          >
            <option value="" disabled>
              Select Email Address
            </option>
            <option value="user1@example.com">user1@example.com</option>
            <option value="user2@example.com">user2@example.com</option>
            <option value="user3@example.com">user3@example.com</option>
            <option value="user4@example.com">user4@example.com</option>
          </select>
          <IoMdArrowDropdown className="absolute top-1/2 right-[50%] transform -translate-y-1/2 text-gray-600 pointer-events-none" />
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

      {/* Buttons */}
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
