'use client';

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
} from 'recharts';
import { useRouter } from 'next/navigation';

export default function LibraryDashboard() {
  const router = useRouter();

  const menuItems = [
    { label: "Add Books", icon: "📘", bg: "bg-blue-100", path: "/library/add_books" },
    { label: "Download Books", icon: "⬇️", bg: "bg-green-100", path: "/library/download_books" },
    { label: "View Borrowed Books", icon: "🔍", bg: "bg-yellow-100", path: "/library/view_borrowed" },
    { label: "Issued Books", icon: "📖", bg: "bg-indigo-100", path: "/library/issued_books" },
    { label: "Read Book", icon: "📚", bg: "bg-pink-100", path: "/library/read_book" },
  ];

  const pieData = [
    { name: 'Fiction', value: 400 },
    { name: 'Non-Fiction', value: 300 },
    { name: 'Science', value: 200 },
    { name: 'Technology', value: 100 },
  ];

  const pieColors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'];

  const lineData = [
    { month: 'Jan', books: 20 },
    { month: 'Feb', books: 30 },
    { month: 'Mar', books: 40 },
    { month: 'Apr', books: 50 },
    { month: 'May', books: 60 },
    { month: 'Jun', books: 70 },
  ];

  const barData = [
    { month: 'Jan', borrowings: 25 },
    { month: 'Feb', borrowings: 20 },
    { month: 'Mar', borrowings: 30 },
  ];

  return (
    <div className="relative flex min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#edf2f7] overflow-x-hidden"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-md">
        <h2 className="text-[#101419] text-2xl font-bold pb-4">Library Dashboard</h2>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer transition"
          >
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg text-[#101419] ${item.bg}`}>
              <span>{item.icon}</span>
            </div>
            <p className="text-[#101419] text-base font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Dashboard Content */}
      <div className="flex-1 px-8 py-6">
        {/* Line & Bar Charts Row */}
        <div className="flex flex-wrap gap-6 mb-6">
          {/* Line Chart Card */}
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d3dbe4] shadow bg-white p-6">
            <p className="text-[#101419] text-base font-medium">Books Added Over Time</p>
            <p className="text-[#101419] text-[32px] font-bold truncate">120</p>
            <div className="flex gap-1 mb-4">
              <p className="text-[#58728d] text-base">Last 6 Months</p>
              <p className="text-[#078838] text-base font-medium">+15%</p>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="books" stroke="#36A2EB" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart Card */}
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d3dbe4] shadow bg-white p-6">
            <p className="text-[#101419] text-base font-medium">Borrowing Trends</p>
            <p className="text-[#101419] text-[32px] font-bold truncate">85</p>
            <div className="flex gap-1 mb-4">
              <p className="text-[#58728d] text-base">Last 3 Months</p>
              <p className="text-[#e73908] text-base font-medium">-5%</p>
            </div>
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="borrowings" fill="#FF6384" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Pie Chart Section */}
        <div className="flex flex-wrap gap-6">
          <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#d3dbe4] shadow bg-white p-6">
            <p className="text-[#101419] text-base font-medium">Book Categories</p>
            <p className="text-[#101419] text-[32px] font-bold truncate">Library Stats</p>
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
