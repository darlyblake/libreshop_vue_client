import { Produit } from '@/app/models/Produit';
import { Category } from '@/app/models/Category';
import { User, UserProfile } from '@/app/models/User';
import { Order } from '@/app/models/Order';
import { Cart, CartItem } from '@/app/models/Cart';
import { PaymentTransaction } from '@/app/models/Payment';

// Simulation de stockage en mémoire pour le navigateur
// En production, ceci serait remplacé par des appels API

let productsData: Produit[] = [
  {
    id: "1",
    nom: "Montre Connectée Pro V3",
    prix: 199.99,
    oldPrice: 299.99,
    discount: 33,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    isTrending: true,
    note: 4.5,
    reviewCount: 1542,
    categoryId: "technologie"
  },
  {
    id: "2",
    nom: "Écouteurs Sans Fil Premium avec ANC",
    prix: 129.99,
    oldPrice: 199.99,
    discount: 35,
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    isTrending: true,
    note: 4.8,
    reviewCount: 3890,
    categoryId: "technologie"
  },
  {
    id: "4",
    nom: "Smartphone Ultra Pro (édition limitée)",
    prix: 699.99,
    oldPrice: 899.99,
    discount: 22,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    isTrending: true,
    note: 4.7,
    reviewCount: 210,
    categoryId: "technologie"
  },
  {
    id: "5",
    nom: "Tablette Pro M2 128Go",
    prix: 449.99,
    oldPrice: 599.99,
    discount: 25,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    isNew: true,
    note: 4.1,
    reviewCount: 89,
    categoryId: "technologie"
  },
  {
    id: "6",
    nom: "Casque Audio Premium Hi-Fi",
    prix: 159.99,
    oldPrice: 249.99,
    discount: 36,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    isTrending: true,
    note: 4.9,
    reviewCount: 5600,
    categoryId: "technologie"
  }
];

let categoriesData: Category[] = [
  {
    id: "technologie",
    nom: "Technologie",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATo4KXQXXpWybPXNAy3ha-gdM0vyOlLnBKvcKZK0ZBtf4Umlvf1soaQzUN9UASbpfRLGGvYaoHvtcGPqMvPiUZU5-CHBaS-gk2kxo_lbslWGT-xUh9Vrw_TU9iEQiVAiZrcixABWhpF8vLd4F03JpmuENdzimmWFSH18N4bEI3wMmw179yC2jA-atop7gNc7H28XhjKd79Pt_U1nFMh2psXj_Ui6uahJwvfneC1YARDHIh8wsFw12kgBXMpPbdWiKhGP21DxvR0kY",
    description: "Découvrez les dernières innovations"
  },
  {
    id: "mode",
    nom: "Mode",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaBWDGpEO7nV6zs0f5LEJO-BNJ8GSlfwlphfhaxVHt7BlSif6a2HnbLhvW9GRYWo7uos6SU38Kv9tIk_4QOw8vaNzZGhHizgWHdxnRL9rnPwZxWFYOOFh9J9-7BGAtHYubOJadLVtClXzHjGqLNn1QDgZaZFVjQmf1jxZjSujpx7cvsMWBXLkTkpRjZyLFAxweDyrc7UuvzV5MbbTRqFEKcvufdS-KYsqXvicRzfXzccQbnutOl7hsOnOx_GP2um8bFuxmpRdg3EI",
    description: "Tendances et styles du moment"
  },
  {
    id: "maison",
    nom: "Maison",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEsrucvU6a2XMlJct51MG3DAzvvsdUI7hHpzp_pgCN2KnR8CXpcItJL3Q9tDxQxguFNgjs4O7Rdna5YJKrq3Vi-18GC_HreWUQ2w0t2fXPpaOM3l5hKorG9MtnWDaga5ORqRHXDlCDZZreWX4SMUUIMC2r69naPOeTJZPrnZhvGI6TKjB-YNyo6HF-6OQMFjRngroM1d-Xml6kgOKkes3FHLd0Wz5HkDecmDfMsGXkGgjursAnswxpAfqq3styhpYG41AwShtKCik",
    description: "Pour un intérieur unique"
  },
  {
    id: "sport",
    nom: "Sport",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLwLiSL3laFVQS_T8aMjD_hTH_O36-zyuWB6Jq2PsHkuM2c7A5imKfGVMTtqzqMwyG_CtHWIVnqjTB1u3lvPfO7E2Z34OGBTy0",
    description: "Équipements et accessoires"
  }
];

let usersData: User[] = [
  {
    id: "user-1",
    email: "test@example.com",
    fullName: "Test User",
    phone: "+225 01 02 03 04 05",
    address: "123 Rue de la Liberté, Abidjan, Côte d'Ivoire",
    password: "$2b$10$hashedpassword123456789012345678901234567890123456789012345678901234567890",
    createdAt: "2023-01-01T00:00:00.000Z",
    preferences: {
      notifications: true,
      language: "fr",
      currency: "XAF"
    }
  }
];

let ordersData: Order[] = [];
let cartData: Cart[] = [];
let paymentsData: PaymentTransaction[] = [];

// API Products
export const productsStorage = {
  getAll: (): Produit[] => [...productsData],
  getById: (id: string): Produit | undefined =>
    productsData.find(p => p.id === id),
  getByCategory: (categoryId: string): Produit[] =>
    productsData.filter(p => p.categoryId === categoryId),
  getTrending: (): Produit[] =>
    productsData.filter(p => p.isTrending),
  getNew: (): Produit[] =>
    productsData.filter(p => p.isNew),
  create: (product: Omit<Produit, 'id'>): Produit => {
    const newProduct: Produit = {
      ...product,
      id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    productsData.push(newProduct);
    return newProduct;
  },
  update: (id: string, updates: Partial<Produit>): Produit | null => {
    const index = productsData.findIndex(p => p.id === id);
    if (index === -1) return null;

    productsData[index] = { ...productsData[index], ...updates };
    return productsData[index];
  },
  delete: (id: string): boolean => {
    const index = productsData.findIndex(p => p.id === id);
    if (index === -1) return false;

    productsData.splice(index, 1);
    return true;
  }
};

// API Categories
export const categoriesStorage = {
  getAll: (): Category[] => [...categoriesData],
  getById: (id: string): Category | undefined =>
    categoriesData.find(c => c.id === id),
  create: (category: Omit<Category, 'id'>): Category => {
    const newCategory: Category = {
      ...category,
      id: `cat-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    categoriesData.push(newCategory);
    return newCategory;
  },
  update: (id: string, updates: Partial<Category>): Category | null => {
    const index = categoriesData.findIndex(c => c.id === id);
    if (index === -1) return null;

    categoriesData[index] = { ...categoriesData[index], ...updates };
    return categoriesData[index];
  },
  delete: (id: string): boolean => {
    const index = categoriesData.findIndex(c => c.id === id);
    if (index === -1) return false;

    categoriesData.splice(index, 1);
    return true;
  }
};

// API Users
export const usersStorage = {
  getAll: (): User[] => [...usersData],
  getById: (id: string): User | undefined =>
    usersData.find(u => u.id === id),
  getByEmail: (email: string): User | undefined =>
    usersData.find(u => u.email === email),
  create: (user: Omit<User, 'id' | 'createdAt'>): User => {
    const newUser: User = {
      ...user,
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    usersData.push(newUser);
    return newUser;
  },
  update: (id: string, updates: Partial<User>): User | null => {
    const index = usersData.findIndex(u => u.id === id);
    if (index === -1) return null;

    usersData[index] = { ...usersData[index], ...updates };
    return usersData[index];
  },
  delete: (id: string): boolean => {
    const index = usersData.findIndex(u => u.id === id);
    if (index === -1) return false;

    usersData.splice(index, 1);
    return true;
  }
};

// API Orders
export const ordersStorage = {
  getAll: (): Order[] => [...ordersData],
  getById: (id: string): Order | undefined =>
    ordersData.find(o => o.id === id),
  getByUserId: (userId: string): Order[] =>
    ordersData.filter(o => o.userId === userId),
  create: (order: Omit<Order, 'id' | 'date'>): Order => {
    const newOrder: Order = {
      ...order,
      id: `CMD-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString()
    };
    ordersData.push(newOrder);
    return newOrder;
  },
  update: (id: string, updates: Partial<Order>): Order | null => {
    const index = ordersData.findIndex(o => o.id === id);
    if (index === -1) return null;

    ordersData[index] = { ...ordersData[index], ...updates };
    return ordersData[index];
  },
  delete: (id: string): boolean => {
    const index = ordersData.findIndex(o => o.id === id);
    if (index === -1) return false;

    ordersData.splice(index, 1);
    return true;
  }
};

// API Cart
export const cartStorage = {
  getByUserId: (userId: string): Cart | null => {
    return cartData.find(c => c.userId === userId) || null;
  },
  getAll: (): Cart[] => [...cartData],
  create: (cart: Omit<Cart, 'id' | 'updatedAt'>): Cart => {
    const newCart: Cart = {
      ...cart,
      id: `cart-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      updatedAt: new Date().toISOString()
    };
    cartData.push(newCart);
    return newCart;
  },
  update: (userId: string, updates: Partial<Cart>): Cart | null => {
    const index = cartData.findIndex(c => c.userId === userId);
    if (index === -1) return null;

    cartData[index] = {
      ...cartData[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    return cartData[index];
  },
  delete: (userId: string): boolean => {
    const index = cartData.findIndex(c => c.userId === userId);
    if (index === -1) return false;

    cartData.splice(index, 1);
    return true;
  },
  addItem: (userId: string, item: Omit<CartItem, 'id' | 'userId' | 'addedAt'>): CartItem => {
    let cart = cartData.find(c => c.userId === userId);

    if (!cart) {
      cart = cartStorage.create({
        userId,
        items: [],
        totalItems: 0,
        totalPrice: 0
      });
      cartData.push(cart);
    }

    const newItem: CartItem = {
      ...item,
      id: `item-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      addedAt: new Date().toISOString()
    };

    cart.items.push(newItem);
    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.product?.prix || 0) * item.quantity, 0);
    cart.updatedAt = new Date().toISOString();

    return newItem;
  },
  updateItem: (userId: string, itemId: string, quantity: number): boolean => {
    const cart = cartData.find(c => c.userId === userId);
    if (!cart) return false;

    const itemIndex = cart.items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return false;

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.product?.prix || 0) * item.quantity, 0);
    cart.updatedAt = new Date().toISOString();

    return true;
  },
  removeItem: (userId: string, itemId: string): boolean => {
    const cart = cartData.find(c => c.userId === userId);
    if (!cart) return false;

    const initialLength = cart.items.length;
    cart.items = cart.items.filter(item => item.id !== itemId);

    if (cart.items.length === initialLength) return false;

    cart.totalItems = cart.items.reduce((sum, item) => sum + item.quantity, 0);
    cart.totalPrice = cart.items.reduce((sum, item) => sum + (item.product?.prix || 0) * item.quantity, 0);
    cart.updatedAt = new Date().toISOString();

    return true;
  }
};

// API Payments
export const paymentsStorage = {
  getAll: (): PaymentTransaction[] => [...paymentsData],
  getById: (id: string): PaymentTransaction | undefined =>
    paymentsData.find(p => p.id === id),
  getByOrderId: (orderId: string): PaymentTransaction | undefined =>
    paymentsData.find(p => p.orderId === orderId),
  getByUserId: (userId: string): PaymentTransaction[] =>
    paymentsData.filter(p => p.userId === userId),
  create: (payment: Omit<PaymentTransaction, 'id' | 'createdAt'>): PaymentTransaction => {
    const newPayment: PaymentTransaction = {
      ...payment,
      id: `pay-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };
    paymentsData.push(newPayment);
    return newPayment;
  },
  update: (id: string, updates: Partial<PaymentTransaction>): PaymentTransaction | null => {
    const index = paymentsData.findIndex(p => p.id === id);
    if (index === -1) return null;

    paymentsData[index] = { ...paymentsData[index], ...updates };
    return paymentsData[index];
  },
  delete: (id: string): boolean => {
    const index = paymentsData.findIndex(p => p.id === id);
    if (index === -1) return false;

    paymentsData.splice(index, 1);
    return true;
  }
};
