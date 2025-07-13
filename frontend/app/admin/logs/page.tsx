'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Log = {
  message: string;
  timestamp: string;
  user: string;
  category: string;
};

export default function SystemLogs() {
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/logs', {
          credentials: 'include',
        });
        if (!res.ok) throw new Error('Failed to fetch logs');
        const data = await res.json();
        const formattedLogs: Log[] = data.logs.map((log: any) => ({
          message: log.message,
          timestamp: new Date(log.timestamp).toLocaleString(),
          user: log.user?.name ? `${log.user.name} (${log.user.role})` : 'Unknown User',
          category: log.category,
        }));
        setLogs(formattedLogs);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
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
          <p className="text-purple-500 text-lg font-bold animate-pulse">Loading Logs...</p>
        </motion.div>
      </div>
    );
  }

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
          <h1 className="text-lg font-semibold text-purple-700">Acme University</h1>
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
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  item.label === 'Logs'
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
          className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-6"
        >
          System Logs
        </motion.h1>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Message</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Timestamp</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">User/Role</th>
                <th className="text-left px-6 py-3 font-semibold text-gray-700">Category</th>
              </tr>
            </thead>
            <tbody>
              {logs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                    No logs available.
                  </td>
                </tr>
              ) : (
                logs.map((log, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50 transition">
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
      </main>
    </div>
  );
}
