"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Habit = {
  id: number;
  title: string;
  description?: string;
  date: string;
};

export default function HomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = selectedDate.toISOString().split("T")[0];

  const fetchHabits = async () => {
    try {
      const res = await fetch(`/api/habits?date=${formattedDate}`);
      const data = await res.json();
      setHabits(data);
    } catch (err) {
      console.error("Error fetching habits:", err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, [formattedDate]);

  const get7DaysCenteredToday = () => {
    const today = new Date();
    const dates = [];
    for (let i = -3; i <= 3; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this habit?")) return;
    await fetch(`/api/habits/${id}`, { method: "DELETE" });
    fetchHabits();
  };

  return (
    <main className="min-h-screen bg-[#F8EFE6] px-4 py-8 flex flex-col items-center">
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">
            your daily <span className="text-[#a47551]">habit tracker.</span>
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>
              Logged in as <strong>{session?.user?.email}</strong>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="bg-[#a47551] text-white px-3 py-1 rounded hover:bg-[#8e6342] text-sm"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="flex justify-center gap-2 mt-8 mb-4">
          {get7DaysCenteredToday().map((date, idx) => {
            const day = date.getDate();
            const isSelected =
              date.toDateString() === selectedDate.toDateString();
            return (
              <button
                key={idx}
                onClick={() => setSelectedDate(date)}
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm ${
                  isSelected ? "bg-black text-white" : "bg-white text-gray-700"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>

        {/* Date + Add */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <button
            className="bg-[#a47551] text-white px-4 py-2 rounded hover:bg-[#8e6342]"
            onClick={() => router.push("/add-habit")}
          >
            Add Habit
          </button>
        </div>

        {/* Habit List */}
        <div className="space-y-4">
          {habits.length === 0 ? (
            <p className="text-gray-500">No habits for this day.</p>
          ) : (
            habits.map((habit) => (
              <div
                key={habit.id}
                className="bg-white shadow p-4 rounded-[10px] flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{habit.title}</p>
                  <p className="text-sm text-gray-500">{habit.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 rounded bg-[#DBAE8C] text-white text-sm"
                    onClick={() => router.push(`/edit-habit/${habit.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-[#9C6363] text-white text-sm"
                    onClick={() => handleDelete(habit.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
