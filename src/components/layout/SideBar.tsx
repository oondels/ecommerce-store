import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  UserCog,
  Settings as SettingsIcon,
  BarChart3,
  CreditCard,
  HelpCircle,
  LogOut
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  // Menu principal
  const mainNavItems = [
    { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/admin/products', icon: <Package size={20} />, label: 'Produtos' },
    { path: '/admin/orders', icon: <ShoppingCart size={20} />, label: 'Pedidos' },
    { path: '/admin/customers', icon: <Users size={20} />, label: 'Clientes' },
  ];

  // Menu de análises
  const analyticsNavItems = [
    { path: '/admin/reports', icon: <BarChart3 size={20} />, label: 'Relatórios' },
    { path: '/admin/finances', icon: <CreditCard size={20} />, label: 'Finanças' },
  ];

  // Menu de configurações
  const settingsNavItems = [
    { path: '/admin/staff', icon: <UserCog size={20} />, label: 'Funcionários' },
    { path: '/admin/settings', icon: <SettingsIcon size={20} />, label: 'Configurações' },
  ];

  // Renderiza um grupo de navegação
  const renderNavGroup = (items, title = null) => (
    <div className="space-y-1">
      {title && (
        <h3 className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          {title}
        </h3>
      )}
      {items.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `flex items-center px-4 py-2.5 text-sm transition-colors duration-200 rounded-lg ${
              isActive 
                ? 'bg-primary-50 text-primary-700 font-medium' 
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`
          }
          end={item.path === '/admin'}
        >
          <span className={`p-1.5 rounded-md ${isActive => isActive ? 'bg-primary-100' : 'bg-gray-100'}`}>
            {item.icon}
          </span>
          <span className="ml-3">{item.label}</span>
        </NavLink>
      ))}
    </div>
  );

  return (
    <aside className={`${isOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 border-r border-gray-200`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-800">E-Commerce</h1>
          <button onClick={onClose} className="ml-auto lg:hidden">
            <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 py-6 space-y-6 overflow-y-auto">
          {renderNavGroup(mainNavItems)}
          
          <div className="px-4">
            <div className="h-px bg-gray-200"></div>
          </div>
          
          {renderNavGroup(analyticsNavItems, "Análises")}
          
          <div className="px-4">
            <div className="h-px bg-gray-200"></div>
          </div>
          
          {renderNavGroup(settingsNavItems, "Sistema")}
        </div>
        
        {/* Seção de ajuda e logout no rodapé */}
        <div className="p-4 border-t border-gray-200">
          <NavLink
            to="/admin/help"
            className="flex items-center px-4 py-2.5 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
          >
            <HelpCircle size={20} />
            <span className="ml-3">Ajuda</span>
          </NavLink>
          
          <button
            className="flex items-center w-full px-4 py-2.5 mt-1 text-sm text-gray-600 rounded-lg hover:bg-gray-100 hover:text-gray-900"
            onClick={() => console.log('Logout')}
          >
            <LogOut size={20} />
            <span className="ml-3">Sair</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;