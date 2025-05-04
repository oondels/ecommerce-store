import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  columns?: number;
  isLoading?: boolean;
  emptyMessage?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  columns = 4,
  isLoading = false,
  emptyMessage = 'Nenhum produto encontrado.',
}) => {
  // Skeleton for loading state
  const renderSkeletons = () => {
    return Array(8)
      .fill(null)
      .map((_, index) => (
        <div key={`skeleton-${index}`} className="bg-white rounded-lg shadow-subtle p-3 space-y-3">
          <div className="rounded-lg bg-gray-200 h-56 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="flex justify-between items-center pt-2">
            <div className="h-5 bg-gray-200 rounded w-1/4 animate-pulse"></div>
            <div className="h-7 w-7 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        </div>
      ));
  };

  // Empty state
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gray-400 mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <p className="text-secondary-600 text-lg">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-${columns} gap-4 lg:gap-6`}>
      {isLoading ? renderSkeletons() : products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;