'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import Link from 'next/link';
import {
  Home, User, Book, CalendarCheck2, Mail, Hash, School, Layers
} from 'lucide-react';

export default function StudentDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Ensure rendering happens only on client to avoid SSR mismatch
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    fetch('http://localhost:5000/api/student/dashboard', {
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 401) {
          router.push('/authorization/login');
          return null;
        }
        return res.json();
      })
      .then(json => {
        if (json) setData(json);
      })
      .catch(() => router.push('/authorization/login'))
      .finally(() => setLoading(false));
  }, [router, isClient]);

  // Avoid hydration mismatch — don't render anything until on client
  if (!isClient) return null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col gap-4">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-purple-500 animate-pulse">Loading Dashboard...</p>
      </div>
    );
  }

  if (!data) return null;

  const pieColors = ['#00C49F', '#FF8042'];
  const taskColors = ['#a1e3d8', '#ffb3c1'];

  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-tr from-sky-100 via-purple-100 to-pink-100 text-gray-900">

      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/dashboard" className="flex items-center gap-2 text-purple-600 font-semibold">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
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

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6 text-purple-700">Welcome to Student Dashboard</h1>

        {/* Profile Card */}
        <div className="bg-white bg-opacity-90 rounded-xl shadow-lg p-6 max-w-xl mb-10">
          <ul className="text-lg space-y-4">
            <li className="flex items-center gap-3">
              <User className="text-purple-500" />
              <span><strong>Name:</strong> {data.student.name}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-pink-500" />
              <span><strong>Email:</strong> {data.student.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <School className="text-green-500" />
              <span><strong>Department:</strong> {data.student.department}</span>
            </li>
            <li className="flex items-center gap-3">
              <Hash className="text-yellow-500" />
              <span><strong>Roll No:</strong> {data.student.rollNo}</span>
            </li>
          </ul>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Attendance Overview Pie */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
            <PieChart width={250} height={200}>
              <Pie data={data.attendance} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {data.attendance.map((entry: any, index: number) => (
                  <Cell key={`a-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Marks in Subjects Bar */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Marks in Subjects</h2>
            <BarChart width={300} height={200} data={data.marks}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#82ca9d" />
            </BarChart>
          </div>

          {/* Daily Attendance Line */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Daily Attendance (Last 4 Days)</h2>
            <LineChart width={300} height={200} data={data.dailyAttendance}>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </div>

          {/* Task Completion Pie */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Task Completion</h2>
            <PieChart width={250} height={200}>
              <Pie data={data.tasks} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {data.tasks.map((entry: any, index: number) => (
                  <Cell key={`t-${index}`} fill={taskColors[index % taskColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* CGPA Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">CGPA by Semester</h2>
            <BarChart width={300} height={200} data={data.cgpa}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cgpa" fill="#b794f4" />
            </BarChart>
          </div>

          {/* Monthly Attendance Line */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Attendance (Monthly)</h2>
            <LineChart width={300} height={200} data={data.monthlyAttendance}>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#82ca9d" />
            </LineChart>
          </div>
        </div>
      </main>
    </div>
  );
}
