'use client';

import { User, Home, Book, CalendarCheck2, MapPin, FileText } from 'lucide-react';
import Link from 'next/link';

const exams = [
  { subject: 'Maths', date: '2025-08-15', time: '10:00 AM' },
  { subject: 'CSE', date: '2025-08-17', time: '02:00 PM' },
];

export default function Exams() {
  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-pink-100 via-sky-100 to-purple-100 text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/student_dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/Exams" className="flex items-center gap-2 text-purple-600 font-semibold">
            <FileText className="text-orange-500" /> Exams
          </Link>
          
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Upcoming Exams</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exams.map((exam, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-5 border-l-4 border-purple-300 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-purple-800">{exam.subject}</h3>
              <p className="text-gray-700 mt-2">
                📅 <strong>Date:</strong> {exam.date}
              </p>
              <p className="text-gray-700">
                ⏰ <strong>Time:</strong> {exam.time}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
