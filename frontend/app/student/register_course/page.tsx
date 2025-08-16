'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Home, Book, CalendarCheck2, FileText, Layers } from 'lucide-react';

export default function RegisterCourse() {
  const [availableCourses, setAvailableCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [registeredCourses, setRegisteredCourses] = useState<any[]>([]);
  const [studentId, setStudentId] = useState<string | null>(null);

  // Fetch logged-in user's ObjectId
  useEffect(() => {
    fetch('http://localhost:5000/api/auth/whoami', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setStudentId(data._id));
  }, []);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses/all')
      .then(res => res.json())
      .then(data => setAvailableCourses(data.courses || []));
  }, []);

  useEffect(() => {
    if (studentId) {
      fetch(`http://localhost:5000/api/registrations/student/${studentId}`)
        .then(res => res.json())
        .then(data => setRegisteredCourses(data.courses || []));
    }
  }, [studentId]);

  const handleRegister = async () => {
    if (!selectedCourse || !studentId) return alert('Select a course and ensure you are logged in!');
    const res = await fetch('http://localhost:5000/api/registrations/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, courseId: selectedCourse }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('Course registered!');
      setRegisteredCourses([...registeredCourses, availableCourses.find(c => c._id === selectedCourse)]);
      setSelectedCourse('');
    } else {
      alert(data.message || 'Failed to register');
    }
  };

  // Filter already registered courses
  const availableToRegister = availableCourses.filter(
    course => !registeredCourses.some(reg => reg._id === course._id)
  );

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2 hover:text-purple-600"><Home className="text-pink-500" /> Dashboard</Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600"><Book className="text-green-500" /> View Marks</Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600"><CalendarCheck2 className="text-blue-500" /> Attendance</Link>
          <Link href="/student/exams" className="flex items-center gap-2 hover:text-purple-600"><FileText className="text-orange-500" /> Exams</Link>
          <Link href="/student/register_course" className="flex items-center gap-2 text-purple-600 font-semibold"><Layers className="text-indigo-500" /> Register Course</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Register for Courses</h1>
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-10 max-w-xl">
          <label className="block text-lg font-medium text-gray-800 mb-2">Select a course:</label>
          <select
            value={selectedCourse}
            onChange={e => setSelectedCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          >
            <option value="">-- Choose a course --</option>
            {availableToRegister.map(course => (
              <option key={course._id} value={course._id}>
                {course.title} ({course.code})
              </option>
            ))}
          </select>
          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-lg shadow hover:from-pink-500 hover:to-purple-500"
          >
            Register Course
          </button>
          {availableToRegister.length === 0 && (
            <p className="text-pink-600 mt-2">You have registered for all available courses.</p>
          )}
        </div>
        {/* Registered Courses */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 max-w-xl">
          <h2 className="text-xl font-semibold mb-4 text-purple-800">Registered Courses</h2>
          {registeredCourses.length === 0 ? (
            <p className="text-gray-600">No courses registered yet.</p>
          ) : (
            <ul className="list-disc pl-6 space-y-2 text-gray-800">
              {registeredCourses.map((course, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  📘 {course.title} ({course.code})
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
