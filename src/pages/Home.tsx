import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import Button from '../components/ui/Button';
import ProductCard from '../components/ui/ProductCard';
import NewsletterForm from '../components/ui/NewsletterForm';
import { getFeaturedProducts, getTrendingProducts } from '../data/mockData';

const Home: React.FC = () => {
  const featuredProducts = getFeaturedProducts().slice(0, 4);
  const testimonials = [
    {
      name: "Christopher Gomes",
      role: "Advogado",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Excelente experiência de compra! A loja oferece produtos de alta qualidade e um atendimento excepcional. Recomendo fortemente para todos que buscam confiabilidade e excelência."
    },
    {
      name: "Hendrius Félix",
      role: "Engenheiro de Software",
      image: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "Impressionado com a qualidade dos produtos! Cada item que comprei superou minhas expectativas. A atenção aos detalhes e o acabamento são realmente excepcionais."
    },
    {
      name: "Thalisson Reis",
      role: "Médico",
      image: "https://images.pexels.com/photos/2379006/pexels-photo-2379006.jpeg?auto=compress&cs=tinysrgb&w=150",
      content: "A segurança nas transações e a rapidez na entrega são incomparáveis. Recebi meus pedidos antes do prazo previsto e tudo chegou em perfeito estado. Definitivamente voltarei a comprar!"
    }
  ];

  const categories = [
    {
      name: "Material Escolar",
      image: "https://images.pexels.com/photos/6690924/pexels-photo-6690924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Cadernos, canetas, mochilas e tudo para seus estudos"
    },
    {
      name: "Tecnologia",
      image: "https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Gadgets, acessórios e equipamentos eletrônicos"
    },
    {
      name: "Artesanato",
      image: "https://images.pexels.com/photos/6814562/pexels-photo-6814562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Materiais para crochê, tricô e trabalhos manuais"
    },
    {
      name: "Escritório",
      image: "https://images.pexels.com/photos/4792733/pexels-photo-4792733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description: "Tudo para seu ambiente de trabalho"
    }
  ];

  const benefits = [
    {
      icon: <ShoppingBag className="w-6 h-6" />,
      title: "Variedade de Produtos",
      description: "De material escolar a tecnologia, tudo em um só lugar"
    },
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Entrega Rápida",
      description: "Frete grátis em compras acima de R$100"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Compra Segura",
      description: "Seus dados protegidos e pagamento seguro"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Suporte 24/7",
      description: "Atendimento disponível quando você precisar"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Seu Destino para Todas as Necessidades
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              De materiais escolares a gadgets tecnológicos, artesanato a produtos para escritório. Encontre tudo o que precisa para estudar, trabalhar e criar em um só lugar.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={20} />}
                onClick={() => window.location.href = '/products'}
              >
                Explorar Produtos
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black"
                onClick={() => window.location.href = '/about'}
              >
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore Nossas Categorias
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Descubra nossa ampla seleção de produtos em diferentes categorias
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <div key={index} className="relative group overflow-hidden rounded-2xl">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 flex flex-col justify-end p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-gray-200 text-sm mb-4">{category.description}</p>
                  <Link
                    to={`/products?category=${category.name.toLowerCase()}`}
                    className="text-white text-sm font-medium hover:underline inline-flex items-center"
                  >
                    Explorar <ArrowRight size={16} className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400 mb-2 block">
                Produtos em Destaque
              </span>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Mais Vendidos
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl">
                Conheça nossos produtos mais populares, selecionados com cuidado para você.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 mt-4 md:mt-0"
            >
              Ver Todos os Produtos
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              O que Nossos Clientes Dizem
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Veja o que nossos clientes satisfeitos têm a dizer sobre sua experiência conosco.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Fique por Dentro
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Assine nossa newsletter para receber novidades, ofertas exclusivas e dicas úteis.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;