export default function Loading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="mb-6 h-10 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />
        
        {/* Search and Filter Skeletons */}
        <div className="mb-6 space-y-4">
          <div className="h-10 w-full animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-32 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid Skeleton */}
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
    </main>
  );
}
