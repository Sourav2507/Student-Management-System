'use client';
import { JSX, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
  designation?: string;
  rollNumber?: string;
  branch?: string;
  semester?: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/users')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setUsers(data);
        else console.error('Invalid response:', data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
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
          <p className="text-purple-500 text-lg font-bold animate-pulse">Loading Users...</p>
        </motion.div>
      </div>
    );
  }

  const students = users.filter((u) => u.role === 'student');
  const faculty = users.filter((u) => u.role === 'faculty' || u.role === 'librarian');

  const totalUsers = users.length;
  const studentCount = students.length;
  const facultyCount = faculty.filter((f) => f.role === 'faculty').length;
  const librarianCount = faculty.filter((f) => f.role === 'librarian').length;

  return (
    <div className="flex min-h-screen bg-gradient-to-bl from-white via-blue-50 to-purple-50 text-[#1f2937]">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-purple-100 bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-3xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8 flex items-center gap-4">
          <img
            src="https://lh3.googleusercontent.com/a-/AOh14GjRkU"
            className="w-10 h-10 rounded-full border border-gray-300"
            alt="Admin"
          />
          <h1 className="text-lg font-bold text-purple-700">Acme University</h1>
        </motion.div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Dashboard', icon: '🏠', href: '/admin/dashboard' },
            { label: 'Users', icon: '👥', href: '/admin/users' },
            { label: 'Courses', icon: '📘', href: '/admin/courses' },
            { label: 'Logs', icon: '📄', href: '/admin/logs' },
            { label: 'Analytics', icon: '📊', href: '/admin/analytics' },
          ].map((item, i) => (
            <Link key={i} href={item.href}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                  item.label === 'Users'
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
      <main className="flex-1 p-10 overflow-y-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-8"
        >
          User Management
        </motion.h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-12">
          <StatCard label="Total Users" value={totalUsers} color="from-sky-100 to-purple-100" />
          <StatCard label="Students" value={studentCount} color="from-green-100 to-teal-100" />
          <StatCard label="Faculty" value={facultyCount} color="from-indigo-100 to-blue-100" />
          <StatCard label="Librarians" value={librarianCount} color="from-yellow-100 to-pink-100" />
        </div>

        {/* Tables */}
        <UserSection title="🎓 Students" columns={["Name", "Email", "Branch", "Semester", "Roll No"]} users={students}>
          {(user) => (
            <tr key={user._id} className="border-t hover:bg-green-50">
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.branch}</td>
              <td className="px-6 py-3">{user.semester}</td>
              <td className="px-6 py-3">{user.rollNumber}</td>
            </tr>
          )}
        </UserSection>

        <UserSection title="📚 Faculty & Librarians" columns={["Name", "Email", "Designation", "Role"]} users={faculty}>
          {(user) => (
            <tr key={user._id} className="border-t hover:bg-indigo-50">
              <td className="px-6 py-3">{user.name}</td>
              <td className="px-6 py-3">{user.email}</td>
              <td className="px-6 py-3">{user.designation ?? '—'}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    user.role === 'faculty'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {user.role}
                </span>
              </td>
            </tr>
          )}
        </UserSection>
      </main>
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`bg-gradient-to-br ${color} p-6 rounded-2xl shadow-md transition duration-200`}
    >
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value}</p>
    </motion.div>
  );
}

function UserSection({
  title,
  columns,
  users,
  children,
}: {
  title: string;
  columns: string[];
  users: User[];
  children: (user: User) => JSX.Element;
}) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="bg-white rounded-xl shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {columns.map((col, idx) => (
                <th key={idx} className="px-6 py-3">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(children)
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-400">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
