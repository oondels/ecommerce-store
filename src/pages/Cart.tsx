import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Plus, Minus, X, Heart, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import Button from '../components/ui/Button';
import { formatCurrency } from '../utils/formatCurrency';
import ProductCard from '../components/ui/ProductCard';
import { getTrendingProducts } from '../data/mockData';

const Cart: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, shipping, tax, total } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState<string | null>(null);
  
  const recommendedProducts = getTrendingProducts().slice(0, 4);
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };
  
  const handleRemoveItem = async (id: string) => {
    setIsRemoving(id);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    removeFromCart(id);
    setIsRemoving(null);
  };
  
  const handleSaveForLater = async (id: string) => {
    setIsSaving(id);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    const item = items.find(item => item.id === id);
    if (item) {
      addToWishlist({
        id: crypto.randomUUID(),
        productId: item.productId,
        addedAt: new Date().toISOString(),
      });
      removeFromCart(id);
    }
    setIsSaving(null);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg" className="min-w-[200px]">
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm mb-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">Shopping Cart</span>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
                </h1>
              </div>
              
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center gap-6">
                      <Link to={`/product/${item.productId}`} className="shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 object-cover rounded-xl"
                        />
                      </Link>
                      
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/product/${item.productId}`}
                          className="text-lg font-medium text-gray-900 hover:text-gray-700"
                        >
                          {item.name}
                        </Link>
                        
                        <div className="mt-1 flex flex-wrap items-center gap-4">
                          <div className="flex items-center border border-gray-200 rounded-full">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
                              disabled={item.quantity <= 1}
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                              className="w-12 text-center border-0 focus:ring-0"
                              min="1"
                            />
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-900"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          <span className="font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSaveForLater(item.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          disabled={isSaving === item.id || isInWishlist(item.productId)}
                        >
                          <Heart
                            size={20}
                            className={isInWishlist(item.productId) ? 'fill-red-500 text-red-500' : ''}
                          />
                        </button>
                        
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-gray-400 hover:text-gray-600"
                          disabled={isRemoving === item.id}
                        >
                          <X size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-6 bg-gray-50">
                <Link
                  to="/products"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
                <div className="h-px bg-gray-100"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
              
              <Button
                variant="primary"
                size="lg"
                fullWidth
                rightIcon={<ArrowRight size={16} />}
                onClick={() => window.location.href = '/checkout'}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
        
        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;