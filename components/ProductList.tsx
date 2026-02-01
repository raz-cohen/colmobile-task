'use client';

import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';
import type { Product } from '@/lib/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  // Memoize filtered products to prevent unnecessary recalculations
  const filteredProducts = useMemo(() => {
    if (!query) {
      return products;
    }
    
    return products.filter((product) => {
      return (
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
      );
    });
  }, [products, query]);

  return (
    <div className="w-full">
      {filteredProducts.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-lg text-gray-600 dark:text-gray-400">No products found.</p>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try adjusting your search or filter criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
