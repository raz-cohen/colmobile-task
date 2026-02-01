'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface BackButtonProps {
  fallbackHref?: string;
  label?: string;
  className?: string;
}

export default function BackButton({
  fallbackHref = '/products',
  label = 'Back to Products',
  className,
}: BackButtonProps) {
  const router = useRouter();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // Check if there's navigation history
    // window.history.length > 1 means there's at least one entry to go back to
    setHasHistory(window.history.length > 1 && document.referrer !== '');
  }, []);

  const handleBack = () => {
    if (hasHistory) {
      // Use browser back - preserves scroll position automatically
      router.back();
    } else {
      // No history (direct URL access) - navigate to fallback
      router.push(fallbackHref);
    }
  };

  return (
    <button
      onClick={handleBack}
      className={
        className ||
        'inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors group'
      }
      aria-label={label}
    >
      <svg
        className="h-5 w-5 transition-transform group-hover:-translate-x-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
      {label}
    </button>
  );
}
