import { cache } from 'react';
import { unstable_cache } from 'next/cache';
import { Product, Category } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://fakestoreapi.com';
const FETCH_TIMEOUT = 10000; // 10 seconds

/**
 * Fetch with timeout support
 */
async function fetchWithTimeout(url: string, options: RequestInit = {}): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timeout');
    }
    throw error;
  }
}

/**
 * Validates category name to prevent path traversal attacks
 */
function validateCategory(category: string): void {
  if (!/^[a-zA-Z0-9\s'-]+$/.test(category)) {
    throw new Error('Invalid category name');
  }
}

/**
 * Fetches all products from the FakeStore API
 * Uses multi-layer caching:
 * - React cache() for per-request memoization
 * - unstable_cache() for cross-request caching
 * - Next.js fetch cache with 5-minute revalidation
 * @returns Promise resolving to an array of Product objects
 * @throws Error if the fetch fails or response is not ok
 */
export const getAllProducts = cache(async (): Promise<Product[]> => {
  return unstable_cache(
    async () => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/products`, {
          next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
          const errorMessage = process.env.NODE_ENV === 'development'
            ? `Failed to fetch products: ${response.status} ${response.statusText}`
            : 'Failed to fetch products. Please try again later.';
          throw new Error(errorMessage);
        }

        const products: Product[] = await response.json();
        return products;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching products: ${error.message}`);
        }
        throw new Error('Unknown error occurred while fetching products');
      }
    },
    ['all-products'],
    {
      revalidate: 300,
      tags: ['products'],
    }
  )();
});

/**
 * Fetches a single product by ID from the FakeStore API
 * Note: Next.js automatically deduplicates fetch() calls across generateMetadata() 
 * and page components, so even though this function may be called twice per page load,
 * only one network request is made. The second call uses Next.js's fetch cache.
 * @param id - The product ID to fetch
 * @returns Promise resolving to a Product object
 * @throws Error if the fetch fails or response is not ok
 */
export async function getProductById(id: number): Promise<Product> {
  try {
    // Validate product ID
    if (id <= 0 || id > Number.MAX_SAFE_INTEGER) {
      throw new Error('Invalid product ID');
    }

    const url = `${API_BASE_URL}/products/${id}`;
    const response = await fetchWithTimeout(url, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorMessage = process.env.NODE_ENV === 'development'
        ? `Failed to fetch product ${id}: ${response.status} ${response.statusText}`
        : 'Failed to fetch product. Please try again later.';
      throw new Error(errorMessage);
    }

    const product: Product = await response.json();
    return product;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching product ${id}: ${error.message}`);
    }
    throw new Error(`Unknown error occurred while fetching product ${id}`);
  }
}

/**
 * Fetches products by category from the FakeStore API
 * Uses multi-layer caching:
 * - React cache() for per-request memoization
 * - unstable_cache() for cross-request caching
 * - Next.js fetch cache with 5-minute revalidation
 * @param category - The category name to filter products by
 * @returns Promise resolving to an array of Product objects
 * @throws Error if the fetch fails or response is not ok
 */
export const getProductsByCategory = cache(async (category: string): Promise<Product[]> => {
  return unstable_cache(
    async () => {
      try {
        // Validate category to prevent injection attacks
        validateCategory(category);

        const response = await fetchWithTimeout(`${API_BASE_URL}/products/category/${encodeURIComponent(category)}`, {
          next: { revalidate: 300 }, // Cache for 5 minutes
        });

        if (!response.ok) {
          const errorMessage = process.env.NODE_ENV === 'development'
            ? `Failed to fetch products for category ${category}: ${response.status} ${response.statusText}`
            : 'Failed to fetch products. Please try again later.';
          throw new Error(errorMessage);
        }

        const products: Product[] = await response.json();
        return products;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching products for category ${category}: ${error.message}`);
        }
        throw new Error(`Unknown error occurred while fetching products for category ${category}`);
      }
    },
    [`products-category-${category}`],
    {
      revalidate: 300,
      tags: ['products', `category-${category}`],
    }
  )();
});

/**
 * Fetches all product categories from the FakeStore API
 * Uses multi-layer caching:
 * - React cache() for per-request memoization
 * - unstable_cache() for cross-request caching
 * - Next.js fetch cache with 1-hour revalidation
 * @returns Promise resolving to an array of Category strings
 * @throws Error if the fetch fails or response is not ok
 */
export const getCategories = cache(async (): Promise<Category[]> => {
  return unstable_cache(
    async () => {
      try {
        const response = await fetchWithTimeout(`${API_BASE_URL}/products/categories`, {
          next: { revalidate: 3600 },
        });

        if (!response.ok) {
          const errorMessage = process.env.NODE_ENV === 'development'
            ? `Failed to fetch categories: ${response.status} ${response.statusText}`
            : 'Failed to fetch categories. Please try again later.';
          throw new Error(errorMessage);
        }

        const categories: Category[] = await response.json();
        return categories;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error fetching categories: ${error.message}`);
        }
        throw new Error('Unknown error occurred while fetching categories');
      }
    },
    ['categories'],
    {
      revalidate: 3600,
      tags: ['categories'],
    }
  )();
});
