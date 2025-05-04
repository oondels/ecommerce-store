import React, { useState } from 'react';
import { X, SlidersHorizontal, ChevronDown, ChevronRight } from 'lucide-react';
import Button from './Button';
import { Category } from '../../types';
import { categories } from '../../data/mockData';

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory?: string;
  onSelectCategory: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  showNew: boolean;
  onShowNewChange: (show: boolean) => void;
  showTrending: boolean;
  onShowTrendingChange: (show: boolean) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
  maxPrice?: number;
}

const FiltersPanel: React.FC<FiltersPanelProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  priceRange,
  onPriceRangeChange,
  showNew,
  onShowNewChange,
  showTrending,
  onShowTrendingChange,
  onApplyFilters,
  onClearFilters,
  maxPrice = 500,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    special: true,
  });

  const toggleSection = (section: 'categories' | 'price' | 'special') => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handlePriceChange = (type: 'min' | 'max', value: number) => {
    if (type === 'min') {
      onPriceRangeChange([value, priceRange[1]]);
    } else {
      onPriceRangeChange([priceRange[0], value]);
    }
  };

  const formatPriceLabel = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      } transition-opacity duration-300 lg:opacity-100 lg:pointer-events-auto lg:static lg:z-auto`}
    >
      {/* Overlay - only on mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 
          ${isOpen ? 'opacity-100' : 'opacity-0'} lg:hidden`}
        onClick={onClose}
      />

      {/* Filters sidebar */}
      <div
        className={`relative w-4/5 max-w-xs bg-white h-full transform transition-transform duration-300 ease-in-out 
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:max-w-[280px] lg:shadow-none lg:border-r border-gray-200`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-secondary-900 flex items-center">
            <SlidersHorizontal size={18} className="mr-2" />
            Filtros
          </h2>
          <button
            onClick={onClose}
            className="text-secondary-500 hover:text-secondary-700 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-180px)] lg:h-auto pb-24 lg:pb-0">
          {/* Categories section */}
          <div className="border-b border-gray-200">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => toggleSection('categories')}
            >
              <span className="font-medium text-secondary-900">Categorias</span>
              {expandedSections.categories ? (
                <ChevronDown size={18} className="text-secondary-500" />
              ) : (
                <ChevronRight size={18} className="text-secondary-500" />
              )}
            </button>
            
            {expandedSections.categories && (
              <div className="px-4 pb-4">
                <ul className="space-y-2">
                  <li>
                    <button
                      className={`w-full text-left py-1 text-sm ${
                        !selectedCategory
                          ? 'font-medium text-primary-500'
                          : 'text-secondary-700 hover:text-secondary-900'
                      }`}
                      onClick={() => onSelectCategory('')}
                    >
                      Todas as Categorias
                    </button>
                  </li>
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left py-1 text-sm ${
                          selectedCategory === category.slug
                            ? 'font-medium text-primary-500'
                            : 'text-secondary-700 hover:text-secondary-900'
                        }`}
                        onClick={() => onSelectCategory(category.slug)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Price range section */}
          <div className="border-b border-gray-200">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => toggleSection('price')}
            >
              <span className="font-medium text-secondary-900">Faixa de Preço</span>
              {expandedSections.price ? (
                <ChevronDown size={18} className="text-secondary-500" />
              ) : (
                <ChevronRight size={18} className="text-secondary-500" />
              )}
            </button>
            
            {expandedSections.price && (
              <div className="px-4 pb-4 space-y-4">
                <div className="flex justify-between items-center text-sm text-secondary-700">
                  <span>{formatPriceLabel(priceRange[0])}</span>
                  <span>{formatPriceLabel(priceRange[1])}</span>
                </div>
                
                <div className="relative h-1 bg-gray-200 rounded-full">
                  <div
                    className="absolute h-full bg-primary-500 rounded-full"
                    style={{
                      left: `${(priceRange[0] / maxPrice) * 100}%`,
                      right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
                    }}
                  ></div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="min-price" className="block text-xs text-secondary-500 mb-1">
                      Preço Mínimo
                    </label>
                    <input
                      type="number"
                      id="min-price"
                      min={0}
                      max={priceRange[1]}
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange('min', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="max-price" className="block text-xs text-secondary-500 mb-1">
                      Preço Máximo
                    </label>
                    <input
                      type="number"
                      id="max-price"
                      min={priceRange[0]}
                      max={maxPrice}
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange('max', Number(e.target.value))}
                      className="w-full border border-gray-300 rounded-md p-2 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Special filters section */}
          <div className="border-b border-gray-200">
            <button
              className="w-full p-4 flex items-center justify-between text-left"
              onClick={() => toggleSection('special')}
            >
              <span className="font-medium text-secondary-900">Especial</span>
              {expandedSections.special ? (
                <ChevronDown size={18} className="text-secondary-500" />
              ) : (
                <ChevronRight size={18} className="text-secondary-500" />
              )}
            </button>
            
            {expandedSections.special && (
              <div className="px-4 pb-4">
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      id="show-new"
                      checked={showNew}
                      onChange={(e) => onShowNewChange(e.target.checked)}
                      className="h-4 w-4 text-primary-500 rounded focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="show-new" className="ml-2 text-sm text-secondary-700">
                      Novidades
                    </label>
                  </li>
                  <li className="flex items-center">
                    <input
                      type="checkbox"
                      id="show-trending"
                      checked={showTrending}
                      onChange={(e) => onShowTrendingChange(e.target.checked)}
                      className="h-4 w-4 text-primary-500 rounded focus:ring-primary-500 border-gray-300"
                    />
                    <label htmlFor="show-trending" className="ml-2 text-sm text-secondary-700">
                      Tendências
                    </label>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Filter actions - only shown on mobile */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 flex space-x-3 lg:hidden">
          <Button
            variant="outline"
            size="md"
            onClick={onClearFilters}
            className="flex-1"
          >
            Limpar Tudo
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              onApplyFilters();
              onClose();
            }}
            className="flex-1"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FiltersPanel;