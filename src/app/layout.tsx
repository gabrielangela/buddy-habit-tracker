import './globals.css';
import { Metadata } from 'next';
import ClientLayout from '@/components/ClientLayout';

export const metadata: Metadata = {
  title: 'buddy. - Habit Tracker',
  description: 'Track your daily habits with buddy.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#F8EFE6]">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
