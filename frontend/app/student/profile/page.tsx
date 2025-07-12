'use client';

export default function Profile() {
  const student = {
    name: 'Deepa Pal',
    email: 'deepa@example.com',
    department: 'Computer Science',
    rollNo: 'CSE2021-123',
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Profile</h2>
      <ul className="text-lg space-y-2">
        <li><strong>Name:</strong> {student.name}</li>
        <li><strong>Email:</strong> {student.email}</li>
        <li><strong>Department:</strong> {student.department}</li>
        <li><strong>Roll No:</strong> {student.rollNo}</li>
      </ul>
    </div>
  );
}
