import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
  count?: number;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 'md',
  showCount = false,
  count,
}) => {
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const starSize = sizeMap[size];
  const textSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';

  // Create an array of length maxRating
  const stars = Array.from({ length: maxRating }, (_, i) => {
    // Calculate the fill percentage for this star
    const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;
    
    return (
      <span key={i} className="relative inline-block">
        {/* Empty star (background) */}
        <Star className={`${starSize} text-gray-300`} />
        
        {/* Filled star (overlay) */}
        <span 
          className="absolute inset-0 overflow-hidden" 
          style={{ width: `${fillPercentage}%` }}
        >
          <Star className={`${starSize} text-yellow-400`} />
        </span>
      </span>
    );
  });

  return (
    <div className="flex items-center">
      <div className="flex">{stars}</div>
      {showCount && count !== undefined && (
        <span className={`ml-2 text-secondary-500 ${textSize}`}>
          ({count})
        </span>
      )}
    </div>
  );
};

export default RatingStars;