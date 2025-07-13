'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Home, User, Book, CalendarCheck2, MapPin, FileText, Layers } from 'lucide-react';

const availableCourses = ['Data Structures', 'Operating Systems', 'DBMS', 'Computer Networks', 'Machine Learning'];

export default function RegisterCourse() {
  const [selectedCourse, setSelectedCourse] = useState('');
  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);

  const handleRegister = () => {
    if (selectedCourse && !registeredCourses.includes(selectedCourse)) {
      setRegisteredCourses([...registeredCourses, selectedCourse]);
      setSelectedCourse('');
    } else if (registeredCourses.includes(selectedCourse)) {
      alert('Course already registered!');
    }
  };

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-purple-100 via-pink-100 to-sky-100 text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/exams" className="flex items-center gap-2 hover:text-purple-600">
            <FileText className="text-orange-500" /> Exams
          </Link>
          <Link href="/student/register_course" className="flex items-center gap-2 text-purple-600 font-semibold">
            <Layers className="text-indigo-500" /> Register Course
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Register for Courses</h1>

        {/* Course Registration */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-md p-6 mb-10 max-w-xl">
          <label className="block text-lg font-medium text-gray-800 mb-2">Select a course:</label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          >
            <option value="">-- Choose a course --</option>
            {availableCourses.map((course, idx) => (
              <option key={idx} value={course}>
                {course}
              </option>
            ))}
          </select>

          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-purple-400 to-pink-400 text-white px-4 py-2 rounded-lg shadow hover:from-pink-500 hover:to-purple-500"
          >
            Register Course
          </button>
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
                  📘 {course}
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
