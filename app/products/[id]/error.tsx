'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface ProductErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProductError({ error, reset }: ProductErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Product page error:', error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
          Something went wrong!
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">
          We encountered an error while loading this product.
        </p>

        {error.message && (
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-8 mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {error.message}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Try again
          </button>

          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}
