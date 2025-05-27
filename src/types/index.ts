export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  description: string;
  shortDescription: string;
  images: string[];
  category: string;
  tags: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  createdAt: string;
  variations?: ProductVariation[];
  relatedProducts?: string[];
}

export interface ProductVariation {
  type: 'color' | 'size' | 'material';
  options: {
    value: string;
    label: string;
    inStock: boolean;
    image?: string;
  }[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  icon: string;
  productsCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariations?: {
    type: string;
    value: string;
  }[];
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface WishlistItem {
  id: string;
  productId: string;
  addedAt: string;
}

export interface UserAddress {
  id: string;
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  name: string;
  role: string
}

export interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariations?: {
    type: string;
    value: string;
  }[];
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: UserAddress;
  billingAddress: UserAddress;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewForm {
  rating: number;
  title: string;
  comment: string;
  name: string;
  email: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface NewsletterForm {
  email: string;
}

export interface CheckoutForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  paymentMethod: 'creditCard' | 'paypal' | 'applePay';
  sameAsBilling: boolean;
  saveInformation: boolean;
  createAccount: boolean;
}