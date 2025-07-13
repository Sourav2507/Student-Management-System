'use client';

import { useState } from 'react';
import { User, Home, Book, CalendarCheck2, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const initialAttendance = [
  { date: '2025-07-01', status: 'Present' },
  { date: '2025-07-02', status: 'Absent' },
  { date: '2025-07-03', status: 'Present' },
];

const COLORS = ['#a1e3d8', '#ffb3c1'];

export default function ViewAttendance() {
  const [attendance, setAttendance] = useState(initialAttendance);

  const handleGiveAttendance = () => {
    const today = new Date().toISOString().split('T')[0];
    const alreadyMarked = attendance.find((entry) => entry.date === today);
    if (!alreadyMarked) {
      setAttendance([...attendance, { date: today, status: 'Present' }]);
    } else {
      alert('Attendance already marked for today!');
    }
  };

  const pieData = [
    {
      name: 'Present',
      value: attendance.filter((a) => a.status === 'Present').length,
    },
    {
      name: 'Absent',
      value: attendance.filter((a) => a.status === 'Absent').length,
    },
  ];

  const lineData = attendance.map((a) => ({
    date: a.date,
    value: a.status === 'Present' ? 1 : 0,
  }));

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-br from-sky-100 via-pink-100 to-purple-100 text-gray-900">
      
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
          <Link href="/student/view_attendence" className="flex items-center gap-2 text-purple-600 font-semibold">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/Exams" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-orange-500" /> Exams
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-700">View Attendance</h1>
          <button
            onClick={handleGiveAttendance}
            className="bg-gradient-to-r from-purple-400 to-pink-400 hover:from-pink-500 hover:to-purple-500 text-white px-4 py-2 rounded-lg shadow flex items-center gap-2"
          >
            <Plus size={18} /> Give Attendance
          </button>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow p-4 mb-8">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-purple-100 text-purple-800">
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {attendance.map((entry, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{entry.date}</td>
                  <td
                    className={`px-4 py-2 font-semibold ${
                      entry.status === 'Present' ? 'text-green-600' : 'text-red-500'
                    }`}
                  >
                    {entry.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pie Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Attendance Percentage</h2>
            <PieChart width={300} height={200}>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} label dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Line Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Daily Attendance Chart</h2>
            <LineChart width={350} height={200} data={lineData}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>
        </div>
      </main>
    </div>
  );
}
