import React, { useState } from 'react';
import { Menu, X, Home, ShoppingBag, Heart, User, Search } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface FloatingMenuProps {
  className?: string;
}

const FloatingMenu: React.FC<FloatingMenuProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsOpen(!isOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      label: 'Início',
      path: '/',
      icon: <Home size={20} />,
    },
    {
      label: 'Produtos',
      path: '/products',
      icon: <ShoppingBag size={20} />,
    },
    {
      label: 'Buscar',
      path: '/search',
      icon: <Search size={20} />,
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
    <div className={`fixed z-50 ${className}`}>
      {/* Floating button */}
      <button 
        onClick={toggleMenu}
        className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-3 shadow-lg transition-all duration-300"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Menu popup */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl w-48 overflow-hidden transform transition-transform">
          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-2 text-sm ${
                  isActive(item.path)
                    ? 'bg-primary-50 text-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingMenu;