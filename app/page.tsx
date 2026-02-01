import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Home - Product Catalog',
  description: 'Welcome to our amazing product catalog',
};

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* Hero Heading */}
        <h1 className="mb-6 text-6xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-7xl md:text-8xl">
          HELLO WORLD
        </h1>

        {/* Hero Description */}
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 sm:text-xl md:text-2xl">
          Welcome to our amazing product catalog. Discover a curated collection
          of high-quality products designed to meet your needs.
        </p>

        {/* Call-to-Action Button */}
        <Link
          href="/products"
          className="inline-block rounded-lg bg-gray-900 dark:bg-teal-500 px-8 py-4 text-lg font-semibold text-white dark:text-gray-900 transition-all hover:bg-gray-800 dark:hover:bg-teal-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-teal-500 focus:ring-offset-2"
        >
          Browse Products
        </Link>
      </div>
    </main>
  );
}
