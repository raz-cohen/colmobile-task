interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'spinner' | 'skeleton';
  className?: string;
}

export default function LoadingSpinner({
  size = 'md',
  variant = 'spinner',
  className = '',
}: LoadingSpinnerProps) {
  if (variant === 'skeleton') {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="space-y-4">
          <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    );
  }

  const sizeClasses = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      role="status"
      aria-label="Loading"
    >
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-gray-300 border-t-gray-600 dark:border-gray-600 dark:border-t-gray-300`}
      />
      <span className="sr-only">Loading...</span>
    </div>
  );
}
