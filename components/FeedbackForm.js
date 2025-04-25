'use client';

import { useState } from 'react';
import { toast } from 'react-hot-toast';

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.message.trim()) newErrors.message = 'Feedback is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitted(false);

    const res = await fetch('/api/submit-feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    setLoading(false);
    if (res.ok) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      toast.success('Feedback submitted !');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-md w-full mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div>
        <label className="block text-sm font-medium mb-1">Full Name</label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Feedback Message</label>
        <textarea
          name="message"
          rows="4"
          value={formData.message}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded bg-white text-black dark:bg-gray-700 dark:text-white"
        />
        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded w-full transition-colors duration-200"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {submitted && (
        <p className="text-green-600 font-medium text-center mt-2">
          Feedback submitted successfully!
        </p>
      )}
    </form>
  );
}
