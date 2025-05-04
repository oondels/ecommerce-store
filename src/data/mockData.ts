import { Product, Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Gadgets',
    slug: 'gadgets',
    description: 'Innovative tech gadgets to enhance your digital lifestyle',
    image: 'https://images.pexels.com/photos/1337753/pexels-photo-1337753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'smartphone',
    productsCount: 24,
  },
  {
    id: '2',
    name: 'Decoração',
    slug: 'decor',
    description: 'Beautiful home decor items to elevate your space',
    image: 'https://images.pexels.com/photos/3932929/pexels-photo-3932929.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'lamp',
    productsCount: 18,
  },
  {
    id: '3',
    name: 'Bem-estar',
    slug: 'wellness',
    description: 'Products to help you live a healthier, more balanced life',
    image: 'https://images.pexels.com/photos/3757942/pexels-photo-3757942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'heart',
    productsCount: 15,
  },
  {
    id: '4',
    name: 'Produtos do momento',
    slug: 'viral-items',
    description: 'Trending products everyone is talking about',
    image: 'https://images.pexels.com/photos/4041272/pexels-photo-4041272.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'trending-up',
    productsCount: 12,
  },
  {
    id: '5',
    name: 'Essenciais',
    slug: 'essentials',
    description: 'Everyday items you can\'t live without',
    image: 'https://images.pexels.com/photos/6148798/pexels-photo-6148798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'star',
    productsCount: 30,
  },
  {
    id: '6',
    name: 'Acessórios',
    slug: 'accessories',
    description: 'Stylish accessories to complete your look',
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    icon: 'watch',
    productsCount: 22,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Earbuds',
    price: 129.99,
    discountPrice: 99.99,
    description: 'Experience incredible sound quality with our premium wireless earbuds featuring active noise cancellation technology. These lightweight, ergonomic earbuds provide up to 8 hours of continuous playback on a single charge, with an additional 24 hours from the compact charging case. Perfect for commuting, working out, or just enjoying your favorite music without distractions.',
    shortDescription: 'Premium wireless earbuds with active noise cancellation',
    images: [
      'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/8279655/pexels-photo-8279655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Gadgets',
    tags: ['wireless', 'earbuds', 'audio', 'noise-cancelling'],
    rating: 4.8,
    reviews: 436,
    stock: 45,
    isNew: true,
    isFeatured: true,
    isTrending: true,
    createdAt: '2023-09-15T00:00:00Z',
    variations: [
      {
        type: 'color',
        options: [
          {
            value: 'black',
            label: 'Black',
            inStock: true,
          },
          {
            value: 'white',
            label: 'White',
            inStock: true,
          },
          {
            value: 'navy',
            label: 'Navy Blue',
            inStock: false,
          },
        ],
      },
    ],
    relatedProducts: ['5', '7', '12'],
  },
  {
    id: '2',
    name: 'Minimalist Ceramic Vase',
    price: 49.99,
    description: 'Add a touch of elegance to any space with this handcrafted ceramic vase. The sleek, minimalist design features clean lines and a matte finish, making it the perfect centerpiece for your dining table or shelf. Each vase is individually crafted by skilled artisans using traditional techniques, ensuring a unique piece for your home.',
    shortDescription: 'Handcrafted ceramic vase with a modern, minimalist design',
    images: [
      'https://images.pexels.com/photos/6207770/pexels-photo-6207770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4207891/pexels-photo-4207891.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/10686252/pexels-photo-10686252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Decor',
    tags: ['vase', 'ceramic', 'home decor', 'minimalist'],
    rating: 4.6,
    reviews: 128,
    stock: 32,
    isFeatured: true,
    createdAt: '2023-08-20T00:00:00Z',
    variations: [
      {
        type: 'color',
        options: [
          {
            value: 'white',
            label: 'White',
            inStock: true,
          },
          {
            value: 'black',
            label: 'Black',
            inStock: true,
          },
          {
            value: 'terracotta',
            label: 'Terracotta',
            inStock: true,
          },
        ],
      },
      {
        type: 'size',
        options: [
          {
            value: 'small',
            label: 'Small (8")',
            inStock: true,
          },
          {
            value: 'medium',
            label: 'Medium (12")',
            inStock: true,
          },
          {
            value: 'large',
            label: 'Large (16")',
            inStock: false,
          },
        ],
      },
    ],
    relatedProducts: ['8', '14', '16'],
  },
  {
    id: '3',
    name: 'Bamboo Yoga Mat',
    price: 89.99,
    discountPrice: 69.99,
    description: 'Transform your yoga practice with our eco-friendly bamboo yoga mat. Made from sustainably harvested bamboo and natural rubber, this mat provides excellent grip and cushioning for all types of yoga practice. The antimicrobial properties of bamboo help keep your mat fresh and clean, while the beautiful wood grain pattern adds a touch of natural elegance to your workout space.',
    shortDescription: 'Eco-friendly yoga mat made from sustainable bamboo',
    images: [
      'https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4662438/pexels-photo-4662438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3822718/pexels-photo-3822718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Wellness',
    tags: ['yoga', 'fitness', 'eco-friendly', 'wellness'],
    rating: 4.7,
    reviews: 215,
    stock: 18,
    isFeatured: true,
    createdAt: '2023-07-10T00:00:00Z',
    relatedProducts: ['9', '13', '19'],
  },
  {
    id: '4',
    name: 'Smart Water Bottle',
    price: 59.99,
    description: 'Stay hydrated with the world\'s smartest water bottle. This innovative bottle tracks your water intake, glows to remind you when it\'s time to drink, and syncs with your phone to help you maintain optimal hydration throughout the day. The vacuum-insulated stainless steel keeps your beverages cold for 24 hours or hot for 12 hours, making it perfect for any season or activity.',
    shortDescription: 'Interactive water bottle that tracks hydration and glows with reminders',
    images: [
      'https://images.pexels.com/photos/3737912/pexels-photo-3737912.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/4820724/pexels-photo-4820724.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5740226/pexels-photo-5740226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Gadgets',
    tags: ['smart', 'hydration', 'wellness', 'tech'],
    rating: 4.5,
    reviews: 187,
    stock: 24,
    isNew: true,
    isTrending: true,
    createdAt: '2023-09-01T00:00:00Z',
    variations: [
      {
        type: 'color',
        options: [
          {
            value: 'black',
            label: 'Obsidian Black',
            inStock: true,
          },
          {
            value: 'silver',
            label: 'Brushed Silver',
            inStock: true,
          },
          {
            value: 'rose',
            label: 'Rose Gold',
            inStock: true,
          },
        ],
      },
      {
        type: 'size',
        options: [
          {
            value: '17oz',
            label: '17 oz',
            inStock: true,
          },
          {
            value: '24oz',
            label: '24 oz',
            inStock: true,
          },
        ],
      },
    ],
    relatedProducts: ['3', '9', '20'],
  },
  {
    id: '5',
    name: 'Portable Bluetooth Speaker',
    price: 79.99,
    discountPrice: 59.99,
    description: 'Take your music anywhere with this compact yet powerful Bluetooth speaker. Featuring 360° sound technology and deep bass enhancement, this speaker delivers rich, room-filling audio despite its small size. With 12 hours of playtime, waterproof design, and built-in microphone for calls, it\'s the perfect companion for any adventure.',
    shortDescription: 'Compact waterproof speaker with powerful 360° sound',
    images: [
      'https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Gadgets',
    tags: ['speaker', 'bluetooth', 'audio', 'waterproof'],
    rating: 4.6,
    reviews: 342,
    stock: 35,
    isFeatured: true,
    createdAt: '2023-08-05T00:00:00Z',
    variations: [
      {
        type: 'color',
        options: [
          {
            value: 'black',
            label: 'Black',
            inStock: true,
          },
          {
            value: 'blue',
            label: 'Navy Blue',
            inStock: true,
          },
          {
            value: 'red',
            label: 'Ruby Red',
            inStock: true,
          },
        ],
      },
    ],
    relatedProducts: ['1', '7', '15'],
  },
  {
    id: '6',
    name: 'Scented Soy Candle Set',
    price: 39.99,
    description: 'Create a calming atmosphere with our set of three hand-poured soy candles. Each candle is crafted with 100% natural soy wax, cotton wicks, and premium essential oils for a clean, long-lasting burn. The set includes three signature scents: Calm Lavender, Fresh Eucalyptus, and Warm Vanilla, perfect for creating different moods throughout your home.',
    shortDescription: 'Set of three hand-poured, essential oil-infused soy candles',
    images: [
      'https://images.pexels.com/photos/4695296/pexels-photo-4695296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/7183572/pexels-photo-7183572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5238610/pexels-photo-5238610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Decor',
    tags: ['candles', 'home', 'scented', 'relaxation'],
    rating: 4.9,
    reviews: 256,
    stock: 42,
    isTrending: true,
    createdAt: '2023-07-25T00:00:00Z',
    relatedProducts: ['2', '14', '18'],
  },
  {
    id: '7',
    name: 'Wireless Charging Pad',
    price: 34.99,
    description: 'Simplify your charging routine with this sleek wireless charging pad. Compatible with all Qi-enabled devices, this charger delivers fast charging speeds while eliminating cable clutter. The minimalist design features a soft LED indicator and non-slip surface to keep your devices secure during charging. Perfect for nightstands, desks, or any space where you want a cleaner look.',
    shortDescription: 'Fast wireless charger compatible with all Qi-enabled devices',
    images: [
      'https://images.pexels.com/photos/5083215/pexels-photo-5083215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5083213/pexels-photo-5083213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1276139/pexels-photo-1276139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Gadgets',
    tags: ['charging', 'wireless', 'tech', 'accessories'],
    rating: 4.4,
    reviews: 189,
    stock: 56,
    createdAt: '2023-08-12T00:00:00Z',
    variations: [
      {
        type: 'color',
        options: [
          {
            value: 'black',
            label: 'Black',
            inStock: true,
          },
          {
            value: 'white',
            label: 'White',
            inStock: true,
          },
        ],
      },
    ],
    relatedProducts: ['1', '5', '15'],
  },
  {
    id: '8',
    name: 'Geometric Wall Shelf',
    price: 69.99,
    discountPrice: 54.99,
    description: 'Add a modern touch to your walls with this geometric hexagon shelf set. Crafted from sustainably sourced wood and finished with non-toxic paint, these versatile shelves can be arranged in countless configurations to display your favorite small items, plants, or decor pieces. The set includes three different-sized hexagons that can be mounted individually or as a group.',
    shortDescription: 'Set of three hexagonal wooden wall shelves with modern geometric design',
    images: [
      'https://images.pexels.com/photos/6489117/pexels-photo-6489117.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/6758773/pexels-photo-6758773.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3653849/pexels-photo-3653849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    ],
    category: 'Decor',
    tags: ['shelf', 'wall decor', 'geometric', 'wood'],
    rating: 4.7,
    reviews: 124,
    stock: 19,
    isFeatured: true,
    createdAt: '2023-09-05T00:00:00Z',
    variations: [
      {
        type: 'color',
        options: [
          {
            value: 'natural',
            label: 'Natural Wood',
            inStock: true,
          },
          {
            value: 'white',
            label: 'White',
            inStock: true,
          },
          {
            value: 'black',
            label: 'Black',
            inStock: true,
          },
        ],
      },
    ],
    relatedProducts: ['2', '14', '16'],
  },
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
  { id: 1, name: 'Smartphone XYZ Pro', price: '$999.99', sold: 124, image: 'https://placehold.co/60' },
  { id: 2, name: 'Notebook Ultra Slim', price: '$1,299.99', sold: 98, image: 'https://placehold.co/60' },
  { id: 3, name: 'Headphone Wireless', price: '$199.99', sold: 87, image: 'https://placehold.co/60' },
  { id: 4, name: 'Smartwatch Series 5', price: '$349.99', sold: 76, image: 'https://placehold.co/60' },
  { id: 5, name: 'Câmera 4K Action', price: '$249.99', sold: 65, image: 'https://placehold.co/60' },
];

// Clientes principais
export const topCustomers = [
  { id: 1, name: 'João Silva', orders: 12, spent: '$1,345.88', lastOrder: '2023-04-28' },
  { id: 2, name: 'Maria Oliveira', orders: 10, spent: '$982.50', lastOrder: '2023-05-01' },
  { id: 3, name: 'Pedro Santos', orders: 8, spent: '$878.25', lastOrder: '2023-04-30' },
  { id: 4, name: 'Ana Costa', orders: 8, spent: '$745.99', lastOrder: '2023-04-29' },
  { id: 5, name: 'Carlos Ferreira', orders: 7, spent: '$690.45', lastOrder: '2023-04-25' },
];