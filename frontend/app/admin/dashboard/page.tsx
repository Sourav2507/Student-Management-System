'use client';
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1300);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-16 h-16 border-[5px] border-t-transparent border-purple-400 border-solid rounded-full animate-spin"></div>
          <p className="text-purple-500 text-lg font-bold animate-pulse">Loading Dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex font-sans bg-gradient-to-br from-white via-blue-50 to-purple-50 text-[#121717]">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-purple-100 bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-3xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-purple-200"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBreH1rT7yO6QJye8Mv33l0HPptgroCYEv9wAIBQMJWndzu9mFPXp5RgVJ0EpC0W141Y34Nwp7m5-yaqlTajggTeT1KXGhWtm9oGDSSekaorSJyihbhhKPITW381P3ZgESZl60fu2QAjT2S9JPgBD_WwSz6AlfwWr0Lo7WpVIwTwfoA7vZbC5KJXVcGIJp6YBz0Se4XDZKbAFSIz8DVMhok9Iz7y7o5edlhjq-M6YIN7vPvutSIDAi0YP5NKuhsowAOXrqE2oH1cjsl')",
            }}
          ></div>
          <h1 className="text-lg font-semibold text-purple-700">Acme University</h1>
        </motion.div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Dashboard', icon: '🏠', href: '/admin/dashboard' },
            { label: 'Users', icon: '👥', href: '/admin/users' },
            { label: 'Courses', icon: '📘', href: '/admin/courses' },
            { label: 'Logs', icon: '📄', href: '/admin/logs' },
            { label: 'Analytics', icon: '📊', href: '/admin/analytics' },
          ].map((item, i) => (
            <Link href={item.href} key={i}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  item.label === 'Dashboard'
                    ? 'bg-gradient-to-r from-purple-200 to-indigo-100 text-purple-900 shadow-md'
                    : 'hover:bg-purple-100 hover:scale-[1.03] text-gray-700'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gradient-to-bl from-white via-blue-50 to-purple-50 p-10 overflow-y-auto">
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-8"
        >
          Dashboard
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          {[{ label: 'Total Students', value: '1,250' }, { label: 'Active Courses', value: '15' }, { label: 'Recent Enrollments', value: '30' }].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-tr from-purple-100 via-blue-100 to-white rounded-xl p-6 shadow-sm"
            >
              <p className="text-base font-medium text-purple-800">{stat.label}</p>
              <p className="text-3xl font-bold mt-1 text-indigo-700">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Student Progress */}
        <h2 className="text-xl font-bold text-purple-700 mb-4">Student Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Average Grades */}
          <div className="bg-white border border-purple-100 rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <p className="font-medium text-purple-700 mb-2">Average Grades Over Time</p>
            <p className="text-3xl font-bold text-indigo-700">82%</p>
            <div className="flex gap-1 text-sm mt-1">
              <span className="text-gray-600">Last 6 Months</span>
              <span className="text-green-600 font-medium">+5%</span>
            </div>
            <div className="h-36 flex items-center justify-center mt-4 text-sm text-gray-500">
              [Chart Placeholder]
            </div>
          </div>

          {/* Enrollment by Course */}
          <div className="bg-white border border-purple-100 rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <p className="font-medium text-purple-700 mb-2">Enrollment by Course</p>
            <p className="text-3xl font-bold text-indigo-700">150</p>
            <div className="flex gap-1 text-sm mt-1">
              <span className="text-gray-600">Current Semester</span>
              <span className="text-green-600 font-medium">+10%</span>
            </div>
            <div className="grid grid-flow-col gap-4 items-end mt-6 h-36">
              {[60, 80, 20, 0, 50].map((height, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div
                    className="w-4 bg-indigo-400 rounded-t transition-all duration-300 group-hover:bg-indigo-600"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-[12px] mt-2 text-gray-600 font-medium">
                    Course {String.fromCharCode(65 + i)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <h2 className="text-xl font-bold text-purple-700 mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {[{ icon: '👤', text: 'New student, Alex Chen, enrolled in Course A', time: '2 hours ago' },
            { icon: '📘', text: 'Course B updated with new materials', time: '1 day ago' },
            { icon: '🗓️', text: 'Enrollment deadline for Course C extended', time: '3 days ago' }]
            .map((activity, i) => (
              <div
                key={i}
                className="flex gap-3 transition-all duration-200 hover:bg-white hover:shadow-sm hover:scale-[1.01] rounded-xl p-2"
              >
                <div className="flex flex-col items-center pt-1">
                  <span className="text-lg">{activity.icon}</span>
                  {i !== 2 && <div className="w-[1.5px] bg-gray-300 h-6 grow"></div>}
                </div>
                <div>
                  <p className="font-medium text-indigo-800">{activity.text}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
        </div>
      </main>
    </div>
  );
}
