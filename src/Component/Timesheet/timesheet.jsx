"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { AiFillDelete } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { FiChevronDown } from "react-icons/fi";
import { axiosInstance } from "@/lib/axiosInstance";

export default function Timeline() {
    const [isFilledTimesheet, setIsFilledTimesheet] = useState(false);
    const [items, setItems] = useState([]);
    const [date, setDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    });
    const [projectName, setProjectName] = useState("");
    const [selectedManagers, setSelectedManagers] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [todayHours, setTodayHours] = useState([]);
    const [totalTime, setTotalTime] = useState("00:00");

    const router = useRouter();
    const underlineRef = useRef(null);
    const rowRefs = useRef([]);
    // Create refs for each input field
    const inputRefs = useRef({
        projectName: null,
        items: []
    });

    const checkFilledOrNotTimesheet = async (date) => {
        try {
            const response = await axiosInstance.get(`/timesheet/${date}`);
            if (response.status === 200 && response.data.message === 'Timesheet found') {
                setIsFilledTimesheet(true);

                // Populate form with timesheet data
                const timesheetData = response.data.timesheet;
                setProjectName(timesheetData.projectName || "");
                setSelectedManagers(timesheetData.notifiedManagers || []);
                setItems(timesheetData.items || []);

                // Calculate and set total hours
                const durations = timesheetData.items.map(item => {
                    const [hours, minutes] = item.duration.split(":").map(Number);
                    return `${String(hours).padStart(2, "0")}${String(minutes).padStart(2, "0")}`;
                });
                setTodayHours(durations);
                setTotalTime(timesheetData.totalWorkHours || calculateTotalTime(durations));

                toast.success("Already filled timesheet loaded", {
                    duration: 3000,
                    position: "top-center"
                });
            } else {
                resetForm();
                setIsFilledTimesheet(false);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                resetForm();
                setIsFilledTimesheet(false);
            } else {
                console.error("Error checking timesheet:", error);
                toast.error("Error loading timesheet data");
                resetForm();
                setIsFilledTimesheet(false);
            }
        }
    };

    const resetForm = () => {
        const defaultTimes = Array.from({ length: 8 }, (_, i) => {
            const start = new Date(0, 0, 0, 9 + i, 0);
            const end = new Date(0, 0, 0, 10 + i, 0);
            return {
                timeRange: `${formatTime(start)} - ${formatTime(end)}`,
                task: "",
                type: "Miscellaneous",
                duration: "01:00",
                bucket: "Miscellaneous",
            };
        });

        const defaultDurations = defaultTimes.map(() => "0100");
        setProjectName("");
        setSelectedManagers([]);
        setItems(defaultTimes);
        setTodayHours(defaultDurations);
        setTimeout(() => {
            setTotalTime(calculateTotalTime(defaultDurations));
        }, 0);
    };

    useEffect(() => {
        if (date) {
            checkFilledOrNotTimesheet(date);
        }
    }, [date]);

    // Initialize inputRefs when items change
    useEffect(() => {
        inputRefs.current.items = Array(items.length).fill().map(() => ({
            task: null,
            duration: null
        }));
    }, [items.length]);

    const handleDateChange = (e) => {
        const newDate = e.target.value;
        setDate(newDate);
    };

    useEffect(() => {
        gsap.fromTo(
            underlineRef.current,
            { width: "0%" },
            { width: "100%", duration: 1, ease: "power2.out" }
        );

        if (!isFilledTimesheet && items.length === 0) {
            resetForm();
        }
    }, []);

    const calculateTotalTime = (timeArray) => {
        let totalMinutes = 0;
        for (const time of timeArray) {
            if (time && time.length === 4) {
                const h = parseInt(time.slice(0, 2), 10);
                const m = parseInt(time.slice(2, 4), 10);
                if (!isNaN(h) && !isNaN(m) && h < 24 && m < 60) {
                    totalMinutes += h * 60 + m;
                }
            }
        }

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    };

    const formatTime = (date) =>
        date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });

    const formatDuration = (duration) => {
        let numericValue = duration.replace(/\D/g, "").slice(0, 4);
        if (numericValue.length === 4) {
            return `${numericValue.slice(0, 2)}:${numericValue.slice(2, 4)}`;
        }
        return "00:00";
    };

    const getNextTimeRange = () => {
        if (items.length === 0) return "09:00 AM - 10:00 AM";
        const lastTime = items[items.length - 1].timeRange.split(" - ")[1];
        const [time, period] = lastTime.split(" ");
        let [hour, minute] = time.split(":").map(Number);
        if (period === "PM" && hour !== 12) hour += 12;
        if (period === "AM" && hour === 12) hour = 0;
        const start = new Date(0, 0, 0, hour, minute);
        const end = new Date(start.getTime() + 60 * 60000);
        return `${formatTime(start)} - ${formatTime(end)}`;
    };

    const addTimelineItem = (type) => {
        if (isFilledTimesheet) {
            toast.error("Cannot modify an already submitted timesheet");
            return;
        }

        const newItem = {
            timeRange: getNextTimeRange(),
            duration: "01:00",
            type,
            bucket: type,
        };

        setItems((prev) => [...prev, newItem]);

        const newDuration = "0100";
        setTodayHours((prev) => {
            const updatedHours = [...prev, newDuration];
            setTimeout(() => {
                setTotalTime(calculateTotalTime(updatedHours));
            }, 0);
            return updatedHours;
        });

        setTimeout(() => {
            const newIndex = items.length;
            const lastRow = rowRefs.current[newIndex];
            if (lastRow) {
                gsap.fromTo(
                    lastRow,
                    { opacity: 0, y: 10 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            }
        }, 0);
    };

    const updateItem = (index, field, value) => {
        if (isFilledTimesheet) {
            toast.error("Cannot modify an already submitted timesheet");
            return;
        }

        const updated = [...items];
        updated[index][field] = value;
        setItems(updated);
    };

    const handleDurationChange = (index, value) => {
        if (isFilledTimesheet) {
            toast.error("Cannot modify an already submitted timesheet");
            return;
        }

        let formattedDuration = formatDuration(value);
        updateItem(index, "duration", formattedDuration);

        const numericValue = value.replace(/\D/g, "").slice(0, 4).padStart(4, '0');
        setTodayHours(prev => {
            const updated = [...prev];
            updated[index] = numericValue;
            setTimeout(() => {
                setTotalTime(calculateTotalTime(updated));
            }, 0);
            return updated;
        });
    };

    const deleteItem = (index) => {
        if (isFilledTimesheet) {
            toast.error("Cannot modify an already submitted timesheet");
            return;
        }

        setItems(prev => {
            const updated = [...prev];
            updated.splice(index, 1);
            return updated;
        });

        setTodayHours(prev => {
            const updated = [...prev];
            updated.splice(index, 1);
            setTimeout(() => {
                setTotalTime(calculateTotalTime(updated));
            }, 0);
            return updated;
        });
    };

    const handleSubmit = async () => {
        if (isFilledTimesheet) {
            toast.error("This timesheet has already been submitted");
            return;
        }

        const payload = {
            date,
            projectName,
            items: items.map(item => ({
                timeRange: item.timeRange,
                task: item.task,
                type: item.type,
                duration: item.duration,
                bucket: item.bucket,
            })),
            notifiedManagers: selectedManagers,
        };

        try {
            const response = await axiosInstance.post("/timesheet/store", payload);
            toast.success("Timesheet submitted successfully!");

            // Switch to current date after submission
            const today = new Date();
            const todayDate = today.toISOString().split("T")[0];
            setDate(todayDate);

            // Check if there's a timesheet for the current date
            await checkFilledOrNotTimesheet(todayDate);

        } catch (error) {
            console.error("Error submitting timesheet:", error);
            toast.error(error.response?.data?.message || "Failed to submit timesheet.");
        }
    };

    // Handle Enter key press to move to next input
    const handleKeyDown = (e, type, index, field) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent form submission or newline in textarea
            
            // Determine the next input to focus
            if (type === 'projectName') {
                // If project name, focus on the first task input
                if (items.length > 0 && inputRefs.current.items[0]?.task) {
                    inputRefs.current.items[0].task.focus();
                }
            } else if (type === 'task') {
                // If task, focus on the duration input in the same row
                if (inputRefs.current.items[index]?.duration) {
                    inputRefs.current.items[index].duration.focus();
                }
            } else if (type === 'duration') {
                // If duration, focus on the task input in the next row
                if (index < items.length - 1 && inputRefs.current.items[index + 1]?.task) {
                    inputRefs.current.items[index + 1].task.focus();
                } else {
                    // If it's the last row, focus on the submit button
                    document.getElementById('submit-button')?.focus();
                }
            }
        }
    };

    const handleEditTimesheet = () => router.push("/edittimesheet");
    const handleAddTask = () => router.push("/add-task");

    const totalMinutes = parseInt(totalTime.split(":")[0]) * 60 + parseInt(totalTime.split(":")[1]);
    const isLessThanEightHours = totalMinutes < 480;

    return (
        <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl">
            <Toaster />
            <h2 className="text-2xl font-bold mb-1 relative inline-block text-gray-800">
                <span
                    ref={underlineRef}
                    className="absolute left-0 bottom-0 h-[2px] bg-yellow-500 w-full"
                ></span>
                Add Time
            </h2>
            <span className="text-2xl font-bold text-gray-800">sheet</span>

            <div className="flex justify-end gap-8 mb-4">
                <button onClick={handleEditTimesheet} className="bg-[#018ABE] hover:bg-[#0177a6] text-white font-semibold px-4 py-2 rounded-md">
                    Edit Timesheet
                </button>
                <button onClick={handleAddTask} className="bg-[#018ABE] hover:bg-[#0177a6] text-white font-semibold px-4 py-2 rounded-md">
                    Add Task
                </button>
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
                <div className="flex flex-col w-[200px]">
                    <label className="mb-1 font-medium text-gray-700">Date</label>
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        className="rounded-md p-1.5 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                    />
                </div>

                <div className="flex flex-col w-[260px] relative">
                    <label className="mb-1 font-medium text-gray-700">Select Manager</label>
                    <button
                        onClick={() => !isFilledTimesheet && setShowDropdown(!showDropdown)}
                        className={`border border-gray-300 rounded-md px-4 py-2 flex items-center justify-between ${isFilledTimesheet ? 'bg-gray-100 cursor-not-allowed' : 'cursor-pointer'}`}
                        disabled={isFilledTimesheet}
                    >
                        <span className="text-sm text-gray-800">{`All Selected (${selectedManagers.length})`}</span>
                        <FiChevronDown className="text-gray-600 text-lg" />
                    </button>
                    {showDropdown && !isFilledTimesheet && (
                        <div className="absolute top-full mt-1 bg-white border border-gray-200 rounded-md w-full z-10">
                            {["Awab Fakih"].map((managerName) => (
                                <label key={managerName} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                                    <input
                                        className="w-5 h-5 text-blue-600"
                                        type="checkbox"
                                        checked={selectedManagers.includes(managerName)}
                                        onChange={() =>
                                            setSelectedManagers((prev) =>
                                                prev.includes(managerName)
                                                    ? prev.filter((m) => m !== managerName)
                                                    : [...prev, managerName]
                                            )
                                        }
                                    />
                                    {managerName}
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => addTimelineItem("Meeting")}
                        className={`px-4 py-2 rounded-lg ${isFilledTimesheet ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white'}`}
                        disabled={isFilledTimesheet}
                    >
                        Add Meeting
                    </button>
                    <button
                        onClick={() => addTimelineItem("Miscellaneous")}
                        className={`px-4 py-2 rounded-lg ${isFilledTimesheet ? 'bg-gray-400 cursor-not-allowed' : 'bg-black text-white'}`}
                        disabled={isFilledTimesheet}
                    >
                        Add Miscellaneous
                    </button>
                </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
                <label className="text-sm font-medium text-gray-800">Project Name</label>
                <input
                    type="text"
                    placeholder="Project name"
                    value={projectName}
                    onChange={(e) => !isFilledTimesheet && setProjectName(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e, 'projectName')}
                    ref={el => inputRefs.current.projectName = el}
                    className={`border border-gray-400 rounded-md px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${isFilledTimesheet ? 'bg-gray-100' : ''}`}
                    readOnly={isFilledTimesheet}
                />
            </div>

            <div className="rounded-md overflow-x-auto mb-4 border-t-2 border-[#018ABE]">
                <table className="w-full table-auto border-collapse rounded-lg">
                    <thead>
                        <tr className="bg-[#018ABE] text-white text-left">
                            <th className="px-4 py-2 w-[12%]">Bucket</th>
                            <th className="px-4 py-2 border-l border-r w-[40%] border-white">Task</th>
                            <th className="px-4 py-2 border-l border-r w-[20%] border-white">Time</th>
                            <th className="px-4 py-2 border-l border-r w-[10%] border-white">Duration</th>
                            <th className="px-4 py-2 border-l border-r border-white w-[5%]">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr
                                key={index}
                                ref={(el) => (rowRefs.current[index] = el)}
                                className="hover:bg-gray-100"
                            >
                                <td className="px-4 py-2 border-4 border-white">
                                    <textarea
                                        className={`w-full h-10 pl-4 border border-gray-500 rounded p-1 resize-none overflow-hidden ${isFilledTimesheet ? 'bg-gray-100' : ''}`}
                                        readOnly
                                        value={item.bucket}
                                    />
                                </td>
                                <td className="px-4 py-2 border-4 border-white">
                                    <textarea
                                        className={`w-full h-10 pl-4 border border-gray-500 rounded p-1 resize-none overflow-hidden ${isFilledTimesheet ? 'bg-gray-100' : ''}`}
                                        value={item.task}
                                        onChange={(e) => updateItem(index, "task", e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, 'task', index)}
                                        ref={(el) => {
                                            if (inputRefs.current.items[index]) {
                                                inputRefs.current.items[index].task = el;
                                            }
                                        }}
                                        readOnly={isFilledTimesheet}
                                    />
                                </td>
                                <td className="px-4 py-2 border-4 border-white">
                                    <textarea
                                        className={`w-full h-10 pl-4 border border-gray-500 rounded p-1 resize-none overflow-hidden ${isFilledTimesheet ? 'bg-gray-100' : ''}`}
                                        readOnly
                                        value={item.timeRange}
                                    />
                                </td>
                                <td className="px-4 py-2 border-4 border-white">
                                    <input
                                        type="text"
                                        value={item.duration}
                                        onChange={(e) => handleDurationChange(index, e.target.value)}
                                        onKeyDown={(e) => handleKeyDown(e, 'duration', index)}
                                        ref={(el) => {
                                            if (inputRefs.current.items[index]) {
                                                inputRefs.current.items[index].duration = el;
                                            }
                                        }}
                                        className={`border border-black rounded px-2 py-1 w-20 text-center ${isFilledTimesheet ? 'bg-gray-100' : ''}`}
                                        readOnly={isFilledTimesheet}
                                    />
                                </td>
                                <td className="px-4 py-2 text-black text-center">
                                    <button
                                        onClick={() => deleteItem(index)}
                                        aria-label="Delete item"
                                        className={isFilledTimesheet ? 'opacity-30 cursor-not-allowed' : ''}
                                        disabled={isFilledTimesheet}
                                    >
                                        <AiFillDelete className="text-lg hover:text-red-700" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-gray-100 font-semibold">
                            <td className="px-4 py-2 text-center" colSpan={3}>
                                Total Hours
                            </td>
                            <td className="px-4 py-2 text-center border-2 border-white">
                                <span className={`px-2 py-1 rounded ${isLessThanEightHours ? "bg-[#fc6a5d] text-black" : "bg-[#61c973] text-black"}`}>
                                    {totalTime}
                                </span>
                            </td>
                            <td className="px-4 py-2"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center items-center gap-4 mb-6">
                <button
                    id="submit-button"
                    onClick={handleSubmit}
                    className={`px-6 py-2 rounded-lg ${isFilledTimesheet ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#018ABE] text-white'}`}
                    disabled={isFilledTimesheet}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}