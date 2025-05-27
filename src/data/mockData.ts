import { Product, Category } from '../types';

export const categories: Category[] = [
];

export const products: Product[] = [
];

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.isFeatured);
};

export const getTrendingProducts = (): Product[] => {
  return products.filter(product => product.isTrending);
};

export const getNewArrivals = (): Product[] => {
  return products.filter(product => product.isNew);
};

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getRelatedProducts = (productId: string): Product[] => {
  const product = getProductById(productId);
  if (!product || !product.relatedProducts) return [];
  
  return products.filter(p => product.relatedProducts?.includes(p.id));
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  const category = categories.find(c => c.id === categoryId);
  if (!category) return [];
  
  return products.filter(p => p.category.toLowerCase() === category.name.toLowerCase());
};

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};

// Dados mockados para a aplicação

// Dados de estatísticas
export const dashboardStats = {
  customers: { total: 1234, change: '+12%', last30Days: 156 },
  products: { total: 456, change: '+5%', outOfStock: 23 },
  orders: { total: 789, change: '+8%', pending: 43 },
  revenue: { total: '$12,345', change: '+15%', averageOrder: '$78.45' }
};

// Dados de atividade recente
export const recentActivities = [
  { id: 1, type: 'order', title: 'Novo pedido #8794', time: '5 minutos atrás', amount: '$129.99', status: 'pending' },
  { id: 2, type: 'customer', title: 'Novo cliente registrado', time: '12 minutos atrás', user: 'Maria Silva', status: 'success' },
  { id: 3, type: 'product', title: 'Produto atualizado', time: '1 hora atrás', product: 'Tênis Runner Pro', status: 'info' },
  { id: 4, type: 'order', title: 'Pedido enviado #8791', time: '3 horas atrás', amount: '$89.50', status: 'success' },
  { id: 5, type: 'review', title: 'Nova avaliação', time: '5 horas atrás', product: 'Mochila Outdoor', rating: 4, status: 'info' },
  { id: 6, type: 'order', title: 'Pedido cancelado #8788', time: '8 horas atrás', amount: '$210.75', status: 'error' },
];

// Dados para o gráfico de vendas
export const salesData = [
  { month: 'Jan', value: 4000 },
  { month: 'Fev', value: 5300 },
  { month: 'Mar', value: 4800 },
  { month: 'Abr', value: 6200 },
  { month: 'Mai', value: 5800 },
  { month: 'Jun', value: 7100 },
  { month: 'Jul', value: 6800 },
  { month: 'Ago', value: 7500 },
  { month: 'Set', value: 8200 },
  { month: 'Out', value: 7900 },
  { month: 'Nov', value: 8700 },
  { month: 'Dez', value: 10500 },
];

// Produtos mais vendidos
export const topProducts = [

];

// Clientes principais
export const topCustomers = [
];