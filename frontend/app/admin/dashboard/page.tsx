'use client';
import { Fragment } from "react";

export default function AdminDashboard() {
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
            { label: 'Users', icon: '👥' },
            { label: 'Courses', icon: '📘' },
            { label: 'Logs', icon: '📄' },
            { label: 'Analytics', icon: '📊' },
          ].map((item, i) => (
            <div
              key={i}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                i === 0 ? "bg-gray-100" : "hover:bg-gray-100 hover:scale-[1.02]"
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
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Total Students', value: '1,250' },
            { label: 'Active Courses', value: '15' },
            { label: 'Recent Enrollments', value: '30' },
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

        {/* Student Progress */}
        <h2 className="text-xl font-bold mb-4">Student Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Average Grades */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <p className="font-medium mb-2">Average Grades Over Time</p>
            <p className="text-3xl font-bold">82%</p>
            <div className="flex gap-1 text-sm mt-1">
              <span className="text-gray-600">Last 6 Months</span>
              <span className="text-green-600 font-medium">+5%</span>
            </div>
            <div className="h-36 flex items-center justify-center mt-4 text-sm text-gray-500">
              [Chart Placeholder]
            </div>
          </div>

          {/* Enrollment by Course */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-200 hover:shadow-md hover:scale-[1.01]">
            <p className="font-medium mb-2">Enrollment by Course</p>
            <p className="text-3xl font-bold">150</p>
            <div className="flex gap-1 text-sm mt-1">
              <span className="text-gray-600">Current Semester</span>
              <span className="text-green-600 font-medium">+10%</span>
            </div>
            <div className="grid grid-flow-col gap-4 items-end mt-6 h-36">
              {[60, 80, 20, 0, 50].map((height, i) => (
                <div key={i} className="flex flex-col items-center group">
                  <div
                    className="w-4 bg-blue-500 rounded-t transition-all duration-300 group-hover:bg-blue-600"
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
        <h2 className="text-xl font-bold mb-4">Recent Activities</h2>
        <div className="space-y-4">
          {[
            { icon: '👤', text: 'New student, Alex Chen, enrolled in Course A', time: '2 hours ago' },
            { icon: '📘', text: 'Course B updated with new materials', time: '1 day ago' },
            { icon: '🗓️', text: 'Enrollment deadline for Course C extended', time: '3 days ago' },
          ].map((activity, i) => (
            <div
              key={i}
              className="flex gap-3 transition-all duration-200 hover:bg-white hover:shadow-sm hover:scale-[1.01] rounded-xl p-2"
            >
              <div className="flex flex-col items-center pt-1">
                <span className="text-lg">{activity.icon}</span>
                {i !== 2 && <div className="w-[1.5px] bg-gray-300 h-6 grow"></div>}
              </div>
              <div>
                <p className="font-medium">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
