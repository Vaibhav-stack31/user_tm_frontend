"use client";

import { useState } from "react";

import TaskForm from "../calendar/craetetask";
import SchedualPage from "../calendar/schedual";
import TaskPage from "../calendar/event";



export default function Categories() {
  const [showTabs, setShowTabs] = useState(false);
  const [activeTab, setActiveTab] = useState("Event");

  const tabs = [
    {
      label: "Event",
      key: "Event",
      content: <TaskForm/>,
    },
    {
      label: "Task",
      key: "Task",
      content: <TaskPage/>,
    },
    {
      label: "Schedule Meeting",
      key: "Schedule",
      content: <SchedualPage />,
    },
  ];

  return (
    <div className="p-6 w-full max-w-sm mt-23 ml-20 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <div className="grid grid-cols-2 gap-y-4 text-1xl font-medium">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#018ABE]"></span>
          <span>Daily Task</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#9306FF]"></span>
          <span>Deadline</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#FF0B0B]"></span>
          <span>Meeting</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#FFB006]"></span>
          <span>Leaves</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#07D107]"></span>
          <span>Reminder</span>
        </div>
        <div></div>
      </div>

      <button
        onClick={() => setShowTabs(!showTabs)}
        className="mt-8 bg-[#058CBF] hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md shadow cursor-pointer w-32 text-center"
      >
        CREATE
      </button>

      {showTabs && (
        <div className="mt-6">
          <div className="flex justify-around mb-4 shadow-md">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-4 font-medium ${
                  activeTab === tab.key
                    ? "border-b-4 border-[#018ABE]"
                    : "text-gray-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div>{tabs.find((tab) => tab.key === activeTab)?.content}</div>
        </div>
      )}
    </div>
  );
}
