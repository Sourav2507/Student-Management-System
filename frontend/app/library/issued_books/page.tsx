'use client';

import { useRouter } from 'next/navigation';

export default function IssuedBooksPage() {
  const router = useRouter();

  const menuItems = [
    { label: 'Add Books', icon: '📘', bg: 'bg-blue-100', path: '/library/add_books' },
    { label: 'Download Books', icon: '⬇️', bg: 'bg-green-100', path: '/library/download_books' },
    { label: 'View Borrowed Books', icon: '🔍', bg: 'bg-yellow-100', path: '/library/view_borrowed' },
    { label: 'Issued Books', icon: '📖', bg: 'bg-indigo-100', path: '/library/issued_books' },
    { label: 'Read Book', icon: '📚', bg: 'bg-pink-100', path: '/library/read_book' },
  ];

  const issuedBooks = [
    { id: 1, title: 'Clean Code', issuedTo: 'Alice', date: '2025-07-10' },
    { id: 2, title: 'The Pragmatic Programmer', issuedTo: 'Bob', date: '2025-07-08' },
    { id: 3, title: 'Deep Work', issuedTo: 'Charlie', date: '2025-07-05' },
  ];

  return (
    <div
      className="flex min-h-screen bg-gradient-to-br from-[#fef6fb] via-[#f1f5f9] to-[#e7f0fd] text-[#101419]"
      style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}
    >
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-lg rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-2xl font-bold pb-4 text-indigo-600">📚 Library</h2>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all hover:bg-gradient-to-r hover:from-indigo-50 hover:to-pink-50 ${
              item.path === '/library/issued_books' ? 'bg-gradient-to-r from-indigo-100 to-pink-100 font-semibold' : ''
            }`}
          >
            <div className={`w-10 h-10 flex items-center justify-center rounded-xl ${item.bg}`}>
              <span className="text-xl">{item.icon}</span>
            </div>
            <p className="text-base">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10 bg-gradient-to-tr from-[#f0f5ff] to-[#ffffff]">
        <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">📖 Issued Books</h1>
          <div className="overflow-x-auto rounded-xl border border-[#e2e8f0]">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-indigo-50">
                <tr>
                  <th className="py-3 px-4 border-b border-indigo-100 text-left">Book Title</th>
                  <th className="py-3 px-4 border-b border-indigo-100 text-left">Issued To</th>
                  <th className="py-3 px-4 border-b border-indigo-100 text-left">Issue Date</th>
                </tr>
              </thead>
              <tbody>
                {issuedBooks.map((book) => (
                  <tr key={book.id} className="hover:bg-indigo-50 transition">
                    <td className="py-3 px-4 border-b border-gray-100">{book.title}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{book.issuedTo}</td>
                    <td className="py-3 px-4 border-b border-gray-100">{book.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
