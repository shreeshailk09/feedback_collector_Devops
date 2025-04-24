import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export async function POST(req) {
  try {
    const data = await req.json();

    if (!data.name || !data.email || !data.message) {
      return new Response(JSON.stringify({ error: 'All fields required' }), { status: 400 });
    }

    await addDoc(collection(db, 'feedbacks'), {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: Timestamp.now(),
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Firebase error:', error);
    return new Response(JSON.stringify({ error: 'Error storing feedback' }), { status: 500 });
  }
}
