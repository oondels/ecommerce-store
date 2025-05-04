import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Heart, ShoppingBag, Menu, Search, User, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Button from '../ui/Button';
import './Header.css'; // Importando o arquivo CSS personalizado

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const location = useLocation();
  const { items } = useCart();

  // Handle page scroll for header styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchExpanded(false);
  }, [location.pathname]);

  // Navigation links
  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Produtos', path: '/products' },
    { name: 'Sobre', path: '/about' },
    { name: 'Contato', path: '/contact' },
  ];

  // Determine if we're on homepage
  const isHomePage = location.pathname === '/';

  // Header background style based on scroll position and current page
  const headerBgClass = isScrolled || !isHomePage
    ? 'bg-white shadow-subtle'
    : 'shadow-subtle';

  // Text color based on scroll position and current page
  const textColorClass = isScrolled || !isHomePage
    ? 'text-secondary-900'
    : 'text-secondary-900';

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      // When opening the menu, close the search if expanded
      setIsSearchExpanded(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (!isSearchExpanded) {
      // When expanding the search, close the mobile menu if open
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 shadow ${headerBgClass}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Moon size={28} className={`${textColorClass} mr-2`} />
            <span className={`text-xl font-bold ${textColorClass}`}>Loja</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium hover:text-primary-500 transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-500'
                    : textColorClass
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Icons */}
          <div className="desktop-icons-container items-center space-x-5">
            <button
              onClick={toggleSearch}
              className={`${textColorClass} hover:text-primary-500 transition-colors`}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className={`${textColorClass} hover:text-primary-500 transition-colors relative`}
              aria-label="Lista de Desejos"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/cart"
              className={`${textColorClass} hover:text-primary-500 transition-colors relative`}
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            <div className="flex items-center space-x-3">
              <Link
                to="/login"
                className={`${textColorClass} hover:text-primary-500 transition-colors text-sm font-medium`}
              >
                Entrar
              </Link>
              <span className="text-gray-300">|</span>
              <Link
                to="/register"
                className={`${textColorClass} hover:text-primary-500 transition-colors text-sm font-medium`}
              >
                Cadastrar
              </Link>
            </div>
            <Link
              to="/account"
              className={`${textColorClass} hover:text-primary-500 transition-colors`}
              aria-label="Conta"
            >
              <User size={20} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link
              to="/cart"
              className={`${textColorClass} hover:text-primary-500 transition-colors relative`}
              aria-label="Carrinho"
            >
              <ShoppingBag size={20} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={toggleSearch}
              className={`${textColorClass} hover:text-primary-500 transition-colors`}
              aria-label="Buscar"
            >
              <Search size={20} />
            </button>
            
            <button
              onClick={toggleMobileMenu}
              className={`${textColorClass} hover:text-primary-500 transition-colors`}
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded Search Bar */}
      <div
        className={`${
          isSearchExpanded ? 'max-h-24 py-4' : 'max-h-0 py-0'
        } overflow-hidden transition-all duration-300 ease-in-out bg-white shadow-md`}
      >
        <div className="container mx-auto px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar produtos..."
              className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <Link to="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
            <Moon size={28} className="text-primary-500 mr-2" />
            <span className="text-xl font-bold text-secondary-900">Loja</span>
          </Link>
          <button
            onClick={toggleMobileMenu}
            className="text-secondary-900 hover:text-primary-500 transition-colors"
            aria-label="Fechar menu"
          >
            <X size={24} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className={`block py-2 text-lg font-medium ${
                    location.pathname === link.path
                      ? 'text-primary-500'
                      : 'text-secondary-800 hover:text-primary-500'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          
          <hr className="my-4 border-gray-200" />
          
          <ul className="space-y-4">
            <li>
              <Link
                to="/wishlist"
                className="flex items-center py-2 text-lg font-medium text-secondary-800 hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Heart size={20} className="mr-3" />
                Lista de Desejos
              </Link>
            </li>
            <li>
              <Link
                to="/account"
                className="flex items-center py-2 text-lg font-medium text-secondary-800 hover:text-primary-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <User size={20} className="mr-3" />
                Conta
              </Link>
            </li>
          </ul>
          
          <div className="mt-8 space-y-4">
            <Link to="/login">
              <Button variant="primary" fullWidth>
                Entrar
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" fullWidth>
                Cadastrar
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;