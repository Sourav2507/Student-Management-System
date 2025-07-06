'use client';

import { useState } from 'react';

type Course = {
  code: string;
  title: string;
  department: string;
  credits: number;
  status: string;
};

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
                    key={course.code + i}
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
                    <td className="px-6 py-4 text-sm font-bold text-gray-500">Edit</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
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
        )}
      </main>
    </div>
  );
}
