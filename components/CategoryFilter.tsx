'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import type { Category } from '@/lib/types';

interface CategoryFilterProps {
  categories: Category[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get('category') || 'all';

  const updateCategory = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    // Use push + scroll: false to preserve scroll position when filtering
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => updateCategory('all')}
        className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
          selectedCategory === 'all'
            ? 'bg-gray-900 dark:bg-teal-500 text-white dark:text-gray-900'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => updateCategory(category)}
          className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 dark:focus:ring-teal-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${
            selectedCategory === category
              ? 'bg-gray-900 dark:bg-teal-500 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
