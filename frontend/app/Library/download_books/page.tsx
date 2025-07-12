'use client';

import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line
} from 'recharts';

export default function DownloadBooks() {
  const pieData = [
    { name: 'E-books', value: 300 },
    { name: 'PDFs', value: 500 },
    { name: 'Guides', value: 200 },
  ];

  const barData = [
    { month: 'Jan', downloads: 50 },
    { month: 'Feb', downloads: 80 },
    { month: 'Mar', downloads: 65 },
    { month: 'Apr', downloads: 90 },
    { month: 'May', downloads: 100 },
    { month: 'Jun', downloads: 120 },
  ];

  const lineData = [
    { month: 'Jan', growth: 10 },
    { month: 'Feb', growth: 30 },
    { month: 'Mar', growth: 20 },
    { month: 'Apr', growth: 40 },
    { month: 'May', growth: 60 },
    { month: 'Jun', growth: 80 },
  ];

  const pieColors = ['#FF6384', '#36A2EB', '#FFCE56'];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] text-[#101419]" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold pb-4">Download Dashboard</h2>
        {[
          { label: "Add Books", icon: "📘", bg: "bg-blue-100" },
          { label: "Download Books", icon: "⬇️", bg: "bg-green-100" },
          { label: "View Borrowed Books", icon: "🔍", bg: "bg-yellow-100" },
        ].map((item, index) => (
          <div key={index} className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer">
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${item.bg}`}>
              <span>{item.icon}</span>
            </div>
            <p className="text-base font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-6">
        <h1 className="text-3xl font-semibold mb-6">Download Stats</h1>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
          {/* Bar Chart Card */}
          <div className="bg-white p-6 rounded-xl shadow border border-[#d3dbe4]">
            <p className="text-lg font-medium mb-2">Monthly Downloads</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="downloads" fill="#4C51BF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Line Chart Card */}
          <div className="bg-white p-6 rounded-xl shadow border border-[#d3dbe4]">
            <p className="text-lg font-medium mb-2">Download Growth</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="growth" stroke="#38B2AC" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Card */}
          <div className="bg-white p-6 rounded-xl shadow border border-[#d3dbe4]">
            <p className="text-lg font-medium mb-2">Download Types</p>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
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
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Downloadable Books Section */}
        <div className="bg-white p-6 rounded-xl shadow border border-[#d3dbe4]">
          <h2 className="text-2xl font-semibold mb-4">Download Books</h2>
          <ul className="space-y-3">
            {[
              { title: 'Next.js Guide', url: '/downloads/nextjs.pdf' },
              { title: 'React Basics', url: '/downloads/react.pdf' },
            ].map((book, index) => (
              <li key={index} className="p-4 bg-gradient-to-r from-green-100 to-green-50 rounded-lg shadow-sm">
                <a href={book.url} download className="text-blue-600 underline font-medium">
                  {book.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
