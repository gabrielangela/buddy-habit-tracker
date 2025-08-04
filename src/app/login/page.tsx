'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password.");
    } else {
      router.push('/home');
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#f7eee6] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow max-w-sm w-full text-center space-y-4"
      >
        <h1 className="text-3xl font-bold text-[#a47551]">buddy.</h1>

        <input
          type="email"
          required
          placeholder="bear@gmail.com"
          className="w-full px-4 py-2 rounded-full bg-[#f5f5f5] border border-gray-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          required
          placeholder="••••••"
          className="w-full px-4 py-2 rounded-full bg-[#f5f5f5] border border-gray-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-[#a47551] text-white font-semibold rounded-full"
        >
          Login with Email
        </button>

        <button
          type="button"
          onClick={() => signIn('google', { callbackUrl: '/home' })}
          className="w-full py-2 bg-[#a47551] text-white font-semibold rounded-full"
        >
          Sign In with Google
        </button>

        <p className="text-sm text-gray-500 pt-2">
          Don’t have an account?{' '}
          <a href="/register" className="text-[#d65a52] font-semibold">
            Register Now
          </a>
        </p>
      </form>
    </main>
  );
}
