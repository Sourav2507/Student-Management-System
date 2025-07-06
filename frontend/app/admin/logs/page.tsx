'use client';
import { useEffect, useState } from 'react';

export default function SystemLogs() {
  type Log = {
  message: string;
  timestamp: string;
  user: string;
  category: string;
};

const [logs, setLogs] = useState<Log[]>([]);


  // Temporarily use static sample data until backend is ready
  useEffect(() => {
    setLogs([
      {
        message: "User 'Sarah' logged in",
        timestamp: "2024-01-15 10:00 AM",
        user: "Sarah (Admin)",
        category: "Authentication"
      },
      {
        message: "User 'David' updated profile",
        timestamp: "2024-01-15 10:15 AM",
        user: "David (User)",
        category: "Profile Update"
      },
      {
        message: "System backup initiated",
        timestamp: "2024-01-15 11:00 AM",
        user: "System (Admin)",
        category: "System Maintenance"
      }
    ]);
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
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1baC1ky0dUn2lQ4Ro30tD6GKqU9JueGq0pd6L5_Lr-0UvxncqBzzchyzfbPdRhBVlfEhY2NEmiE04mAlnCp2mY2PMJ1JV9f5jolOLj1jm6TMyr2SrQOI7IO0-Dog0lYZ7wqDMS1pqHJjeYit_HLcxjnr1l-2fjfolKn5cTnjq0NzDKWKMhlNgXUGlASRt_5jHNQMKybitNR6vjm8z2MVmtMtW5BXzniQ5ZnqqtATxgUJyD4Bk2kgvmXwPi2Y-gQLgaq3k1gRip9Zx')",
            }}
          ></div>
          <h1 className="text-lg font-semibold">Acme University</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Users', icon: '👥' },
            { label: 'Courses', icon: '📘' },
            { label: 'Logs', icon: '📄' },
            { label: 'Analytics', icon: '📊' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                item.label === 'Logs' ? 'bg-gray-100' : 'hover:bg-gray-100 hover:scale-[1.02]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">System Logs</h1>
        <p className="text-sm text-gray-600 mb-6">Track recent system activities and user actions.</p>

        <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Message</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Timestamp</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">User/Role</th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">Category</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log, index) => (
                <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="px-4 py-2 text-gray-800">{log.message}</td>
                  <td className="px-4 py-2 text-gray-600">{log.timestamp}</td>
                  <td className="px-4 py-2 text-gray-600">{log.user}</td>
                  <td className="px-4 py-2">
                    <span className="inline-block bg-gray-100 px-2 py-1 rounded text-xs text-gray-700">
                      {log.category}
                    </span>
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
