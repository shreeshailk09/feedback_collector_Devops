import FeedbackForm from '@/components/FeedbackForm';
import './globals.css';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Feedback Collector</h1>
        <FeedbackForm />
      </div>
    </main>
  );
}
