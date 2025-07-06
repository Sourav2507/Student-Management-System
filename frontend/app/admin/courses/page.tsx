'use client';

<<<<<<< HEAD
import { useState } from 'react';

type Course = {
  code: string;
  title: string;
  department: string;
  credits: number;
  status: string;
};
=======
import { useEffect, useState } from 'react';
>>>>>>> 1f2a07e7dad19dcc0d8c39281a806a8632647f32

export default function ManageCourses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      code: 'CS101',
      title: 'Intro to CS',
      department: 'CSE',
      credits: 3,
      status: 'Active',
    },
  ]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState<Course>({
    code: '',
    title: '',
    department: '',
    credits: 0,
    status: 'Active',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'credits' ? parseInt(value) : value,
    }));
  };

  const handleAddCourse = () => {
    setCourses(prev => [...prev, formData]);
    setFormData({ code: '', title: '', department: '', credits: 0, status: 'Active' });
    setFormVisible(false);
  };

  return (
<<<<<<< HEAD
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
          <h1 className="text-lg font-semibold">Acme University</h1>
        </div>
        <nav className="flex flex-col gap-2">
          {[
            { label: 'Users', icon: '👥', href: '/admin/users' },
            { label: 'Courses', icon: '📘', href: '/admin/courses' },
            { label: 'Logs', icon: '📄', href: '/admin/logs' },
            { label: 'Analytics', icon: '📊', href: '/admin/analytics' },
          ].map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 cursor-pointer ${
                item.label === 'Courses'
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-100 hover:scale-[1.02]'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Manage Courses</h1>
          <button
            className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition-all"
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? 'Cancel' : 'Add Course'}
          </button>
        </div>

        {!formVisible ? (
          <>
            {/* Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <table className="w-full table-auto text-sm text-left">
                <thead className="bg-gray-100 text-[#121717]">
                  <tr>
                    <th className="px-6 py-3">Course Code</th>
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Department</th>
                    <th className="px-6 py-3">Credits</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, i) => (
                    <tr
                      key={i}
                      className="border-t transition hover:bg-gray-50 hover:scale-[1.01]"
                    >
                      <td className="px-6 py-4">{course.code}</td>
                      <td className="px-6 py-4">{course.title}</td>
                      <td className="px-6 py-4">{course.department}</td>
                      <td className="px-6 py-4">{course.credits}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 text-xs rounded-full ${
                            course.status === 'Active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {course.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-500">
                        Edit
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
=======
    <div className="relative min-h-screen flex flex-col bg-white font-['Public Sans']">
      <header className="flex items-center justify-between border-b px-10 py-3">
        <div className="flex items-center gap-4">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-lg font-bold tracking-tight">Academics</h2>
        </div>
        <nav className="flex gap-9 text-sm font-medium">
          <a href="#">Dashboard</a>
          <a href="#">Courses</a>
          <a href="#">Students</a>
          <a href="#">Instructors</a>
          <a href="#">Departments</a>
        </nav>
      </header>

      <main className="flex flex-1 flex-row gap-1 px-6 py-5 justify-center">
        <div className="flex flex-col max-w-[920px] w-full">
          <section className="p-4">
            <h1 className="text-[32px] font-bold">Manage Courses</h1>
            <p className="text-sm text-[#6a7681]">View, edit, and manage all courses offered by the university.</p>
          </section>

          <section className="px-4 py-3">
            <input
              type="text"
              placeholder="Search by Name, Department, or Semester"
              className="w-full h-12 rounded-xl bg-[#f1f2f4] px-4 text-sm focus:outline-none"
            />
          </section>

          <section className="px-4 py-3 overflow-x-auto">
            <table className="w-full text-sm text-left border">
              <thead className="bg-white">
                <tr>
                  <th className="px-4 py-2">Course Code</th>
                  <th className="px-4 py-2">Course Name</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Credits</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Edit</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course: any) => (
                  <tr key={course._id} className="border-t">
                    <td className="px-4 py-2 text-[#6a7681]">{course.code}</td>
                    <td className="px-4 py-2">{course.title}</td>
                    <td className="px-4 py-2 text-[#6a7681]">{course.department}</td>
                    <td className="px-4 py-2 text-[#6a7681]">{course.credits}</td>
                    <td className="px-4 py-2">
                      <button className="rounded-xl bg-[#f1f2f4] px-4 h-8">{course.status}</button>
                    </td>
                    <td className="px-4 py-2 text-[#6a7681] font-bold">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        <div className="flex flex-col w-[360px]">
          <h2 className="px-4 pt-5 pb-3 text-[22px] font-bold">Course Details</h2>
          <div className="px-4 py-3 space-y-4">
            <input className="w-full h-14 rounded-xl border px-4" placeholder="Course Code" />
            <input className="w-full h-14 rounded-xl border px-4" placeholder="Course Name" />
            <select className="w-full h-14 rounded-xl border px-4">
              <option>Department</option>
              <option>Computer Science</option>
              <option>Mathematics</option>
            </select>
            <select className="w-full h-14 rounded-xl border px-4">
              <option>Semester</option>
              <option>1</option>
              <option>2</option>
            </select>
            <input className="w-full h-14 rounded-xl border px-4" placeholder="Credits" />
            <textarea className="w-full min-h-[144px] rounded-xl border px-4 py-2" placeholder="Description" />
            <select className="w-full h-14 rounded-xl border px-4">
              <option>Instructor</option>
              <option>Prof. A</option>
              <option>Prof. B</option>
            </select>
            <div className="flex items-center justify-between">
              <span>Status</span>
              <input type="checkbox" className="h-6 w-10 rounded-full bg-[#f1f2f4]" />
>>>>>>> 1f2a07e7dad19dcc0d8c39281a806a8632647f32
            </div>
          </>
        ) : (
          <>
            {/* Form */}
            <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  id="code"
                  placeholder="Course Code"
                  value={formData.code}
                  onChange={handleChange}
                  className="border rounded-xl px-4 h-12"
                />
                <input
                  id="title"
                  placeholder="Course Title"
                  value={formData.title}
                  onChange={handleChange}
                  className="border rounded-xl px-4 h-12"
                />
                <input
                  id="department"
                  placeholder="Department"
                  value={formData.department}
                  onChange={handleChange}
                  className="border rounded-xl px-4 h-12"
                />
                <input
                  id="credits"
                  placeholder="Credits"
                  type="number"
                  value={formData.credits}
                  onChange={handleChange}
                  className="border rounded-xl px-4 h-12"
                />
                <select
                  id="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="border rounded-xl px-4 h-12 col-span-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <button
                onClick={handleAddCourse}
                className="mt-6 w-full bg-green-600 text-white h-12 rounded-xl hover:bg-green-700 transition"
              >
                Save Course
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
