'use client';
import Link from 'next/link';
import { Fragment } from 'react';

export default function Analytics() {
  return (
    <div className="min-h-screen w-full flex font-sans bg-white text-[#121717] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/a-/ALV-UjXJ5eAvOfQ6rpJKZmPgoFBoi0S1t8PIE2RCrQ=s96-c')",
            }}
          ></div>
          <h1 className="text-lg font-semibold">Acme University</h1>
        </div>
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
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${item.label === 'Dashboard'
                    ? 'bg-gray-100'
                    : 'hover:bg-gray-100 hover:scale-[1.02]'
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
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Analytics</h1>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Users', value: '1,250' },
            { label: 'Total Courses', value: '86' },
            { label: 'Active Enrollments', value: '540' },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105"
            >
              <p className="text-base font-medium">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Enrollment Over Time */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:scale-[1.01] transition-all">
            <p className="font-medium mb-2">Enrollment Over Time</p>
            <div className="h-44 flex items-center justify-center text-gray-500 text-sm">
              [Line Chart Placeholder]
            </div>
          </div>

          {/* Performance Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:scale-[1.01] transition-all">
            <p className="font-medium mb-2">Performance Breakdown by Department</p>
            <div className="h-44 flex items-center justify-center text-gray-500 text-sm">
              [Pie Chart Placeholder]
            </div>
          </div>
        </div>

        {/* Table or Details */}
        <h2 className="text-xl font-bold mb-4">Recent Metrics</h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-[#121717]">
              <tr>
                <th className="px-6 py-3">Metric</th>
                <th className="px-6 py-3">Value</th>
                <th className="px-6 py-3">Change</th>
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Average GPA', value: '3.5', change: '+0.2' },
                { metric: 'Dropout Rate', value: '4.5%', change: '-1.1%' },
                { metric: 'Attendance Rate', value: '92%', change: '+3%' },
              ].map((row, i) => (
                <tr key={i} className="border-t hover:bg-gray-50 hover:scale-[1.01]">
                  <td className="px-6 py-4">{row.metric}</td>
                  <td className="px-6 py-4">{row.value}</td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      row.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {row.change}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
