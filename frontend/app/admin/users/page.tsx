'use client';
import { useEffect, useState } from 'react';

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      <h2>User Management</h2>
      <ul>
        {users.map((user: any) => (
          <li key={user._id}>{user.name} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
}



export default function UserManagement() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <p>Manage student, faculty, and librarian accounts here.</p>
    </div>
  );
}

