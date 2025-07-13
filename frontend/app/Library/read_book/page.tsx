'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ReadBookPage() {
  const router = useRouter();

  const menuItems = [
    { label: 'Add Books', icon: '📘', bg: 'bg-blue-100', path: '/library/add_books' },
    { label: 'Download Books', icon: '⬇️', bg: 'bg-green-100', path: '/library/download_books' },
    { label: 'View Borrowed Books', icon: '🔍', bg: 'bg-yellow-100', path: '/library/view_borrowed' },
    { label: 'Issued Books', icon: '📖', bg: 'bg-indigo-100', path: '/library/issued_books' },
    { label: 'Read Book', icon: '📚', bg: 'bg-pink-100', path: '/library/read_book' },
  ];

  const booksToRead = [
    {
      id: 1,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover: '/books/atomic-habits.jpg',
      url: '/read/atomic-habits', // mock URL
    },
    {
      id: 2,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      cover: '/books/clean-code.jpg',
      url: '/read/clean-code',
    },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#fdf6fd] to-[#eef5ff] text-[#101419]" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-md rounded-tr-3xl rounded-br-3xl">
        <h2 className="text-2xl font-bold pb-4 text-pink-600">📚 Library</h2>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className={`flex items-center gap-3 p-2 rounded-xl cursor-pointer transition-all hover:bg-gradient-to-r hover:from-pink-50 hover:to-blue-50 ${
              item.path === '/library/read_book' ? 'bg-gradient-to-r from-pink-100 to-indigo-100 font-semibold' : ''
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
      <div className="flex-1 px-8 py-10 bg-gradient-to-tl from-white to-[#f1f5fb]">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-pink-700 mb-8">📖 Read Books Online</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {booksToRead.map((book) => (
              <div key={book.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transition hover:shadow-xl">
                <Image
                  src={book.cover}
                  alt={book.title}
                  width={400}
                  height={250}
                  className="w-full h-60 object-cover"
                />
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800">{book.title}</h2>
                  <p className="text-sm text-gray-600 mb-4">By {book.author}</p>
                  <button
                    onClick={() => router.push(book.url)}
                    className="bg-gradient-to-r from-pink-500 to-indigo-500 text-white px-4 py-2 rounded-lg font-medium shadow hover:from-pink-600 hover:to-indigo-600 transition"
                  >
                    📖 Read Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
