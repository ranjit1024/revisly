// BuyCard.tsx
import React, { useState } from 'react';

interface BuyCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  onBuyClick?: () => Promise<void> | void;
}

const BuyCard: React.FC<BuyCardProps> = ({ 
  image, 
  title, 
  description, 
  price, 
  originalPrice, 
  badge,
  onBuyClick 
}) => {
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleBuyClick = async (): Promise<void> => {
    setIsAdding(true);
    await onBuyClick?.();
    setIsAdding(false);
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-64 object-cover"
        />
        {badge && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {description}
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-500 line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleBuyClick}
          disabled={isAdding}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          {isAdding ? 'Adding to Cart...' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default BuyCard;
