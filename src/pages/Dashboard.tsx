import React, { useState } from 'react';
import { Users, Package, ShoppingCart, DollarSign, ChevronRight, ArrowUpRight, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { dashboardStats, recentActivities, salesData, topProducts, topCustomers } from '../data/mockData';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  
  // Status das métricas
  const stats = [
    { 
      title: 'Total Clientes', 
      value: dashboardStats.customers.total.toLocaleString(), 
      icon: <Users size={24} />, 
      change: dashboardStats.customers.change,
      detail: `${dashboardStats.customers.last30Days} novos nos últimos 30 dias` 
    },
    { 
      title: 'Total Produtos', 
      value: dashboardStats.products.total.toLocaleString(), 
      icon: <Package size={24} />, 
      change: dashboardStats.products.change,
      detail: `${dashboardStats.products.outOfStock} fora de estoque` 
    },
    { 
      title: 'Total Pedidos', 
      value: dashboardStats.orders.total.toLocaleString(), 
      icon: <ShoppingCart size={24} />, 
      change: dashboardStats.orders.change,
      detail: `${dashboardStats.orders.pending} aguardando envio` 
    },
    { 
      title: 'Receita Total', 
      value: dashboardStats.revenue.total, 
      icon: <DollarSign size={24} />, 
      change: dashboardStats.revenue.change,
      detail: `Pedido médio: ${dashboardStats.revenue.averageOrder}` 
    },
  ];

  // Função para determinar a cor do status de atividade
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'error': return 'bg-red-100 text-red-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para determinar o ícone da atividade
  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingCart size={16} className="text-gray-500" />;
      case 'customer': return <Users size={16} className="text-gray-500" />;
      case 'product': return <Package size={16} className="text-gray-500" />;
      case 'review': return <ArrowUpRight size={16} className="text-gray-500" />;
      default: return <Clock size={16} className="text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6 p-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium ${timeRange === 'week' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('week')}
          >
            Semana
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium ${timeRange === 'month' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('month')}
          >
            Mês
          </button>
          <button 
            className={`px-3 py-1 rounded-md text-sm font-medium ${timeRange === 'year' ? 'bg-primary-100 text-primary-700' : 'text-gray-500 hover:bg-gray-100'}`}
            onClick={() => setTimeRange('year')}
          >
            Ano
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="p-2 bg-primary-50 rounded-lg">
                {React.cloneElement(stat.icon, { className: 'text-primary-500' })}
              </div>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">{stat.value}</h2>
            <p className="mt-1 text-sm text-gray-500">{stat.title}</p>
            <p className="mt-2 text-xs text-gray-400">{stat.detail}</p>
          </div>
        ))}
      </div>

      {/* Gráfico de Vendas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Vendas Mensais</h3>
            <button className="text-sm text-primary-600 flex items-center">
              Ver detalhes <ChevronRight size={16} />
            </button>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={salesData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`R$ ${value}`, 'Vendas']}
                  labelFormatter={(label) => `Mês: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ stroke: '#3B82F6', fill: '#3B82F6' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Atividades Recentes */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Atividades Recentes</h3>
            <button className="text-sm text-primary-600 flex items-center">
              Ver todas <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="p-2 bg-gray-50 rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-800">{activity.title}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(activity.status)}`}>
                      {activity.status === 'pending' ? 'Pendente' : 
                       activity.status === 'success' ? 'Concluído' : 
                       activity.status === 'error' ? 'Erro' : 'Info'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {activity.amount && <p className="text-sm font-medium">{activity.amount}</p>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Produtos Populares e Clientes Principais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Produtos Mais Vendidos</h3>
            <button className="text-sm text-primary-600 flex items-center">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-3">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-12 h-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{product.name}</p>
                  <p className="text-sm text-gray-500">{product.price}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-800">{product.sold}</p>
                  <p className="text-xs text-gray-500">Unidades</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Clientes Principais</h3>
            <button className="text-sm text-primary-600 flex items-center">
              Ver todos <ChevronRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedidos</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gasto</th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Último Pedido</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{customer.name}</div>
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {customer.orders}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {customer.spent}
                    </td>
                    <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                      {new Date(customer.lastOrder).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Painel de Ações Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-blue-500">
          <h3 className="font-semibold text-gray-900">Pedidos Pendentes</h3>
          <p className="text-2xl font-bold mt-2">{dashboardStats.orders.pending}</p>
          <div className="mt-2">
            <button className="text-blue-600 text-sm font-medium hover:underline">
              Processar agora →
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-yellow-500">
          <h3 className="font-semibold text-gray-900">Produtos Esgotando</h3>
          <p className="text-2xl font-bold mt-2">18</p>
          <div className="mt-2">
            <button className="text-yellow-600 text-sm font-medium hover:underline">
              Verificar estoque →
            </button>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-5 border-l-4 border-purple-500">
          <h3 className="font-semibold text-gray-900">Mensagens Não Lidas</h3>
          <p className="text-2xl font-bold mt-2">7</p>
          <div className="mt-2">
            <button className="text-purple-600 text-sm font-medium hover:underline">
              Ver mensagens →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;