'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type Log = {
  message: string;
  timestamp: string;
  user: string;
  category: string;
};

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStudents: 0,
    activeCourses: 0,
    recentEnrollments: 0,
  });
  const [logs, setLogs] = useState<Log[]>([]);
  const [scores, setScores] = useState<{ course: string; avgScore: number }[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [usersRes, coursesRes, logsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/admin/users'),
          axios.get('http://localhost:5000/api/courses/all', { withCredentials: true }),
          axios.get('http://localhost:5000/api/logs', { withCredentials: true }),
        ]);

        const users = usersRes.data;
        const courses = coursesRes.data.courses;
        const studentCount = users.filter((u: any) => u.role === 'student').length;
        const recentEnrollments = courses.reduce(
          (sum: number, course: any) => sum + (course.enrolledUsers?.length || 0),
          0
        );

        setStats({
          totalUsers: users.length,
          totalStudents: studentCount,
          activeCourses: courses.filter((c: any) => c.status === 'Active').length,
          recentEnrollments,
        });

        setLogs(
          logsRes.data.logs.map((log: any) => ({
            message: log.message,
            timestamp: new Date(log.timestamp).toLocaleString(),
            user: log.user?.name ? `${log.user.name} (${log.user.role})` : 'Unknown',
            category: log.category,
          }))
        );

        // Score Calculation
        const scoreMap: Record<string, { total: number; count: number }> = {};
        courses.forEach((course: any) => {
          if (Array.isArray(course.enrolledUsers)) {
            course.enrolledUsers.forEach((user: any) => {
              if (user.score !== undefined && typeof user.score === 'number') {
                if (!scoreMap[course.title]) {
                  scoreMap[course.title] = { total: 0, count: 0 };
                }
                scoreMap[course.title].total += user.score;
                scoreMap[course.title].count += 1;
              }
            });
          }
        });

        const avgScores = Object.entries(scoreMap).map(([course, { total, count }]) => ({
          course,
          avgScore: count ? Math.round(total / count) : 0,
        }));

        setScores(avgScores);
      } catch (err) {
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    }

    setTimeout(fetchData, 1200);
  }, []);

  const dummyScores = [
    { course: 'Python Basics', avgScore: 85 },
    { course: 'Web Dev Bootcamp', avgScore: 72 },
    { course: 'Data Science 101', avgScore: 65 },
    { course: 'AI/ML', avgScore: 90 },
  ];

  const chartData = {
    labels: (scores.length > 0 ? scores : dummyScores).map((s) => s.course),
    datasets: [
      {
        label: 'Average Score',
        data: (scores.length > 0 ? scores : dummyScores).map((s) => s.avgScore),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.3)',
        borderWidth: 3,
        fill: true,
        tension: 0, // Sharp line
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 border-[5px] border-t-transparent border-purple-400 rounded-full animate-spin" />
          <p className="text-purple-500 text-lg font-bold animate-pulse">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-white via-blue-50 to-purple-50 text-[#121717]">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r p-6 bg-white bg-opacity-70 rounded-3xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-center bg-cover border"
            style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBreH1r…')` }}
          />
          <h1 className="text-lg font-semibold text-purple-700">Acme University</h1>
        </motion.div>
        <nav className="flex flex-col gap-2">
          {['Dashboard', 'Users', 'Courses', 'Logs', 'Analytics'].map((label) => {
            const icons: Record<string, string> = {
              Dashboard: '🏠',
              Users: '👥',
              Courses: '📘',
              Logs: '📄',
              Analytics: '📊',
            };
            return (
              <Link key={label} href={`/admin/${label.toLowerCase()}`}>
                <div
                  className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer ${
                    label === 'Dashboard'
                      ? 'bg-gradient-to-r from-purple-200 to-indigo-100 text-purple-900'
                      : ''
                  }`}
                >
                  <span className="text-xl">{icons[label]}</span>
                  <span className="text-sm font-medium">{label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-8">
          Dashboard
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          {[['Total Users', stats.totalUsers], ['Students', stats.totalStudents], ['Active Courses', stats.activeCourses], ['Recent Enrollments', stats.recentEnrollments]].map(
            ([label, value], idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-tr from-purple-100 via-blue-100 to-white rounded-xl p-6 shadow-sm"
              >
                <p className="text-base font-medium text-purple-800">{label}</p>
                <p className="text-3xl font-bold mt-1 text-indigo-700">{value}</p>
              </motion.div>
            )
          )}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Enrollment Chart */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold text-purple-700 mb-4">Enrollment by Course</h2>
            {[
              ['Python Basics', 80],
              ['Web Dev Bootcamp', 60],
              ['Data Science 101', 30],
              ['UI/UX Crash Course', 10],
            ].map(([label, pct], i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between text-sm font-medium text-purple-700 mb-1">
                  <span>{label}</span>
                  <span>{pct}%</span>
                </div>
                <div className="w-full bg-purple-100 rounded-full h-3">
                  <div
                    className="bg-purple-500 h-3 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-lg font-bold text-purple-700 mb-4">Average Score vs Course</h2>
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>

        {/* Logs */}
        <div>
          <h2 className="text-xl font-bold text-purple-700 mb-4">Recent Activities</h2>
          <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {['Message', 'Timestamp', 'User/Role', 'Category'].map((h, i) => (
                    <th key={i} className="px-6 py-3 text-left font-semibold text-gray-700">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                      No recent activity
                    </td>
                  </tr>
                ) : (
                  logs.map((log, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3 text-gray-800">{log.message}</td>
                      <td className="px-6 py-3 text-gray-600">{log.timestamp}</td>
                      <td className="px-6 py-3 text-gray-600">{log.user}</td>
                      <td className="px-6 py-3">
                        <span className="inline-block bg-purple-100 px-2 py-1 rounded text-xs text-purple-800">
                          {log.category}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
