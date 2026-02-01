'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Products page error:', error);
  }, [error]);

  return (
    <main className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Something went wrong!
        </h1>
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
          We encountered an error while loading the products. Please try again.
        </p>
        {error.message && (
          <p className="mb-8 rounded-lg bg-red-50 dark:bg-red-950 p-4 text-sm text-red-800 dark:text-red-300">
            {error.message}
          </p>
        )}
        <button
          onClick={reset}
          className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
