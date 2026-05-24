import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Trip Trekker — Adventure & Trekking Travel Platform',
  description:
    'Discover destinations, plan trekking routes, explore curated travel packages, and get instant support from the Trekker Assistant.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
