import React from 'react';
import HeroSection from '../components/ui/HeroSection';
import CategoryCard from '../components/ui/CategoryCard';
import ProductCard from '../components/ui/ProductCard';
import NewsletterForm from '../components/ui/NewsletterForm';
import { categories } from '../data/mockData';
import { getFeaturedProducts, getTrendingProducts } from '../data/mockData';
import { ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts();
  const trendingProducts = getTrendingProducts();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="Discover Your Style"
        subtitle="Curated collections of premium products designed to elevate your everyday life"
        backgroundImage="https://images.pexels.com/photos/6567607/pexels-photo-6567607.jpeg?auto=compress&cs=tinysrgb&w=1920"
        primaryCta={{ text: "Shop Now", link: "/products" }}
        secondaryCta={{ text: "Explore Collections", link: "/products?trending=true" }}
      />
      
      {/* Categories */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Shop by Category
              </h2>
              <p className="text-gray-600 text-lg">
                Explore our curated collections
              </p>
            </div>
            <Button
              variant="link"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => window.location.href = '/products'}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} variant="circle" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Handpicked items we think you'll love
              </p>
            </div>
            <Button
              variant="link"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => window.location.href = '/products?featured=true'}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: `url(https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1920)` }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Elevate Your Space
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Discover our premium collection of home decor that combines style, comfort, and innovation.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="min-w-[200px] border-white text-white hover:bg-white hover:text-black"
              onClick={() => window.location.href = '/products?category=decor'}
            >
              Shop Home Decor
            </Button>
          </div>
        </div>
      </section>
      
      {/* Trending Products */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Trending Now
              </h2>
              <p className="text-gray-600 text-lg">
                Popular products our customers love
              </p>
            </div>
            <Button
              variant="link"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => window.location.href = '/products?trending=true'}
            >
              View All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Stay Updated
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Subscribe to get updates on new products, special offers, and more.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;