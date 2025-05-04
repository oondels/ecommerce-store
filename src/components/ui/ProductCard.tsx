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
  
  // Determine classes based on size
  const cardClasses = {
    sm: 'max-w-[200px]',
    md: 'max-w-[280px]',
    lg: 'max-w-[320px]',
  };
  
  const imageHeightClasses = {
    sm: 'h-40',
    md: 'h-56',
    lg: 'h-64',
  };
  
  const titleClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };
  
  const priceClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className={`group bg-white rounded-lg overflow-hidden shadow-subtle transition-all duration-300 hover:shadow-card ${cardClasses[size]}`}
    >
      <div className="relative">
        {/* Product image */}
        <div className={`overflow-hidden ${imageHeightClasses[size]}`}>
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        {/* Labels */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">Novo</span>
          )}
          {product.discountPrice && (
            <span className="bg-error-500 text-white text-xs font-medium px-2 py-1 rounded">
              {Math.round((1 - product.discountPrice / product.price) * 100)}% Off
            </span>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <button
            onClick={handleToggleWishlist}
            className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
          >
            <Heart
              size={18}
              className={isInWishlist(product.id) ? 'fill-error-500 text-error-500' : 'text-secondary-500'}
            />
          </button>
        </div>
      </div>
      
      {/* Product info */}
      <div className="p-3">
        <h3 className={`font-medium text-secondary-900 mb-1 ${titleClasses[size]}`}>
          {product.name}
        </h3>
        
        <div className="mb-2">
          <RatingStars
            rating={product.rating}
            size={size === 'lg' ? 'md' : 'sm'}
            showCount={size !== 'sm'}
            count={product.reviews}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className={`font-semibold text-secondary-900 ${priceClasses[size]}`}>
              {formatCurrency(product.discountPrice || product.price)}
            </span>
            {product.discountPrice && (
              <span className="text-gray-500 line-through text-sm">
                {formatCurrency(product.price)}
              </span>
            )}
          </div>
          
          <button
            onClick={handleAddToCart}
            className="p-2 bg-primary-500 rounded-full text-white shadow-sm hover:bg-primary-600 transition-colors"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;