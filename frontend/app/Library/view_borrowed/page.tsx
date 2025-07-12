'use client';

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export default function ViewBorrowed() {
  const borrowedBooks = [
    { title: 'Atomic Habits', borrower: 'Alice' },
    { title: 'Deep Work', borrower: 'Bob' },
    { title: 'The Alchemist', borrower: 'Charlie' },
  ];

  const pieData = [
    { name: 'Fiction', value: 6 },
    { name: 'Science', value: 4 },
    { name: 'History', value: 3 },
    { name: 'Others', value: 2 },
  ];
  const pieColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const lineData = [
    { month: 'Jan', borrowed: 10 },
    { month: 'Feb', borrowed: 8 },
    { month: 'Mar', borrowed: 12 },
    { month: 'Apr', borrowed: 6 },
    { month: 'May', borrowed: 14 },
  ];

  const barData = [
    { genre: 'Fiction', count: 10 },
    { genre: 'Science', count: 7 },
    { genre: 'History', count: 5 },
  ];

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-[#fffefb] to-[#f5f7fa] text-[#101419]"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold pb-4">Library Dashboard</h2>
        {[
          { label: 'Add Books', icon: '📘', bg: 'bg-blue-100' },
          { label: 'Download Books', icon: '⬇️', bg: 'bg-green-100' },
          { label: 'View Borrowed Books', icon: '🔍', bg: 'bg-yellow-100' },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
          >
            <div
              className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.bg}`}
            >
              <span>{item.icon}</span>
            </div>
            <p className="text-base font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10 space-y-8">
        {/* Borrowed List Card */}
        <div className="bg-white shadow rounded-2xl p-6 border border-[#d3dbe4]">
          <h1 className="text-2xl font-semibold mb-4">Borrowed Books</h1>
          <ul className="space-y-3">
            {borrowedBooks.map((book, index) => (
              <li
                key={index}
                className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg"
              >
                📚 <strong>{book.title}</strong> — Borrowed by <em>{book.borrower}</em>
              </li>
            ))}
          </ul>
        </div>

        {/* Charts Row */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* 📊 Pie Chart */}
          <div className="bg-white shadow rounded-2xl p-6 border border-[#d3dbe4]">
            <p className="text-lg font-medium mb-2">Borrowed Categories</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={pieColors[index % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📈 Line Chart */}
          <div className="bg-white shadow rounded-2xl p-6 border border-[#d3dbe4]">
            <p className="text-lg font-medium mb-2">Monthly Borrow Trend</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={lineData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="borrowed"
                  stroke="#8884d8"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Bar Chart */}
          <div className="bg-white shadow rounded-2xl p-6 border border-[#d3dbe4]">
            <p className="text-lg font-medium mb-2">Borrowed by Genre</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <XAxis dataKey="genre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#34a853" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
