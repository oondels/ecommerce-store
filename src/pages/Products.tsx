import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react';
import ProductGrid from '../components/ui/ProductGrid';
import FiltersPanel from '../components/ui/FiltersPanel';
import Button from '../components/ui/Button';
import { products, categories, getCategoryBySlug } from '../data/mockData';
import { Product } from '../types';

const Products: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isFiltersPanelOpen, setIsFiltersPanelOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showNew, setShowNew] = useState(false);
  const [showTrending, setShowTrending] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  
  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const categoryParam = params.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
    
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    if (minPrice && maxPrice) {
      setPriceRange([parseInt(minPrice), parseInt(maxPrice)]);
    }
    
    const newParam = params.get('new');
    if (newParam === 'true') {
      setShowNew(true);
    }
    
    const trendingParam = params.get('trending');
    if (trendingParam === 'true') {
      setShowTrending(true);
    }
    
    const sortParam = params.get('sort');
    if (sortParam) {
      setSortOption(sortParam);
    }
    
    // Simulate loading
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [location.search]);
  
  // Memoized filtered products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];
    
    // Filter by category
    if (selectedCategory) {
      const category = getCategoryBySlug(selectedCategory);
      if (category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === category.name.toLowerCase()
        );
      }
    }
    
    // Filter by price range
    filtered = filtered.filter(
      (p) => {
        const price = p.discountPrice || p.price;
        return price >= priceRange[0] && price <= priceRange[1];
      }
    );
    
    // Filter by new
    if (showNew) {
      filtered = filtered.filter((p) => p.isNew);
    }
    
    // Filter by trending
    if (showTrending) {
      filtered = filtered.filter((p) => p.isTrending);
    }
    
    // Sort products
    switch (sortOption) {
      case 'price-asc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceA - priceB;
        });
        break;
      case 'price-desc':
        filtered.sort((a, b) => {
          const priceA = a.discountPrice || a.price;
          const priceB = b.discountPrice || b.price;
          return priceB - priceA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        filtered = filtered.sort((a, b) => {
          if (a.isFeatured === b.isFeatured) return 0;
          return a.isFeatured ? -1 : 1;
        });
    }
    
    return filtered;
  }, [selectedCategory, priceRange, showNew, showTrending, sortOption]);
  
  // Update URL when filters change
  const updateUrl = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    if (priceRange[0] > 0) {
      params.set('minPrice', priceRange[0].toString());
    }
    
    if (priceRange[1] < 500) {
      params.set('maxPrice', priceRange[1].toString());
    }
    
    if (showNew) {
      params.set('new', 'true');
    }
    
    if (showTrending) {
      params.set('trending', 'true');
    }
    
    if (sortOption !== 'featured') {
      params.set('sort', sortOption);
    }
    
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  // Handle filter changes
  const handleApplyFilters = () => {
    updateUrl();
    setIsFiltersPanelOpen(false);
  };
  
  const handleClearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500]);
    setShowNew(false);
    setShowTrending(false);
    setSortOption('featured');
    navigate('/products');
  };
  
  // Get active category name
  const getActiveCategoryName = () => {
    if (!selectedCategory) return 'All Products';
    const category = getCategoryBySlug(selectedCategory);
    return category ? category.name : 'All Products';
  };
  
  // Count active filters
  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory) count++;
    if (priceRange[0] > 0 || priceRange[1] < 500) count++;
    if (showNew) count++;
    if (showTrending) count++;
    if (sortOption !== 'featured') count++;
    return count;
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {getActiveCategoryName()}
          </h1>
          <p className="text-gray-600 mt-2">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} available
          </p>
        </div>
        
        {/* Filters and sort bar */}
        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="md"
              leftIcon={<SlidersHorizontal size={16} />}
              className="lg:hidden"
              onClick={() => setIsFiltersPanelOpen(true)}
            >
              Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>
            
            <div className="hidden lg:flex items-center gap-2 flex-wrap">
              {selectedCategory && (
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Category: {getActiveCategoryName()}
                  <button
                    className="ml-2 text-white hover:text-gray-200"
                    onClick={() => {
                      setSelectedCategory('');
                      updateUrl();
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {(priceRange[0] > 0 || priceRange[1] < 500) && (
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Price: ${priceRange[0]} - ${priceRange[1]}
                  <button
                    className="ml-2 text-white hover:text-gray-200"
                    onClick={() => {
                      setPriceRange([0, 500]);
                      updateUrl();
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {showNew && (
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  New Arrivals
                  <button
                    className="ml-2 text-white hover:text-gray-200"
                    onClick={() => {
                      setShowNew(false);
                      updateUrl();
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {showTrending && (
                <div className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Trending
                  <button
                    className="ml-2 text-white hover:text-gray-200"
                    onClick={() => {
                      setShowTrending(false);
                      updateUrl();
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {getActiveFiltersCount() > 0 && (
                <button
                  className="text-gray-600 text-sm hover:text-gray-900"
                  onClick={handleClearFilters}
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Sort by:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setTimeout(updateUrl, 0);
                  }}
                  className="appearance-none bg-white border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm focus:outline-none focus:border-black"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="rating">Best Rating</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters panel - desktop */}
          <div className="lg:w-1/4 xl:w-1/5 hidden lg:block">
            <FiltersPanel
              isOpen={true}
              onClose={() => {}}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              showNew={showNew}
              onShowNewChange={setShowNew}
              showTrending={showTrending}
              onShowTrendingChange={setShowTrending}
              onApplyFilters={handleApplyFilters}
              onClearFilters={handleClearFilters}
              maxPrice={500}
            />
          </div>
          
          {/* Mobile filters panel */}
          <FiltersPanel
            isOpen={isFiltersPanelOpen}
            onClose={() => setIsFiltersPanelOpen(false)}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            showNew={showNew}
            onShowNewChange={setShowNew}
            showTrending={showTrending}
            onShowTrendingChange={setShowTrending}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            maxPrice={500}
          />
          
          {/* Product grid */}
          <div className="lg:w-3/4 xl:w-4/5">
            <ProductGrid
              products={filteredProducts}
              isLoading={isLoading}
              emptyMessage="No products match your selected filters. Try adjusting your criteria."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;