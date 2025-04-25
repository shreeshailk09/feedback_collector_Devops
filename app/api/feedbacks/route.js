import { db } from '@/lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET() {
  try {
    const q = query(collection(db, 'feedbacks'), orderBy('timestamp', 'desc'));
    const querySnapshot = await getDocs(q);

    const feedbacks = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate().toISOString() || null,
    }));

    return new Response(JSON.stringify(feedbacks), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching feedbacks:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch feedbacks' }), {
      status: 500,
    });
  }
}
