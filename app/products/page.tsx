import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllProducts, getProductsByCategory, getCategories } from '@/lib/api';
import ProductList from '@/components/ProductList';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import type { Product, Category } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Products - Product Catalog',
  description: 'Browse our complete product catalog with search and filter options',
};

// Force dynamic rendering since we use searchParams
export const dynamic = 'force-dynamic';

/**
 * Server Component that fetches data based on category only.
 * The 'q' (search) parameter is intentionally ignored here because
 * search filtering is done client-side in the ProductList component.
 * 
 * Note: Even though Next.js re-renders this component when searchParams.q changes,
 * the React cache() wrapper and Next.js fetch cache ensure the data is served
 * from cache (2-5ms) rather than making new API requests (200-500ms).
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string; q?: string };
}) {
  const selectedCategory = searchParams.category || 'all';
  
  // Fetch products and categories
  // React cache() ensures these are memoized within a single render
  // Next.js fetch cache (revalidate) prevents actual API calls
  const [products, categories] = await Promise.all([
    selectedCategory === 'all'
      ? getAllProducts()
      : getProductsByCategory(selectedCategory),
    getCategories(),
  ]);

  return (
    <ProductsLayout products={products} categories={categories} />
  );
}

/**
 * Layout component that renders the UI.
 * Separated to keep the data fetching logic clean.
 */
function ProductsLayout({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white">Products</h1>
        
        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />}>
            <SearchBar />
          </Suspense>
          <Suspense fallback={<div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />}>
            <CategoryFilter categories={categories} />
          </Suspense>
        </div>
      </div>

      {/* Product List - Wrapped in Suspense for useSearchParams */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList products={products} />
      </Suspense>
    </main>
  );
}

function ProductListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm"
        >
          <div className="aspect-square w-full animate-pulse bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-1 flex-col p-4">
            <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mb-3 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mb-3 h-4 w-2/3 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            <div className="mt-auto flex items-center justify-between">
              <div className="h-8 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
              <div className="h-5 w-16 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
