'use client';

import { useEffect } from 'react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by error boundary:', error);
    }
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === 'development';

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-100 dark:bg-red-900 p-4">
            <svg
              className="h-12 w-12 text-red-600 dark:text-red-400"
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
        </div>

        {/* Error Heading */}
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
          Something went wrong!
        </h1>

        {/* User-friendly Error Message */}
        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          We apologize for the inconvenience. An unexpected error has occurred.
          Please try again or return to the home page.
        </p>

        {/* Error Details (Development Only) */}
        {isDevelopment && (
          <div className="mb-8 rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950 p-4 text-left">
            <h2 className="mb-2 text-sm font-semibold text-red-900 dark:text-red-400">
              Error Details (Development Only):
            </h2>
            <p className="mb-2 text-sm text-red-800 dark:text-red-300">
              <span className="font-medium">Message:</span> {error.message}
            </p>
            {error.digest && (
              <p className="mb-2 text-sm text-red-800 dark:text-red-300">
                <span className="font-medium">Digest:</span> {error.digest}
              </p>
            )}
            {error.stack && (
              <details className="mt-2">
                <summary className="cursor-pointer text-sm font-medium text-red-900 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300">
                  Stack Trace
                </summary>
                <pre className="mt-2 max-h-48 overflow-auto rounded bg-red-100 dark:bg-red-900 p-2 text-xs text-red-900 dark:text-red-400">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={reset}
            className="inline-block rounded-lg bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Try Again
          </button>
          <a
            href="/"
            className="inline-block rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-8 py-4 text-lg font-semibold text-gray-900 dark:text-white transition-all hover:border-gray-400 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-teal-500 focus:ring-offset-2"
          >
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}
