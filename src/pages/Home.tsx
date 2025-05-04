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
        title="Descubra Tudo em Um Só Lugar"
        subtitle="Produtos cuidadosamente selecionados que combinam beleza, funcionalidade e inovação para seu estilo de vida moderno."
        backgroundImage="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        primaryCta={{ text: "Explorar Coleções", link: "/products" }}
        secondaryCta={{ text: "Ver Tendências", link: "/products?trending=true" }}
        overlayOpacity={0.6}
      />
      
      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                Compre por Categoria
              </h2>
              <p className="text-secondary-600">
                Explore nossas coleções selecionadas em diversas categorias
              </p>
            </div>
            <Button
              variant="link"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => window.location.href = '/products'}
            >
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} variant="circle" />
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                Produtos em Destaque
              </h2>
              <p className="text-secondary-600">
                Produtos selecionados que achamos que você vai adorar
              </p>
            </div>
            <Button
              variant="link"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => window.location.href = '/products?featured=true'}
            >
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Banner */}
      <section className="py-16 bg-primary-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(https://images.pexels.com/photos/1037993/pexels-photo-1037993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2)` }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Eleve Seu Espaço
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Descubra nossa coleção premium de decoração para casa que combina estilo, conforto e inovação.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary-900"
              onClick={() => window.location.href = '/products?category=decor'}
            >
              Comprar Decoração
            </Button>
          </div>
        </div>
      </section>
      
      {/* Trending Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-2">
                Tendências do Momento
              </h2>
              <p className="text-secondary-600">
                Os produtos mais populares que nossos clientes estão adorando
              </p>
            </div>
            <Button
              variant="link"
              rightIcon={<ArrowRight size={16} />}
              onClick={() => window.location.href = '/products?trending=true'}
            >
              Ver Todos
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {trendingProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Mission Statement */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-6">
              Nossa Missão
            </h2>
            <p className="text-xl text-secondary-600 mb-8 leading-relaxed">
              Na Loja, acreditamos que ótimos produtos podem elevar experiências cotidianas. Selecionamos itens que combinam beleza, funcionalidade e inovação para melhorar seu estilo de vida moderno. Cada produto em nossa coleção é cuidadosamente escolhido para garantir que atenda aos nossos altos padrões de design, qualidade e sustentabilidade.
            </p>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.location.href = '/about'}
            >
              Saiba Mais Sobre Nós
            </Button>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-lg mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-900 mb-4">
                Fique Atualizado
              </h2>
              <p className="text-secondary-600">
                Inscreva-se para receber atualizações sobre novos produtos, ofertas especiais e muito mais.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;