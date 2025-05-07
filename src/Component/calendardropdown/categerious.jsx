"use client";

export default function Categories() {
  return (
    <div className="p-6 w-full max-w-sm mt-23 ml-20 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>

      <div className="grid grid-cols-2 gap-y-4 text-1xl font-medium">
        {/* Column 1: Daily Task, Meeting, Reminder */}
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-[#018ABE]"></span>
          <span>Daily Task</span>
        </div>
        {/* Column 2: Deadline */}
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
        {/* Empty column to align Reminder properly */}
        <div></div>
      </div>

      <button className="mt-8 bg-[#058CBF] hover:bg-sky-700 text-white font-bold py-2 px-4 rounded-md shadow cursor-pointer w-32 text-center">
    CREATE
</button>

</div>
  );
}