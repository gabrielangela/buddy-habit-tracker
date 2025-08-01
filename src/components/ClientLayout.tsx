'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideNavbar =
    pathname.startsWith('/login') || pathname.startsWith('/register');

  return (
    <SessionProvider>
      {!hideNavbar && <Navbar />}
      {children}
    </SessionProvider>
  );
}