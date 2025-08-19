'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { Home, CalendarCheck, BookOpen, ClipboardList, Megaphone } from "lucide-react";

interface Course {
  _id: string;
  code: string;
  title: string;
}
interface AttendanceRecord {
  _id: string;
  course: { _id: string; title: string; code: string };
  date: string;
  startTime: string;
  endTime: string;
  present: { _id: string; name: string; roll: string }[];
}

export default function AttendancePage() {
  const [loggedInUser, setLoggedInUser] = useState<{_id: string, username: string, role: string} | null>(null);
  const [coursesList, setCoursesList] = useState<Course[]>([]);
  const [attendanceList, setAttendanceList] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  // Form state
  const [courseId, setCourseId] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  useEffect(() => {
    const fetchAll = async () => {
      try {
        // Get user info
        const userRes = await fetch("http://localhost:5000/api/auth/whoami", { credentials: "include" });
        const userData = await userRes.json();
        if (userRes.ok) {
          setLoggedInUser(userData);

          // Fetch courses assigned to this faculty
          if (userData.role === "faculty") {
            const coursesRes = await fetch(
              `http://localhost:5000/api/courses/faculty/${userData._id}`,
              { credentials: "include" }
            );
            const coursesData = await coursesRes.json();
            setCoursesList(coursesData.courses || []);
          }
        }

        // Fetch attendance sessions created by this faculty
        const attRes = await fetch('http://localhost:5000/api/attendance/created_by_me', { credentials: 'include' });
        const attData = await attRes.json();
        setAttendanceList(Array.isArray(attData) ? attData : []);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [submitting]);

  const handleCreateAttendance = async () => {
    if (!courseId || !date || !startTime || !endTime) {
      alert("Please fill all fields!");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/attendance/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ courseId, date, startTime, endTime }),
      });
      if (res.ok) {
        alert("Attendance session created!");
        setCourseId('');
        setDate('');
        setStartTime('');
        setEndTime('');
      } else {
        const data = await res.json();
        alert(`Error: ${data.error || "Couldn't create attendance session"}`);
      }
    } catch (err) {
      alert("Error creating session");
    } finally {
      setSubmitting(false);
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/faculty/dashboard", icon: <Home size={18} /> },
    { label: "Add Attendance", href: "/faculty/attendance", icon: <ClipboardList size={18} /> },
    { label: "Create Exams", href: "/faculty/exams", icon: <CalendarCheck size={18} /> },
    { label: "View Submissions", href: "/faculty/submissions", icon: <BookOpen size={18} /> },
    { label: "Add Announcements", href: "/faculty/announcements", icon: <Megaphone size={18} /> },
  ];

  if (loading || submitting) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col gap-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-blue-500 animate-pulse">
          {submitting ? "Submitting..." : "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex font-sans bg-white text-[#121717] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/a-/AOh14Gg6EXAMPLE')" }}
          />
          <h1 className="text-lg font-semibold">Faculty Panel</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                item.href === "/faculty/attendance"
                  ? "bg-gray-100"
                  : "hover:bg-gray-100 hover:scale-[1.02]"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        {loggedInUser && (
          <p className="text-sm text-gray-500 mb-2">
            Logged in as:{" "}
            <span className="font-medium">{loggedInUser.username}</span>
          </p>
        )}
        <h1 className="text-3xl font-bold mb-6">Add Attendance</h1>
        {/* Attendance Creation Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 max-w-xl">
          <h2 className="text-lg font-semibold mb-4">Create Attendance Session</h2>
          <div className="flex flex-col gap-4">
            <select
              value={courseId}
              onChange={e => setCourseId(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">Select Course</option>
              {coursesList.map(courseObj => (
                <option key={courseObj._id} value={courseObj._id}>
                  {courseObj.title} ({courseObj.code})
                </option>
              ))}
            </select>
            <input
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
              className="border p-2 rounded"
            />
            <div className="flex gap-4">
              <input
                type="time"
                value={startTime}
                onChange={e => setStartTime(e.target.value)}
                className="border p-2 rounded w-full"
              />
              <input
                type="time"
                value={endTime}
                onChange={e => setEndTime(e.target.value)}
                className="border p-2 rounded w-full"
              />
            </div>
            <button
              onClick={handleCreateAttendance}
              className="self-end bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700"
              disabled={submitting}
            >
              {submitting ? "Creating..." : "Create Attendance Slot"}
            </button>
          </div>
        </div>
        {/* Attendance Sessions Table */}
        <h2 className="text-xl font-bold mb-4">Your Attendance Sessions</h2>
        <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
          <table className="w-full table-auto text-sm">
            <thead>
              <tr className="bg-blue-50">
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Start</th>
                <th className="px-4 py-2">End</th>
                <th className="px-4 py-2">Present Count</th>
              </tr>
            </thead>
            <tbody>
              {attendanceList.length === 0
                ? <tr><td colSpan={5} className="py-4 text-center text-gray-500">No attendance sessions created yet.</td></tr>
                : attendanceList.map(a => (
                  <tr key={a._id} className="border-t">
                    <td className="px-4 py-2">{a.course?.title || 'N/A'}</td>
                    <td className="px-4 py-2">{a.date}</td>
                    <td className="px-4 py-2">{a.startTime}</td>
                    <td className="px-4 py-2">{a.endTime}</td>
                    <td className="px-4 py-2 font-bold text-blue-700">{a.present?.length || 0}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
