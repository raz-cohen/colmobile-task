import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 px-4 py-16">
      <div className="mx-auto max-w-2xl text-center">
        {/* 404 Icon */}
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-100 dark:bg-gray-800 p-4">
            <svg
              className="h-12 w-12 text-gray-600 dark:text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* 404 Heading */}
        <h1 className="mb-4 text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-7xl md:text-8xl">
          404
        </h1>

        {/* Page Not Found Message */}
        <h2 className="mb-4 text-2xl font-semibold text-gray-900 dark:text-gray-100 sm:text-3xl">
          Page Not Found
        </h2>

        <p className="mb-8 text-lg text-gray-600 dark:text-gray-400 sm:text-xl">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. The page may have
          been moved, deleted, or the URL might be incorrect.
        </p>

        {/* Navigation Links */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-block rounded-lg bg-gray-900 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-block rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-gray-900 transition-all hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </main>
  );
}
