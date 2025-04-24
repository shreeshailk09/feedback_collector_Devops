'use client';

import { useState, useEffect, useRef } from 'react';
import { FaCog } from 'react-icons/fa';
import { Switch } from '@headlessui/react';

export default function ThemeSettings() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const panelRef = useRef();

  // Toggle dark mode class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [enabled]);

  // Close settings when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Gear Icon Button */}
      <button
        onClick={() => setOpen(!open)}
        className="text-white bg-green-700 p-2 rounded-full shadow-md hover:bg-green-800 transition"
        title="Settings"
      >
        <FaCog className="hover:animate-spin transition-transform duration-300" />
      </button>

      {/* Settings Panel */}
      {open && (
        <div
          ref={panelRef}
          className="mt-2 w-64 bg-gray-800 text-white p-4 rounded-lg shadow-xl transition-all duration-300 ease-in-out"
        >
          <h3 className="font-bold mb-2">Settings</h3>
          <div className="flex items-center justify-between">
            <span>Mode</span>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-green-700' : 'bg-gray-400'
              } relative inline-flex h-6 w-11 items-center rounded-full transition`}
            >
              <span
                className={`${
                  enabled ? 'translate-x-6' : 'translate-x-1'
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
            </Switch>
          </div>
          <p className="text-sm mt-2 text-gray-400">
            {enabled ? 'Dark mode enabled' : 'Light mode enabled'}
          </p>
        </div>
      )}
    </div>
  );
}
