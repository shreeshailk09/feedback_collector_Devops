'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

export default function FeedbackList() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const res = await fetch('/api/feedbacks');
        const data = await res.json();
        setFeedbacks(data);
      } catch (err) {
        console.error('Failed to fetch feedbacks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const getInitials = (name) =>
    name
      .split(' ')
      .map((n) => n[0]?.toUpperCase())
      .join('')
      .slice(0, 2);

  if (loading) return <p className="text-gray-600 dark:text-gray-300">Loading feedbacks...</p>;
  if (feedbacks.length === 0) return <p className="text-gray-600 dark:text-gray-300">No feedbacks yet.</p>;

  return (
    <div>
      <p className="mb-4 text-sm text-gray-600 dark:text-gray-400 font-bold">
        Total Feedbacks: {feedbacks.length}
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {feedbacks.map(({ id, name, email, message, timestamp }) => (
          <div
            key={id}
            className="flex flex-col rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 hover:bg-blue-600 cursor-pointer text-white flex items-center justify-center text-sm font-bold">
                {getInitials(name)}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 break-all w-full">{email}</p>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 break-all w-full">{message}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 mt-auto">
              {timestamp && format(new Date(timestamp), 'PPpp')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
