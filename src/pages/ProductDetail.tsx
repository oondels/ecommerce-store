import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Star, Truck, ShieldCheck, ArrowRight, Minus, Plus, Heart } from 'lucide-react';
import Button from '../components/ui/Button';
import RatingStars from '../components/ui/RatingStars';
import ProductGrid from '../components/ui/ProductGrid';
import { getProductById, getRelatedProducts } from '../data/mockData';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product, ProductVariation } from '../types';

const ProductDetail: React.FC = () => {
  const { id = '' } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedVariations, setSelectedVariations] = useState<Record<string, string>>({});
  
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const fetchedProduct = getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        setSelectedImage(fetchedProduct.images[0]);
        
        if (fetchedProduct.variations) {
          const initialVariations: Record<string, string> = {};
          fetchedProduct.variations.forEach((variation) => {
            const availableOption = variation.options.find((option) => option.inStock);
            if (availableOption) {
              initialVariations[variation.type] = availableOption.value;
            }
          });
          setSelectedVariations(initialVariations);
        }
        
        const related = getRelatedProducts(id);
        setRelatedProducts(related);
      }
      
      setIsLoading(false);
    }, 500);
  }, [id]);
  
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return;
    if (product && newQuantity > product.stock) return;
    setQuantity(newQuantity);
  };
  
  const handleVariationChange = (type: string, value: string) => {
    setSelectedVariations((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    const variationsArray = Object.entries(selectedVariations).map(([type, value]) => ({
      type,
      value,
    }));
    
    addToCart({
      id: crypto.randomUUID(),
      productId: product.id,
      name: product.name,
      price: product.discountPrice || product.price,
      image: product.images[0],
      quantity,
      selectedVariations: variationsArray,
    });
  };
  
  const handleToggleWishlist = () => {
    if (!product) return;
    
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
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="h-20 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>
              <div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
                <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-6 w-full bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                <div className="h-6 w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                <div className="h-10 w-full bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
                <div className="h-12 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Produto Não Encontrado
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            O produto que você está procurando não existe ou foi removido.
          </p>
          <Link 
            to="/products"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ChevronLeft size={16} className="mr-1" />
            Voltar para Produtos
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/products"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            Voltar para Produtos
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="w-full h-96 relative rounded-lg overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-contain"
              />
              {product.isNew && (
                <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs font-medium px-2 py-1 rounded">
                  Novo
                </div>
              )}
              {product.discountPrice && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                  {Math.round((1 - product.discountPrice / product.price) * 100)}% Off
                </div>
              )}
            </div>
            
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden ${
                    selectedImage === image ? 'ring-2 ring-primary-500' : 'ring-1 ring-gray-200 dark:ring-gray-700'
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - visualização ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mb-6">
              <RatingStars
                rating={product.rating}
                size="md"
                showCount
                count={product.reviews}
              />
              <Link to="#reviews" className="text-primary-500 dark:text-primary-400 text-sm">
                Ler avaliações
              </Link>
            </div>
            
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(product.discountPrice || product.price)}
                </span>
                {product.discountPrice && (
                  <span className="text-gray-500 dark:text-gray-400 line-through text-lg">
                    {formatCurrency(product.price)}
                  </span>
                )}
              </div>
              
              <div className="mt-2 text-sm">
                {product.stock > 10 ? (
                  <span className="text-green-500">Em Estoque</span>
                ) : product.stock > 0 ? (
                  <span className="text-yellow-500">Apenas {product.stock} restantes</span>
                ) : (
                  <span className="text-red-500">Esgotado</span>
                )}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {product.shortDescription}
            </p>
            
            {product.variations && product.variations.length > 0 && (
              <div className="space-y-4 mb-6">
                {product.variations.map((variation) => (
                  <div key={variation.type}>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2 capitalize">
                      {variation.type === 'color' ? 'Cor' : 
                       variation.type === 'size' ? 'Tamanho' : 
                       variation.type === 'material' ? 'Material' : variation.type}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {renderVariationOptions(variation)}
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md w-36">
                <button
                  className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus size={16} />
                </button>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                  className="w-16 h-10 text-center border-0 focus:outline-none focus:ring-0 bg-transparent text-gray-900 dark:text-white"
                />
                <button
                  className="w-10 h-10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={product.stock <= quantity}
                >
                  <Plus size={16} />
                </button>
              </div>
              
              <div className="flex-1 flex gap-2">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Esgotado' : 'Adicionar ao Carrinho'}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className={`${
                    isInWishlist(product.id)
                      ? 'border-red-500 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'
                      : 'border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                  onClick={handleToggleWishlist}
                >
                  <Heart
                    size={20}
                    className={isInWishlist(product.id) ? 'fill-red-500 text-red-500' : ''}
                  />
                </Button>
              </div>
            </div>
            
            <div className="space-y-3 py-6 border-t border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={18} className="text-gray-600 dark:text-gray-400" />
                <div className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">Frete grátis</span> em pedidos acima de R$100
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ShieldCheck size={18} className="text-gray-600 dark:text-gray-400" />
                <div className="text-gray-600 dark:text-gray-300">
                  <span className="font-medium text-gray-900 dark:text-white">30 dias para devolução</span> com reembolso total
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Descrição do Produto
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-between items-baseline mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Você Também Pode Gostar
              </h2>
              <Link
                to="/products"
                className="text-primary-500 dark:text-primary-400 hover:text-primary-600 dark:hover:text-primary-300 inline-flex items-center"
              >
                Ver Mais <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <ProductGrid products={relatedProducts.slice(0, 4)} />
          </div>
        )}
      </div>
    </div>
  );
  
  function renderVariationOptions(variation: ProductVariation) {
    if (variation.type === 'color') {
      return variation.options.map((option) => (
        <button
          key={option.value}
          className={`
            w-10 h-10 rounded-full relative
            ${!option.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${
              selectedVariations[variation.type] === option.value
                ? 'ring-2 ring-offset-2 ring-primary-500 dark:ring-offset-gray-900'
                : ''
            }
          `}
          style={{ backgroundColor: option.value }}
          onClick={() => {
            if (option.inStock) {
              handleVariationChange(variation.type, option.value);
            }
          }}
          disabled={!option.inStock}
          title={option.label}
        >
          {!option.inStock && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-0.5 h-12 bg-gray-400 dark:bg-gray-500 transform rotate-45"></div>
            </div>
          )}
        </button>
      ));
    }

    return variation.options.map((option) => (
      <button
        key={option.value}
        className={`
          px-4 py-2 rounded-md border
          ${
            selectedVariations[variation.type] === option.value
              ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
              : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
          }
          ${!option.inStock ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onClick={() => {
          if (option.inStock) {
            handleVariationChange(variation.type, option.value);
          }
        }}
        disabled={!option.inStock}
      >
        {option.label}
        {!option.inStock && ' (Esgotado)'}
      </button>
    ));
  }
};

export default ProductDetail;