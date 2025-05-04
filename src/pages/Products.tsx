import React, { useState, useEffect } from 'react';
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
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  
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
  
  // Apply filters and sort
  useEffect(() => {
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
    
    setFilteredProducts(filtered);
  }, [selectedCategory, priceRange, showNew, showTrending, sortOption]);
  
  // Update URL when filters change
  const updateUrl = () => {
    const params = new URLSearchParams();
    
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    
    if (showNew) {
      params.set('new', 'true');
    }
    
    if (showTrending) {
      params.set('trending', 'true');
    }
    
    params.set('sort', sortOption);
    
    navigate(`${location.pathname}?${params.toString()}`);
  };
  
  // Handle filter changes
  const handleApplyFilters = () => {
    updateUrl();
  };
  
  const handleClearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500]);
    setShowNew(false);
    setShowTrending(false);
    setSortOption('featured');
    
    navigate('/products');
  };
  
  const toggleFiltersPanel = () => {
    setIsFiltersPanelOpen(!isFiltersPanelOpen);
  };
  
  // Get active category name
  const getActiveCategoryName = () => {
    if (!selectedCategory) return 'Todos os Produtos';
    const category = getCategoryBySlug(selectedCategory);
    return category ? category.name : 'Todos os Produtos';
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
          <h1 className="text-3xl font-bold text-secondary-900">
            {getActiveCategoryName()}
          </h1>
          <p className="text-secondary-600 mt-2">
            Descubra nossa seleção de produtos premium
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
              onClick={toggleFiltersPanel}
            >
              Filtros {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
            </Button>
            
            <div className="hidden lg:flex items-center gap-2">
              {selectedCategory && (
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Categoria: {getActiveCategoryName()}
                  <button
                    className="ml-2 text-primary-500"
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
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Preço: R${priceRange[0]} - R${priceRange[1]}
                  <button
                    className="ml-2 text-primary-500"
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
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Novidades
                  <button
                    className="ml-2 text-primary-500"
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
                <div className="bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  Tendências
                  <button
                    className="ml-2 text-primary-500"
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
                  className="text-secondary-600 text-sm hover:text-secondary-900"
                  onClick={handleClearFilters}
                >
                  Limpar Tudo
                </button>
              )}
            </div>
          </div>
          
          <div className="relative">
            <div className="flex items-center gap-2">
              <span className="text-sm text-secondary-600">Ordenar por:</span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => {
                    setSortOption(e.target.value);
                    setTimeout(updateUrl, 0);
                  }}
                  className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="featured">Destaque</option>
                  <option value="price-asc">Preço: Menor para Maior</option>
                  <option value="price-desc">Preço: Maior para Menor</option>
                  <option value="newest">Mais Recentes</option>
                  <option value="rating">Melhor Avaliados</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-secondary-500">
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
              emptyMessage="Nenhum produto corresponde aos filtros selecionados. Tente ajustar seus critérios."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;