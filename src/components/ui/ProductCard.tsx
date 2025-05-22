import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import RatingStars from './RatingStars';
import { Product } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  size?: 'sm' | 'md' | 'lg';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, size = 'md' }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity: 1,
    });
  };
  
  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: crypto.randomUUID(),
        productId: product.id,
        addedAt: new Date().toISOString(),
      });
    }
  };

  const cardClasses = {
    sm: 'max-w-[200px]',
    md: 'max-w-[280px]',
    lg: 'max-w-[320px]',
  };
  
  const imageHeightClasses = {
    sm: 'h-40',
    md: 'h-64',
    lg: 'h-72',
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl ${cardClasses[size]}`}
    >
      <div className="relative">
        <div className={`overflow-hidden ${imageHeightClasses[size]}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-black text-white text-xs font-medium px-3 py-1.5 rounded-full">
              New
            </span>
          )}
          {product.discountPrice && (
            <span className="bg-red-500 text-white text-xs font-medium px-3 py-1.5 rounded-full">
              -{Math.round((1 - product.discountPrice / product.price) * 100)}%
            </span>
          )}
        </div>
        
        <button
          onClick={handleToggleWishlist}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors"
        >
          <Heart
            size={18}
            className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'}
          />
        </button>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <RatingStars
            rating={product.rating}
            size={size === 'lg' ? 'md' : 'sm'}
            showCount={size !== 'sm'}
            count={product.reviews}
          />
        </div>

        <h3 className="font-medium text-gray-900 dark:text-white mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
          {product.shortDescription}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-semibold text-gray-900 dark:text-white">
              {formatCurrency(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-400 dark:text-gray-500 line-through">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="flex items-center justify-center w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;