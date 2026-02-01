export default function ProductLoading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Image Skeleton */}
          <div className="flex flex-col">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800 shadow-lg animate-pulse" />
          </div>

          {/* Details Skeleton */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            {/* Title Skeleton */}
            <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4 animate-pulse" />

            {/* Category Badge Skeleton */}
            <div className="mt-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded-full w-24 animate-pulse" />
            </div>

            {/* Price Skeleton */}
            <div className="mt-6">
              <div className="h-12 bg-gray-200 dark:bg-gray-800 rounded-lg w-32 animate-pulse" />
            </div>

            {/* Rating Skeleton */}
            <div className="mt-4 flex items-center gap-2">
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-20 animate-pulse" />
              <div className="h-5 bg-gray-200 dark:bg-gray-800 rounded w-32 animate-pulse" />
            </div>

            {/* Description Skeleton */}
            <div className="mt-8">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-4 animate-pulse" />
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 animate-pulse" />
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-4/6 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
