'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditHabitPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Ambil data habit berdasarkan ID
  useEffect(() => {
    const fetchHabit = async () => {
      try {
        const res = await fetch(`/api/habits/${id}`);
        if (!res.ok) throw new Error('Failed to fetch habit');
        const data = await res.json();
        setTitle(data.title || '');
        setDescription(data.description || '');
        setDate(data.date?.split('T')[0] || '');
      } catch (err) {
        console.error(err);
        alert('Failed to load habit');
        router.push('/home');
      } finally {
        setFetching(false);
      }
    };

    if (id) fetchHabit();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date) return alert('Title and Date are required!');
    setLoading(true);

    try {
      const res = await fetch(`/api/habits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, date }),
      });
      if (res.ok) {
        router.push('/home');
      } else {
        alert('Failed to update habit.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <p className="text-center mt-10">Loading...</p>;

  return (
    <main className="min-h-screen bg-[#F8EFE6] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[#a47551]">Edit Habit</h1>

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow max-w-sm w-full space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title *</label>
          <input
            type="text"
            className="w-full rounded p-2 bg-[#f5f5f5]"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            className="w-full rounded p-2 bg-[#f5f5f5]"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full rounded p-2 bg-[#f5f5f5]"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#a47551] text-white px-4 py-2 rounded hover:bg-[#8e6342]"
          >
            {loading ? 'Updating...' : 'Update Habit'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/home')}
            className="text-gray-600 underline text-sm"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
