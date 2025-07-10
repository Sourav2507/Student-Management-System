'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ViewLogs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div className="min-h-screen w-full flex font-sans bg-white text-[#121717] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBreH1rT7yO6QJye8Mv33l0HPptgroCYEv9wAIBQMJWndzu9mFPXp5RgVJ0EpC0W141Y34Nwp7m5-yaqlTajggTeT1KXGhWtm9oGDSSekaorSJyihbhhKPITW381P3ZgESZl60fu2QAjT2S9JPgBD_WwSz6AlfwWr0Lo7WpVIwTwfoA7vZbC5KJXVcGIJp6YBz0Se4XDZKbAFSIz8DVMhok9Iz7y7o5edlhjq-M6YIN7vPvutSIDAi0YP5NKuhsowAOXrqE2oH1cjsl')",
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
        <h1 className="text-3xl font-bold mb-6">System Logs</h1>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <table className="w-full table-auto text-sm text-left">
            <thead className="bg-gray-100 text-[#121717]">
              <tr>
                <th className="px-6 py-3">Timestamp</th>
                <th className="px-6 py-3">Activity</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-gray-500 text-center">
                    No logs available.
                  </td>
                </tr>
              ) : (
                logs.map((log: any, index: number) => (
                  <tr
                    key={index}
                    className="border-t transition hover:bg-gray-50 hover:scale-[1.01]"
                  >
                    <td className="px-6 py-4 text-gray-700 whitespace-nowrap">
                      {new Date(log.timestamp).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-800 max-w-md truncate">
                      {log.message}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
