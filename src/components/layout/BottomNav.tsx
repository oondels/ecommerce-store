import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Heart, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const BottomNav: React.FC = () => {
  const location = useLocation();
  const { items } = useCart();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const navItems = [
    {
      label: 'Início',
      path: '/',
      icon: <Home size={20} />,
    },
    {
      label: 'Buscar',
      path: '/products',
      icon: <Search size={20} />,
    },
    {
      label: 'Carrinho',
      path: '/cart',
      icon: (
        <div className="relative">
          <ShoppingBag size={20} />
          {items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {items.length}
            </span>
          )}
        </div>
      ),
    },
    {
      label: 'Favoritos',
      path: '/wishlist',
      icon: <Heart size={20} />,
    },
    {
      label: 'Conta',
      path: '/account',
      icon: <User size={20} />,
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg md:hidden z-40">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 px-3 ${
              isActive(item.path)
                ? 'text-primary-500'
                : 'text-secondary-500 hover:text-primary-500'
            }`}
          >
            {item.icon}
            <span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNav;