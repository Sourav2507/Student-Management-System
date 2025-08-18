'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from 'axios';

type Course = {
  _id?: string;
  code: string;
  title: string;
  department: string;
  credits: number;
  status: string;
  assignedFaculty: {
    _id: string;
    name: string;
    email: string;
    designation: string;
  };
};

type Faculty = {
  _id: string;
  name: string;
  email: string;
  designation: string;
};

export default function ManageCourses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [faculties, setFaculties] = useState<Faculty[]>([]);
  const [formVisible, setFormVisible] = useState(false);

  const [formData, setFormData] = useState({
    code: '',
    title: '',
    department: '',
    credits: 0,
    status: 'Active',
    assignedFaculty: '',
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    fetchCourses();
    fetchFaculties();
    return () => clearTimeout(timer);
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses/all', { withCredentials: true });
      setCourses(res.data.courses);
    } catch (err) {
      console.error('Failed to load courses');
    }
  };

  const fetchFaculties = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/courses/faculties', { withCredentials: true });
      setFaculties(res.data.facultyList);
    } catch (err) {
      console.error('Failed to load faculties');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: id === 'credits' ? parseInt(value) : value,
    }));
  };

  const handleAddCourse = async () => {
    try {
      await axios.post('http://localhost:5000/api/courses/add', formData, { withCredentials: true });
      fetchCourses();
      setFormVisible(false);
      setFormData({
        code: '',
        title: '',
        department: '',
        credits: 0,
        status: 'Active',
        assignedFaculty: '',
      });
    } catch (err: any) {
      console.error('Add course error:', err.response?.data, err.response?.status);
      alert(`Failed: ${err.response?.data.error || err.message}`);
    }
  };

  const handleDeleteCourse = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/courses/${id}`, { withCredentials: true });
      setCourses(prev => prev.filter(course => course._id !== id));
    } catch (err: any) {
      console.error("Delete course error:", err.response?.data || err.message);
      alert(`Failed to delete: ${err.response?.data?.error || err.message}`);
    }
  };

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
          <p className="text-purple-500 text-lg font-bold animate-pulse">Loading Courses...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex font-sans bg-gradient-to-br from-white via-blue-50 to-purple-50 text-[#121717]">
      {/* Sidebar */}
      <aside className="w-72 min-h-screen border-r border-purple-100 bg-white bg-opacity-70 backdrop-blur-md p-6 rounded-3xl">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-8">
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-purple-200"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/a-/ALV-UjXJ5eAvOfQ6rpJKZmPgoFBoi0S1t8PIE2RCrQ=s96-c')",
            }}
          ></div>
          <h1 className="text-lg font-semibold text-purple-700">Acme University</h1>
        </motion.div>
        <nav className="flex flex-col gap-2">
          {[{ label: 'Dashboard', icon: '🏠', href: '/admin/dashboard' },
          { label: 'Users', icon: '👥', href: '/admin/users' },
          { label: 'Courses', icon: '📘', href: '/admin/courses' },
          { label: 'Logs', icon: '📄', href: '/admin/logs' },
          { label: 'Analytics', icon: '📊', href: '/admin/analytics' }].map((item, i) => (
            <Link href={item.href} key={i}>
              <div
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-200 cursor-pointer ${item.label === 'Courses'
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
      <main className="flex-1 bg-gradient-to-bl from-white via-blue-50 to-purple-50 p-10 overflow-y-auto">
        <motion.h1
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 to-indigo-600 text-transparent bg-clip-text mb-8"
        >
          Manage Courses
        </motion.h1>

        <div className="flex justify-end mb-6">
          <button
            className="bg-blue-600 text-white rounded-xl px-4 py-2 hover:bg-blue-700 transition-all"
            onClick={() => setFormVisible(!formVisible)}
          >
            {formVisible ? 'Cancel' : 'Add Course'}
          </button>
        </div>

        {!formVisible ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full table-auto text-sm text-left">
              <thead className="bg-purple-100 text-[#121717]">
                <tr>
                  <th className="px-6 py-3">Code</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Dept</th>
                  <th className="px-6 py-3">Credits</th>
                  <th className="px-6 py-3">Faculty</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => (
                  <tr key={course._id || i} className="border-t transition hover:bg-gray-50">
                    <td className="px-6 py-4">{course.code}</td>
                    <td className="px-6 py-4">{course.title}</td>
                    <td className="px-6 py-4">{course.department}</td>
                    <td className="px-6 py-4">{course.credits}</td>
                    <td className="px-6 py-4">{course.assignedFaculty?.name || '-'}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 text-xs rounded-full ${course.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {course.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteCourse(course._id!)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white p-6 rounded-xl shadow-md max-w-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input id="code" placeholder="Course Code" value={formData.code} onChange={handleChange} className="border rounded-xl px-4 h-12" />
              <input id="title" placeholder="Course Title" value={formData.title} onChange={handleChange} className="border rounded-xl px-4 h-12" />
              <input id="department" placeholder="Department" value={formData.department} onChange={handleChange} className="border rounded-xl px-4 h-12" />
              <input id="credits" placeholder="Credits" type="number" value={formData.credits} onChange={handleChange} className="border rounded-xl px-4 h-12" />
              <select id="status" value={formData.status} onChange={handleChange} className="border rounded-xl px-4 h-12 col-span-2">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <select id="assignedFaculty" value={formData.assignedFaculty} onChange={handleChange} className="border rounded-xl px-4 h-12 col-span-2">
                <option value="">-- Select Faculty --</option>
                {faculties.map(faculty => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.name} ({faculty.designation})
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleAddCourse}
              className="mt-6 w-full bg-green-600 text-white h-12 rounded-xl hover:bg-green-700 transition"
            >
              Save Course
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}
