'use client';

import { useEffect, useState } from 'react';

export default function AnalyticsPage() {
  const [data, setData] = useState({ users: 0, courses: 0 });

  useEffect(() => {
    fetch('http://localhost:5000/api/analytics')
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h2>Analytics</h2>
      <p>Total Users: {data.users}</p>
      <p>Total Courses: {data.courses}</p>
    </div>
  );
}

export default function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <p>Display charts and insights related to student performance and enrollment.</p>
    </div>
  );
}