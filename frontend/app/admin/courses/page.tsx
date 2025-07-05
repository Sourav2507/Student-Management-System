export default function ManageCourses() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Courses</h1>
      <p>Add or update course details.</p>
    </div>
  );
}




/*'use client';

import { useEffect, useState } from 'react';

export default function ManageCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-white font-[\'Public Sans\']">
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
        <div className="flex gap-8">
          <nav className="flex gap-9 text-sm font-medium">
            <a href="#">Dashboard</a>
            <a href="#">Courses</a>
            <a href="#">Students</a>
            <a href="#">Instructors</a>
            <a href="#">Departments</a>
          </nav>
        </div>
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
                {courses.map((course) => (
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
            </div>
            <button className="w-full h-10 rounded-xl bg-[#dce8f3] font-bold">Update Course</button>
            <button className="w-full h-10 rounded-xl bg-[#f1f2f4] font-bold">Add New Course</button>
            <button className="w-full h-10 rounded-xl bg-[#f1f2f4] font-bold">Delete Selected</button>
          </div>
        </div>
      </main>
    </div>
  );
}
