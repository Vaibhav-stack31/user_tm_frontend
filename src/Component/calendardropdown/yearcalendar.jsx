'use client';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";  // Make sure to import Link

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysShort = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDay(year, month) {
  return new Date(year, month, 1).getDay();
}

const Yearcalendar = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State for managing dropdown visibility
  const year = 2025;
  const today = new Date();

  const underlineRef = useRef(null);
  const dropdownRef = useRef(null); // Ref for dropdown menu

  useEffect(() => {
    gsap.fromTo(
      underlineRef.current,
      { width: "0%" },
      { width: "100%", duration: 1, ease: "power2.out" }
    );

    // Close dropdown when clicked outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 text-black max-w-screen-xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
       <h2 className="text-left font-bold text-gray-800 text-3xl mb-15 ml-15">

  <span className="relative inline-block">
    MyCalendar2025
    <span
      ref={underlineRef}
      className="absolute left-0 bottom-[-2px] h-[3px] bg-red-500 w-[50%]"
    ></span>
  </span>
</h2>
        <div className="relative mt-4 md:mt-0" ref={dropdownRef}>
        <button
  onClick={() => setShowDropdown(prev => !prev)}
  className="px-5 py-2 rounded-lg border border-[#877575] bg-white text-black font-medium transition duration-200 ease-in-out hover:bg-gray-100 hover:shadow -ml-1"
>
  Year
</button>


          {showDropdown && (
            <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow z-10 w-40">
              {[
                { label: "Day", href: "/daycalendar" },
                { label: "Month", href: "/calendar" },
                { label: "Year", href: "/yearcalendar" },
              ].map((item) => (
                <Link key={item.label} href={item.href}>
                  <div className="px-4 py-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm text-gray-700">
                    {item.label}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 text-xs mx-auto w-[1100px]">
        {months.map((month, monthIndex) => {
          const daysInMonth = getDaysInMonth(year, monthIndex);
          const firstDay = getFirstDay(year, monthIndex);

          const daysArray = Array(firstDay).fill(null).concat(
            Array.from({ length: daysInMonth }, (_, i) => i + 1)
          );

          return (
            <div key={month} className="rounded shadow-xl p-2 bg-white w-full max-w-[250px] mx-auto text-[11px]">
              <h2 className="text-center font-semibold mb-1 text-sm">{month.toUpperCase()}</h2>
              <div className="grid grid-cols-7 gap-1 text-center font-medium text-gray-700 mb-1">
                {daysShort.map((day) => (
                  <div key={day} className="shadow-sm rounded py-1">{day}</div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {daysArray.map((day, i) => {
                  const isToday =
                    day === today.getDate() &&
                    monthIndex === today.getMonth() &&
                    year === today.getFullYear();

                  return (
                    <div
                      key={i}
                      className={`rounded h-5 flex items-center justify-center
                        ${day === null ? '' : 'bg-[#ECEEFD] shadow-md'}
                        ${day === 1 ? 'bg-cyan-400 text-white shadow-lg' : ''}
                        ${isToday ? 'bg-black text-white shadow-lg' : ''}`}
                    >
                      {day}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Yearcalendar;
