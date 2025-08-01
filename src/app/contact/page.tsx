'use client';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F8EFE6] flex flex-col items-center justify-center px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-[#a47551]">contact buddy.</h1>

      <form className="bg-white p-8 rounded-2xl shadow max-w-md w-full space-y-5">
        <div>
          <label className="block text-sm font-medium text-[#a47551] mb-1">Name</label>
          <input
            type="text"
            required
            className="w-full rounded-lg p-3 bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d65a52]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a47551] mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full rounded-lg p-3 bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d65a52]"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-[#a47551] mb-1">Message</label>
          <textarea
            rows={4}
            required
            className="w-full rounded-lg p-3 bg-[#f5f5f5] focus:outline-none focus:ring-2 focus:ring-[#d65a52]"
            placeholder="Write your message..."
          />
        </div>

        <button
          type="submit"
          className="bg-[#d65a52] hover:bg-[#b44e45] text-white font-semibold py-2 px-4 rounded-lg transition w-full"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-center text-sm text-gray-600">
        <p className="mb-2">You can also reach us via:</p>
        <ul className="space-y-1">
          <li>
            Email: <a href="mailto:contact@buddy.com" className="text-[#d65a52] underline">contact@buddy.com</a>
          </li>
          <li>
            Instagram: <a href="https://instagram.com/buddyhabittracker" target="_blank" className="text-[#d65a52] underline">@buddyhabittracker</a>
          </li>
        </ul>
      </div>
    </main>
  );
}
