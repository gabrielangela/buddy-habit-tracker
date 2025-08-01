'use client';

import { useActionState } from 'react';
import { registerUser } from './actions';

export default function RegisterPage() {
  const [formState, action] = useActionState(registerUser, { error: null });

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7eee6] px-4">
      <form
        action={action}
        className="bg-white p-8 rounded-2xl shadow max-w-sm w-full text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#a47551]">buddy.</h1>

        <input
          name="email"
          type="email"
          required
          placeholder="buddt@gmail.com"
          className="w-full px-4 py-2 rounded-full bg-[#f5f5f5] border border-gray-200"
        />
        <input
          name="password"
          type="password"
          required
          placeholder="••••••"
          className="w-full px-4 py-2 rounded-full bg-[#f5f5f5] border border-gray-200"
        />

        {formState.error && (
          <p className="text-sm text-red-500">{formState.error}</p>
        )}

        <button
          type="submit"
          className="w-full py-2 bg-[#a47551] text-white font-semibold rounded-full"
        >
          Register with Email
        </button>

        <p className="text-sm text-gray-500 pt-2">
          Already have an account?{' '}
          <a href="/login" className="text-[#d65a52] font-semibold">
            Login Now
          </a>
        </p>
      </form>
    </main>
  );
}