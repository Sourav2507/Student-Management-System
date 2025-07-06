'use client';
import { useEffect, useState } from 'react';

type User = {
  _id: string;
  name: string;
  email: string;
  role: string;
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const totalUsers = users.length;
  const studentCount = users.filter(user => user.role === 'Student').length;
  const facultyCount = users.filter(user => user.role === 'Faculty').length;
  const librarianCount = users.filter(user => user.role === 'Librarian').length;

  return (
    <div className="min-h-screen w-full flex font-sans bg-white text-[#121717] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/a-/AOh14GjRkU')",
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
                item.label === 'Users'
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-100 hover:scale-[1.02]'
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
        <h1 className="text-3xl font-bold mb-6">User Management</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total Users" value={totalUsers} />
          <StatCard label="Students" value={studentCount} />
          <StatCard label="Faculty" value={facultyCount} />
          <StatCard label="Librarians" value={librarianCount} />
        </div>

        {/* User List */}
        <div className="bg-white rounded-xl shadow-md overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-[#121717]">
              <tr>
                <th className="px-6 py-3">Name</th>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: User) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-3">{user.name}</td>
                  <td className="px-6 py-3 text-gray-600">{user.email}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 text-xs rounded-full ${
                        user.role === 'Student'
                          ? 'bg-blue-100 text-blue-800'
                          : user.role === 'Faculty'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td className="px-6 py-4 text-gray-500" colSpan={3}>
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm transition-all hover:shadow-md hover:scale-105">
      <p className="text-base font-medium">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}
