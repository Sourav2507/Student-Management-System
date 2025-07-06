'use client';

import Link from 'next/link';

export default function FacultyDashboard() {
  return (
    <div className="min-h-screen w-full flex font-sans bg-white text-[#121717] px-4 sm:px-8">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAmCL20iF57Ik-oUKyggp6Kx65VzYooA2IMr0EIOqkAspC9bxMMqMxiqnmNZ8Lm63OQ35IEXg2X25mqb90x1afzmMKkHq7IIFBVWVOt68r8MBVuheNVGgS7t_ofHZO97Qs73E-tQZ8TkJNNAf9Z-VtupWsTEEEPJ_TRsfTRQBgWMyZ9vR2tA8VzhFvE2KEpDluNyepXCSHK8MI8gmZfvJigGpHTLud-2EfErUC4wP30M3q9d7OQf4gN_6adbvTzN8jxh7ayd7HwCmA')",
            }}
          ></div>
          <h1 className="text-lg font-semibold">Faculty Panel</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Dashboard', icon: '🏠', href: '/faculty/dashboard' },
            { label: 'Add/Update Marks', icon: '📝', href: '/faculty/marks' },
            { label: 'Add Attendance', icon: '📋', href: '/faculty/attendance' },
            { label: 'Create Exams', icon: '🗓️', href: '/faculty/exams' },
            { label: 'View Submissions', icon: '📑', href: '/faculty/submissions' },
            { label: 'Add Announcements', icon: '📢', href: '/faculty/announcements' },
          ].map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                i === 0 ? 'bg-gray-100' : 'hover:bg-gray-100 hover:scale-[1.02]'} `}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-6">Faculty Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: 'Add/Update Marks', img: 'https://cdn-icons-png.flaticon.com/512/3209/3209265.png' },
            { label: 'Add Attendance', img: 'https://cdn-icons-png.flaticon.com/512/190/190411.png' },
            { label: 'Create Exams', img: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' },
            { label: 'View Submissions', img: 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png' },
            { label: 'Add Announcements', img: 'https://cdn-icons-png.flaticon.com/512/1827/1827392.png' },
          ].map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-xl p-6 shadow-sm transition-all duration-200 hover:shadow-md hover:scale-105 text-center"
            >
              <img
                src={card.img}
                alt={card.label}
                className="w-16 h-16 mx-auto object-contain mb-4"
              />
              <p className="text-base font-medium text-[#121717]">{card.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
