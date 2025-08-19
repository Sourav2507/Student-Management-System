'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, Book, CalendarCheck2, Layers, Plus } from "lucide-react";

interface AttendanceSlot {
  _id: string;
  course: { title: string; code: string };
  date: string;
  startTime: string;
  endTime: string;
  present: string[];
}

export default function AllAttendanceSlotsStudent() {
  const [slots, setSlots] = useState<AttendanceSlot[]>([]);
  const [loading, setLoading] = useState(true);
  const [markingId, setMarkingId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllSlots() {
      const res = await fetch('http://localhost:5000/api/attendance/all_slots', { credentials: 'include' });
      const data = await res.json();
      setSlots(Array.isArray(data) ? data : []);
      setLoading(false);
    }
    fetchAllSlots();
  }, []);

  // Button handler
  const handleMarkAttendance = async (slot: AttendanceSlot) => {
    setMarkingId(slot._id);
    const res = await fetch('http://localhost:5000/api/attendance/mark', {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attendanceId: slot._id })
    });
    const data = await res.json();
    if (res.ok) {
      alert(data.message || "Attendance marked!");
      window.location.reload();
    } else {
      alert(data.error || "Failed to mark attendance.");
    }
    setMarkingId(null);
  };

  // Helper to check if now is inside this slot's window
  function isSlotActive(slot: AttendanceSlot) {
    const now = new Date();
    const start = new Date(`${slot.date}T${slot.startTime}`);
    const end = new Date(`${slot.date}T${slot.endTime}`);
    return now >= start && now <= end;
  }

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-sky-100 via-pink-100 to-purple-100 text-gray-900">
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 text-purple-600 font-semibold">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/exams" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-orange-500" /> Exams
          </Link>
          <Link href="/student/register_course" className="flex items-center gap-2 text-black font-normal">
            <Layers className="text-indigo-500" /> Register Course
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-8">All Attendance Slots</h1>
        {loading ? (
          <div className="text-lg font-medium text-gray-500 py-10">Loading...</div>
        ) : slots.length === 0 ? (
          <div className="text-lg font-medium text-gray-500 py-10">No attendance slots found.</div>
        ) : (
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            {slots.map(slot => {
              const active = isSlotActive(slot);
              return (
                <div key={slot._id} className="bg-white rounded-xl shadow-md border p-6 flex flex-col items-start">
                  <div className="font-semibold text-purple-700 text-lg mb-1">{slot.course?.title} <span className="text-gray-500 text-xs">({slot.course?.code})</span></div>
                  <div className="text-sm text-gray-600 mb-1">Date: <span className="font-semibold">{slot.date}</span></div>
                  <div className="text-sm text-gray-600 mb-1">Time: <span className="font-semibold">{slot.startTime} - {slot.endTime}</span></div>
                  <div className="text-sm text-gray-600 mb-1">Present Count: <span className="font-bold">{slot.present?.length || 0}</span></div>
                  <button
                    disabled={!active || markingId === slot._id}
                    onClick={() => handleMarkAttendance(slot)}
                    className={`mt-4 px-4 py-2 rounded-full font-semibold flex items-center gap-2 shadow ${
                      active
                        ? "bg-gradient-to-r from-purple-400 to-pink-400 text-white hover:opacity-90"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <Plus size={18} />
                    {active
                      ? markingId === slot._id
                        ? "Marking..."
                        : "Mark Attendance"
                      : "Mark Attendance (Unavailable)"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
