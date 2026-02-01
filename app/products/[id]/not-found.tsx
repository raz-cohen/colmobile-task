import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-24 w-24 text-gray-400 dark:text-gray-500"
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

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl mb-4">
          Product Not Found
        </h1>

        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. It may have
          been removed or the link is incorrect.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-lg bg-gray-900 px-6 py-3 text-base font-semibold text-white transition-all hover:bg-gray-800 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Browse Products
          </Link>

          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-base font-semibold text-gray-900 transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
