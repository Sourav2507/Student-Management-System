'use client';

import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, Legend,
} from 'recharts';
import Link from 'next/link';
import {
  Home, User, Book, CalendarCheck2, MapPin, Mail, Hash, School,
} from 'lucide-react';

const pieDataAttendance = [
  { name: 'Present', value: 80 },
  { name: 'Absent', value: 20 },
];

const pieDataTasks = [
  { name: 'Tasks Completed', value: 65 },
  { name: 'Pending', value: 35 },
];

const pieColors = ['#00C49F', '#FF8042'];
const taskColors = ['#a1e3d8', '#ffb3c1'];

const barDataMarks = [
  { name: 'Math', marks: 85 },
  { name: 'Physics', marks: 90 },
  { name: 'CS', marks: 78 },
];

const barDataCGPA = [
  { name: 'Sem 1', cgpa: 8.4 },
  { name: 'Sem 2', cgpa: 8.7 },
  { name: 'Sem 3', cgpa: 9.0 },
];

const lineDataAttendance = [
  { date: 'Jul 1', value: 1 },
  { date: 'Jul 2', value: 0 },
  { date: 'Jul 3', value: 1 },
  { date: 'Jul 4', value: 1 },
];

const lineDataMonthly = [
  { month: 'Jan', value: 1 },
  { month: 'Feb', value: 0 },
  { month: 'Mar', value: 1 },
  { month: 'Apr', value: 1 },
];

const student = {
  name: 'Deepa Pal',
  email: 'deepa@example.com',
  department: 'Computer Science',
  rollNo: 'CSE2021-123',
};

export default function StudentDashboard() {
  return (
    <div className="flex min-h-screen font-sans bg-gradient-to-tr from-sky-100 via-purple-100 to-pink-100 text-gray-900">

      {/* Sidebar */}
      <aside className="w-60 bg-white shadow-xl border-r border-gray-200 flex flex-col p-6 space-y-4">
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Menu</h2>
        <nav className="flex flex-col gap-4">
          <Link href="/student/student_dashboard" className="flex items-center gap-2 text-purple-600 font-semibold">
            <Home className="text-pink-500" /> Dashboard
          </Link>
          
          <Link href="/student/view_marks" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-green-500" /> View Marks
          </Link>
          <Link href="/student/view_attendence" className="flex items-center gap-2 hover:text-purple-600">
            <CalendarCheck2 className="text-blue-500" /> Attendance
          </Link>
          <Link href="/student/Exams" className="flex items-center gap-2 hover:text-purple-600">
            <Book className="text-orange-500" /> Exams
          </Link>
          <Link href="/student/attendence" className="flex items-center gap-2 hover:text-purple-600">
            <MapPin className="text-red-500" /> Attendance
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
              <span><strong>Name:</strong> {student.name}</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="text-pink-500" />
              <span><strong>Email:</strong> {student.email}</span>
            </li>
            <li className="flex items-center gap-3">
              <School className="text-green-500" />
              <span><strong>Department:</strong> {student.department}</span>
            </li>
            <li className="flex items-center gap-3">
              <Hash className="text-yellow-500" />
              <span><strong>Roll No:</strong> {student.rollNo}</span>
            </li>
          </ul>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Attendance Overview Pie */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Attendance Overview</h2>
            <PieChart width={250} height={200}>
              <Pie data={pieDataAttendance} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieDataAttendance.map((entry, index) => (
                  <Cell key={`a-${index}`} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* Marks in Subjects Bar */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Marks in Subjects</h2>
            <BarChart width={300} height={200} data={barDataMarks}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="marks" fill="#82ca9d" />
            </BarChart>
          </div>

          {/* Attendance Line */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Daily Attendance (Last 4 Days)</h2>
            <LineChart width={300} height={200} data={lineDataAttendance}>
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
              <Pie data={pieDataTasks} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                {pieDataTasks.map((entry, index) => (
                  <Cell key={`t-${index}`} fill={taskColors[index % taskColors.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>

          {/* CGPA Bar Chart */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">CGPA by Semester</h2>
            <BarChart width={300} height={200} data={barDataCGPA}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="cgpa" fill="#b794f4" />
            </BarChart>
          </div>

          {/* Monthly Attendance Line */}
          <div className="bg-white p-4 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Attendance (Monthly)</h2>
            <LineChart width={300} height={200} data={lineDataMonthly}>
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
