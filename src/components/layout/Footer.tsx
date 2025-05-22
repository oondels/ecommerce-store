import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, MessageCircleMoreIcon, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import NewsletterForm from '../ui/NewsletterForm';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-black text-white pt-12 md:pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center mb-6">
              <Moon size={28} className="text-primary-400 mr-2" />
              <span className="text-xl font-bold text-white">Loja</span>
            </Link>
            <p className="text-gray-300 mb-6 max-w-md">
              Descubra tudo em um só lugar. Loja traz para você produtos cuidadosamente selecionados que combinam beleza, funcionalidade e inovação.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Facebook">
                <MessageCircleMoreIcon size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Links Rápidos</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Início</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-primary-400 transition-colors">Produtos</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">Sobre Nós</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contato</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-primary-400 transition-colors">Perguntas Frequentes</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contato</h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin size={20} className="text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">Rua Pedro de Souza Gomes, 295, Santo Estêvão, SP 44190-000</span>
              </li>
              <li className="flex">
                <Phone size={20} className="text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">(75) 98246-6703</span>
              </li>
              <li className="flex">
                <Mail size={20} className="text-primary-400 mr-3 flex-shrink-0" />
                <span className="text-gray-400">hendriusfelix@gmail.com</span>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-6">Fique por Dentro</h3>
            <NewsletterForm variant="dark" />
          </div>
        </div>
        
        <hr className="border-gray-800 my-8" />
        
        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center pb-8">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Loja. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap justify-center space-x-4 text-sm text-gray-400">
            <Link to="/privacy" className="hover:text-primary-400 transition-colors mb-2 md:mb-0">Política de Privacidade</Link>
            <Link to="/terms" className="hover:text-primary-400 transition-colors mb-2 md:mb-0">Termos de Serviço</Link>
            <Link to="/shipping" className="hover:text-primary-400 transition-colors mb-2 md:mb-0">Entrega</Link>
            <Link to="/returns" className="hover:text-primary-400 transition-colors">Devoluções</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;