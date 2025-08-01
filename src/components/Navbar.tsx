'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

const links = [
  { name: 'Home', href: '/home' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="w-full px-4 py-3 flex justify-between items-center border-b border-[#9C7C63] bg-[#F8EFE6]">
      {/* Kiri: Logo */}
      <Link href="/home" className="text-2xl font-bold text-[#a47551]">
        buddy.
      </Link>

      {/* Tengah: Navigasi */}
      <div className="flex gap-6 items-center">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-sm font-medium transition ${
              pathname === link.href ? 'text-[#d65a52] font-semibold' : 'text-gray-600'
            } hover:text-[#d65a52]`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
