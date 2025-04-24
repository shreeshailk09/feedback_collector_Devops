import FeedbackList from '@/components/FeedbackList';
import '../globals.css';

export default function AdminPage() {
  return (
    <main className="min-h-screen p-4 bg-gray-100 dark:bg-gray-800">
      <h1 className="text-xl font-semibold mb-4">Submitted Feedback</h1>
      FeedbackList 
    </main>
  );
}
