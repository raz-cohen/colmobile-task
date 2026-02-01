import Link from 'next/link';
import type { Product } from '@/lib/types';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-900/50 transition-all hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/70"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-gray-900 dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-200">
          {product.title}
        </h3>
        <p className="mb-3 line-clamp-2 flex-1 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <span>★</span>
            <span>{product.rating.rate.toFixed(1)}</span>
            <span className="text-gray-400 dark:text-gray-400">({product.rating.count})</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
