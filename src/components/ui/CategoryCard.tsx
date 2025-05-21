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
  const IconComponent = (LucideIcons as Record<string, React.FC<{ size?: number }>>)[
    category.icon.charAt(0).toUpperCase() + category.icon.slice(1)
  ] || LucideIcons.Tag;

  return (
    <Link
      to={`/products?category=${category.slug}`}
      className={`group flex flex-col items-center ${
        variant === 'circle' ? 'space-y-4' : 'space-y-3'
      }`}
    >
      <div
        className={`
          relative overflow-hidden bg-white flex items-center justify-center transition-all duration-300 group-hover:shadow-xl
          ${
            variant === 'circle'
              ? 'rounded-full w-24 h-24 sm:w-32 sm:h-32'
              : 'rounded-2xl w-full aspect-square'
          }
        `}
      >
        {variant === 'square' && (
          <img
            src={category.image}
            alt={category.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
        <div
          className={`
            flex items-center justify-center ${
              variant === 'square'
                ? 'absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300'
                : 'bg-gray-50 w-full h-full group-hover:bg-gray-100 transition-colors duration-300'
            }
          `}
        >
          <IconComponent
            size={32}
            className={variant === 'square' ? 'text-white' : 'text-gray-900'}
          />
        </div>
      </div>
      <div className="text-center">
        <h3 className={`font-medium ${
          variant === 'square' ? 'text-lg text-white' : 'text-gray-900'
        }`}>
          {category.name}
        </h3>
        {variant === 'square' && (
          <p className="text-sm text-gray-200 mt-1">
            {category.productsCount} {category.productsCount === 1 ? 'product' : 'products'}
          </p>
        )}
      </div>
    </Link>
  );
};

export default CategoryCard;