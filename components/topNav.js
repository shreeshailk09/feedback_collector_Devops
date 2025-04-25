// components/TopNav.js
'use client';

import { useState, useRef, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import Link from 'next/link';

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef();

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      {/* User Icon */}
      <button
        onClick={() => setOpen(!open)}
        className="text-blue-500 hover:text-blue-600 text-2xl hover:animate-wiggle transition-transform duration-300"
        title="User Menu"
      >
        <FaUserCircle />
        
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg z-50"
        >
          <Link
            href="/"
            className="block px-4 py-2 hover:bg-gray-700 rounded-t-md"
            onClick={() => setOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/admin"
            className="block px-4 py-2 hover:bg-gray-700 rounded-b-md"
            onClick={() => setOpen(false)}
          >
            Admin
          </Link>
        </div>
      )}
    </div>
  );
};

export default TopNav;
