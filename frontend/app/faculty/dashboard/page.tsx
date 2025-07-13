'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Bar, Pie, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

export default function FacultyDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/whoami', {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(data => {
        if (data.username) setUser(data);
      })
      .catch(err => {
        console.error('❌ Backend error:', err);
      });
  }, []);

  // Show loader while fetching user
  if (user === null) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white flex-col gap-4">
        <div className="w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold text-blue-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  // Chart Data
  const barData = {
    labels: ['DSA', 'OS', 'DBMS', 'AI', 'CN'],
    datasets: [
      {
        data: [2, 1, 3, 0, 1],
        backgroundColor: '#60a5fa',
        borderRadius: 6,
      },
    ],
  };

  const pieData = {
    labels: ['DSA', 'OS', 'DBMS', 'AI', 'CN'],
    datasets: [
      {
        data: [40, 30, 50, 20, 25],
        backgroundColor: ['#4ade80', '#60a5fa', '#facc15', '#f472b6', '#a78bfa'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [82, 78, 85, 90, 87, 88, 91],
        fill: true,
        backgroundColor: 'rgba(96, 165, 250, 0.2)',
        borderColor: '#3b82f6',
        pointBackgroundColor: '#3b82f6',
        tension: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-[#121717]">
      {/* Horizontal layout: Sidebar + Main */}
      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
          <div className="flex items-center gap-3 mb-8">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
              style={{
                backgroundImage: "url('https://lh3.googleusercontent.com/a-/AOh14GhLDegKYoF3...')",
              }}
            ></div>
            <h1 className="text-lg font-semibold">
              {user ? `${user.username}'s Panel` : 'Faculty Panel'}
            </h1>
          </div>
          <nav className="flex flex-col gap-2">
            {[
              { label: 'Dashboard', icon: '🏠', href: '/faculty/dashboard' },
              { label: 'Add/Update Marks', icon: '📝', href: '/faculty/marks' },
              { label: 'Add Attendance', icon: '📋', href: '/faculty/attendance' },
              { label: 'Create Exams', icon: '🗓️', href: '/faculty/exams' },
              { label: 'View Submissions', icon: '📑', href: '/faculty/submissions' },
              { label: 'Add Announcements', icon: '📢', href: '/faculty/announcements' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${i === 0 ? 'bg-gray-100' : 'hover:bg-gray-100 hover:scale-[1.02]'
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-7">
            {`Hello ${user.username}, welcome to Faculty Dashboard`}
          </h1>

          <h2 className="text-xl font-semibold mt-6 mb-4">Overview</h2>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { label: 'Total Courses', value: 5 },
              { label: 'Exams Scheduled', value: 7 },
              { label: 'Students Taught', value: 150 },
              { label: 'Pending Submissions', value: 12 },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 hover:scale-[1.03]"
              >
                <p className="text-sm text-gray-600">{stat.label}</p>
                <h3 className="text-xl font-bold">{stat.value}</h3>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Insights</h2>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-2">
            <div className="bg-white p-8 pt-6 pb-10 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 h-[340px] relative overflow-hidden">
              <h2 className="text-lg font-semibold mb-4 text-center">Ongoing Exams per Course</h2>
              <Bar data={barData} options={chartOptions} />
            </div>
            <div className="bg-white p-8 pt-6 pb-10 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 h-[340px] relative overflow-hidden">
              <h2 className="text-lg font-semibold mb-4 text-center">Students per Course</h2>
              <Pie data={pieData} options={chartOptions} />
            </div>
            <div className="bg-white p-8 pt-6 pb-10 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 h-[340px] relative overflow-hidden">
              <h2 className="text-lg font-semibold mb-4 text-center">Monthly Attendance Trend</h2>
              <Line data={lineData} options={chartOptions} />
            </div>
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-4">Quick Actions</h2>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { label: 'Add/Update Marks', img: 'https://cdn-icons-png.flaticon.com/512/3209/3209265.png' },
              { label: 'Add Attendance', img: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
              { label: 'Create Exams', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
              { label: 'View Submissions', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png' },
              { label: 'Add Announcements', img: 'https://cdn-icons-png.flaticon.com/512/1827/1827392.png' },
              { label: 'View Timetable', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828970.png' },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105 text-center cursor-pointer"
              >
                <img src={card.img} alt={card.label} className="w-16 h-16 mx-auto object-contain mb-4" />
                <p className="text-base font-medium text-[#121717]">{card.label}</p>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-200 py-4 px-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Faculty Dashboard. All rights reserved.
      </footer>
    </div>
  );
}
