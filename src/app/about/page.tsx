export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-4">about <span className="text-[#a47551]">buddy.</span></h1>
      <p className="text-lg text-gray-700 mb-6">
        <span className="font-semibold">buddy.</span> is designed for people who believe in the power of small, consistent actions. We've created a clean, distraction-free habit tracking experience that helps you focus on what truly matters—building the life you want, one day at a time.
      </p>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">What Makes Buddy Different</h2>
        <div className="space-y-3 text-gray-600">
          <p>• <span className="font-medium">Simplicity first</span> — No overwhelming features or complicated setups. Just you and your habits.</p>
          <p>• <span className="font-medium">Privacy focused</span> — Your data stays secure with Google Authentication and encrypted storage.</p>
          <p>• <span className="font-medium">Flexible tracking</span> — Add, modify, or remove habits as your life evolves.</p>
          <p>• <span className="font-medium">Responsive design</span> — Works seamlessly across all your devices.</p>
        </div>
      </div>

      <div className="bg-gray-50 p-6 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Built With Care</h3>
        <p className="text-gray-600">
          Crafted using modern web technologies including Next.js, Tailwind CSS, PostgreSQL (via Neon), and Prisma. 
          Every component is optimized for performance and user experience, ensuring buddy runs smoothly 
          whether you're on mobile or desktop.
        </p>
      </div>
      
      <p className="text-sm text-gray-500 italic">
        "The secret of getting ahead is getting started. The secret of getting started is breaking your complex overwhelming tasks into small manageable tasks, and starting on the first one." — Mark Twain
      </p>
    </div>
  );
}