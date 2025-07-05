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

export default function CourseManagement() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data));
  }, []);

  return (
    <div>
      <h2>Manage Courses</h2>
      <ul>
        {courses.map((course: any) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}
*/
