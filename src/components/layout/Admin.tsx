import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './SideBar';
import Topbar from './TopBar';
import { useAuth } from '../../context/AuthContext';
import { Bell, MessageSquare, Search } from 'lucide-react';

const AdminLayout: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        {/* Barra de pesquisa e notificações */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between shadow-sm">
          <div className="relative max-w-md w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Buscar..."
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 relative">
              <Bell size={20} className="text-gray-500" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
            </button>
            <button className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 relative">
              <MessageSquare size={20} className="text-gray-500" />
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
            </button>
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full border-2 border-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Avatar do usuário"
              />
              <div className="ml-2 hidden md:block">
                <p className="text-sm font-medium text-gray-700">{user?.name || 'Administrador'}</p>
                <p className="text-xs text-gray-500">Administrador</p>
              </div>
            </div>
          </div>
        </div>
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Footer simplificado */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-xs text-gray-500">
          <p>© 2025 E-Commerce Admin. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;