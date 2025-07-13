'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Book = {
  id: number;
  title: string;
  author: string;
  image: string;
};

const booksData: Book[] = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", image: "/books/clean-code.jpg" },
  { id: 2, title: "Atomic Habits", author: "James Clear", image: "/books/atomic-habits.jpg" },
  { id: 3, title: "The Pragmatic Programmer", author: "Andrew Hunt", image: "/books/pragmatic-programmer.jpg" },
  { id: 4, title: "Deep Work", author: "Cal Newport", image: "/books/deep-work.jpg" },
];

export default function LibraryDashboard() {
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState<Book[]>([]);
  const [showCart, setShowCart] = useState(false);

  const router = useRouter();

  const filteredBooks = booksData.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (book: Book) => {
    if (!cart.find((b) => b.id === book.id)) {
      setCart([...cart, book]);
    }
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter((b) => b.id !== id));
  };

  const handleSubmitRequest = () => {
    alert(`Book request submitted for:\n${cart.map((b) => b.title).join('\n')}`);
    setCart([]);
    setShowCart(false);
  };

  // ✅ Updated menu items list with new routes
  const menuItems = [
    { label: "Add Books", icon: "📘", path: "/library/add_books" },
    { label: "Download Books", icon: "⬇️", path: "/library/download_books" },
    { label: "View Borrowed Books", icon: "🔍", path: "/library/view_borrowed" },
    { label: "Issued Books", icon: "📖", path: "/library/issued_books" },
    { label: "Read Book", icon: "📚", path: "/library/read_book" },
  ];

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#f9fafb] to-[#edf2f7] text-[#101419]" style={{ fontFamily: '"Public Sans", "Noto Sans", sans-serif' }}>
      {/* Sidebar */}
      <div className="w-64 p-6 flex flex-col gap-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold pb-4">Library Dashboard</h2>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => router.push(item.path)}
            className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
          >
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-blue-100">
              <span>{item.icon}</span>
            </div>
            <p className="text-base font-medium">{item.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 px-8 py-10">
        <div className="max-w-5xl mx-auto">
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search for books..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-400 rounded-lg p-3 mb-6 transition"
          />

          {/* Book Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredBooks.map((book) => (
              <div key={book.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={400}
                  height={250}
                  className="w-full h-52 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">By {book.author}</p>
                  <button
                    onClick={() => addToCart(book)}
                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                  >
                    ➕ Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Button */}
      {cart.length > 0 && (
        <button
          onClick={() => setShowCart(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg text-sm font-semibold"
        >
          🛒 View Cart ({cart.length})
        </button>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-lg shadow-2xl border border-gray-300 relative">
            <button
              onClick={() => setShowCart(false)}
              className="absolute top-2 right-3 text-xl font-bold text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cart.length === 0 ? (
              <p>No books in cart.</p>
            ) : (
              <ul className="space-y-3 mb-4">
                {cart.map((book) => (
                  <li key={book.id} className="flex justify-between items-center">
                    <span>{book.title}</span>
                    <button
                      onClick={() => removeFromCart(book.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleSubmitRequest}
              className="bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700"
            >
              📤 Submit Book Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
