'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(urlQuery);

  // Sync input when URL changes (browser back/forward)
  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  // Debounce URL updates when user types
  useEffect(() => {
    // Don't update if query matches URL (prevents loops)
    if (query.trim() === urlQuery) {
      return;
    }

    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.trim()) {
        params.set('q', query.trim());
      } else {
        params.delete('q');
      }
      // Use replace + scroll: false to preserve scroll position when filtering
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 300); // Debounce 300ms

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, urlQuery]); // Removed searchParams and router from deps - they're stable refs

  return (
    <div className="w-full">
      <label htmlFor="search" className="sr-only">
        Search products
      </label>
      <input
        id="search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full rounded-lg border border-gray-300 dark:border-gray-700 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:border-gray-900 dark:focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-teal-500 focus:ring-offset-2"
      />
    </div>
  );
}
