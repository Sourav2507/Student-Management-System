'use client';

import { useMemo } from 'react';
import { Home, User, Book, CalendarCheck2, MapPin, FileText } from 'lucide-react';
import Link from 'next/link';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';

const mockMarks = [
  { subject: 'Maths', marks: 88 },
  { subject: 'Physics', marks: 92 },
  { subject: 'CSE', marks: 85 },
];

function calculateGrade(marks: number) {
  if (marks >= 90) return 'A+';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B+';
  if (marks >= 60) return 'B';
  if (marks >= 50) return 'C';
  return 'F';
}

export default function ViewMarks() {
  const marksWithGrade = useMemo(() =>
    mockMarks.map((item) => ({
      ...item,
      outOf: 100,
      grade: calculateGrade(item.marks),
    })), []);

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-sky-100 via-purple-100 to-pink-100 text-gray-900">
      
      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/student_dashboard" className="flex items-center gap-2 hover:text-purple-600">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 text-purple-600 font-semibold">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/Exams" className="flex items-center gap-2 hover:text-purple-600">
            <FileText className="text-orange-500" /> Exams
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Your Marks</h1>

        {/* Marks Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow p-4 mb-10">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="px-4 py-2 text-left">Subject</th>
                <th className="px-4 py-2 text-left">Marks</th>
                <th className="px-4 py-2 text-left">Out of</th>
                <th className="px-4 py-2 text-left">Grade</th>
              </tr>
            </thead>
            <tbody>
              {marksWithGrade.map((item, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{item.subject}</td>
                  <td className="px-4 py-2 text-blue-700 font-medium">{item.marks}</td>
                  <td className="px-4 py-2 text-gray-600">{item.outOf}</td>
                  <td className="px-4 py-2 font-bold text-green-600">{item.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Subject-wise Marks</h2>
            <BarChart width={300} height={200} data={mockMarks}>
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#a78bfa" />
            </BarChart>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Performance Trend</h2>
            <LineChart width={300} height={200} data={mockMarks}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="subject" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="marks" stroke="#ec4899" />
            </LineChart>
          </div>
        </div>
      </main>
    </div>
  );
}
