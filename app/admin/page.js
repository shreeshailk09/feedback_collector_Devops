'use client';

import { useState } from 'react';
import FeedbackList from '@/components/FeedbackList';
import '../globals.css';

export default function AdminPage() {
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-20 px-6">
      <section className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Admin View
        </h1>
        
        <button
          onClick={() => setShowFeedback(prev => !prev)}
          className="mb-6 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
        >
          {showFeedback ? 'Hide Feedback' : 'View Submitted Feedback'}
        </button>

        {showFeedback && (
          <div className="grid gap-4">
            <FeedbackList />
          </div>
        )}
      </section>
    </main>
  );
}
