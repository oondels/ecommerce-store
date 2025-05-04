import React from 'react';
import { Link } from 'react-router-dom';
import { Category } from '../../types';
import * as LucideIcons from 'lucide-react';

interface CategoryCardProps {
  category: Category;
  variant?: 'circle' | 'square';
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  variant = 'circle',
}) => {
  // Dynamically get the Lucide icon if it exists
  const IconComponent = (LucideIcons as Record<string, React.FC<{ size?: number }>>)[
    category.icon.charAt(0).toUpperCase() + category.icon.slice(1)
  ] || LucideIcons.Tag;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className={`group flex flex-col items-center ${
        variant === 'circle' ? 'space-y-3' : 'space-y-2'
      }`}
    >
      <div
        className={`
          relative overflow-hidden bg-white flex items-center justify-center shadow-subtle transition-all duration-300 group-hover:shadow-card
          ${
            variant === 'circle'
              ? 'rounded-full w-20 h-20 sm:w-24 sm:h-24'
              : 'rounded-lg w-24 h-24 sm:w-32 sm:h-32'
          }
        `}
      >
        {variant === 'square' && (
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div
          className={`
            flex items-center justify-center ${
              variant === 'square'
                ? 'absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300'
                : 'bg-gray-100 w-full h-full group-hover:bg-primary-50 transition-colors duration-300'
            }
          `}
        >
          <IconComponent
            size={24}
            className={`
              ${
                variant === 'square'
                  ? 'text-white'
                  : 'text-primary-500'
              }
            `}
          />
        </div>
      </div>
      <span
        className={`text-sm font-medium text-center ${
          variant === 'square' ? 'text-secondary-900' : 'text-secondary-700'
        }`}
      >
        {category.name}
      </span>
      {variant === 'square' && (
        <span className="text-xs text-gray-500">
          {category.productsCount} {category.productsCount === 1 ? 'product' : 'products'}
        </span>
      )}
    </Link>
  );
};

export default CategoryCard;