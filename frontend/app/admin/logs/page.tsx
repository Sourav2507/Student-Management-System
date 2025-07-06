export default function ViewLogs() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">System Logs</h1>
      <p>Track recent system activities and user actions.</p>
    </div>
  );
}




/*'use client';

import { useEffect, useState } from 'react';

export default function LogsPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/logs')
      .then(res => res.json())
      .then(data => setLogs(data));
  }, []);

  return (
    <div>
      <h2>System Logs</h2>
      <ul>
        {logs.map((log: any, index: number) => (
          <li key={index}>{log.message} - {log.timestamp}</li>
        ))}
      </ul>
    </div>
  );
}
*/