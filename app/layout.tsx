import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import './globals.css';
import Header from '@/components/Header';
import { ScrollRestoration } from '@/components/ScrollRestoration';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Product Catalog - HELLO WORLD',
  description: 'Browse our amazing product catalog',
  openGraph: {
    title: 'Product Catalog - HELLO WORLD',
    description: 'Browse our amazing product catalog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Product Catalog - HELLO WORLD',
    description: 'Browse our amazing product catalog',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <Suspense fallback={null}>
          <ScrollRestoration 
            excludeRoutes={['/products/']}
          />
        </Suspense>
        <Header />
        {children}
      </body>
    </html>
  );
}
