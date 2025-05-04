import React from 'react';
import { Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface TopbarProps {
  onMenuClick: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ onMenuClick }) => {
  const { user } = useAuth();

  return (
    <header className="bg-primary-600 shadow-md">
      <div className="flex items-center justify-between px-6 h-16">
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg text-white lg:hidden hover:bg-primary-700"
            aria-label="Abrir menu"
          >
            <Menu size={24} />
          </button>
          
          <nav className="hidden md:flex ml-6 space-x-1">
            <Link 
              to="/" 
              className="px-3 py-2 text-sm text-white rounded-md hover:bg-primary-700"
            >
              Loja
            </Link>
            <Link 
              to="/admin" 
              className="px-3 py-2 text-sm font-medium bg-primary-700 text-white rounded-md"
            >
              Admin
            </Link>
          </nav>
        </div>

        <div className="flex items-center">
          <span className="text-sm font-medium text-white mr-2">
            {user?.name || user?.email || 'Administrador'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Topbar;