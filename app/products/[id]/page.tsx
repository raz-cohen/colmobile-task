import { notFound } from 'next/navigation';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getProductById } from '@/lib/api';
import type { Product } from '@/lib/types';
import BackButton from '@/components/BackButton';

interface ProductPageProps {
  params: { id: string };
}

// Enable dynamic params without pre-generating all product pages
// This ensures we only fetch the specific product by ID when requested
// ISR caching is still enabled via the revalidate option in getProductById
export const dynamicParams = true;

// Generate dynamic metadata for SEO
export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  try {
    const productId = parseInt(params.id, 10);
    
    if (isNaN(productId)) {
      return {
        title: 'Product Not Found',
        description: 'The requested product could not be found.',
      };
    }

    const product = await getProductById(productId);

    return {
      title: `${product.title} - Product Catalog`,
      description: product.description,
      openGraph: {
        title: product.title,
        description: product.description,
        images: [
          {
            url: product.image,
            width: 1200,
            height: 630,
            alt: product.title,
          },
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.description,
        images: [product.image],
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const productId = parseInt(params.id, 10);

  // Handle invalid ID format
  if (isNaN(productId)) {
    notFound();
  }

  let product: Product;
  try {
    product = await getProductById(productId);
  } catch (error) {
    // If product fetch fails, show 404
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button - Preserves scroll position */}
        <div className="mb-8">
          <BackButton />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start">
          {/* Product Image */}
          <div className="flex flex-col">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 shadow-lg dark:shadow-gray-900/50">
              <Image
                src={product.image}
                alt={product.title}
                width={800}
                height={800}
                className="h-full w-full object-contain object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              {product.title}
            </h1>

            {/* Category Badge */}
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-sm font-medium text-gray-800 dark:text-gray-200 capitalize">
                {product.category}
              </span>
            </div>

            {/* Price */}
            <div className="mt-6">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex items-center">
                <svg
                  className="h-5 w-5 text-yellow-400 dark:text-yellow-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {product.rating.rate}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                ({product.rating.count} reviews)
              </span>
            </div>

            {/* Description */}
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Description
              </h2>
              <p className="mt-2 text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
