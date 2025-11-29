import { Produit } from '@/app/models/Produit';
import { Category } from '@/app/models/Category';
import { Order } from '@/app/models/Order';

const DB_KEY = 'libreshop_db';

const categories: Category[] = [
    { id: 'technologie', nom: "Technologie", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATo4KXQXXpWybPXNAy3ha-gdM0vyOlLnBKvcKZK0ZBtf4Umlvf1soaQzUN9UASbpfRLGGvYaoHvtcGPqMvPiUZU5-CHBaS-gk2kxo_lbslWGT-xUh9Vrw_TU9iEQiVAiZrcixABWhpF8vLd4F03JpmuENdzimmWFSH18N4bEI3wMmw179yC2jA-atop7gNc7H28XhjKd79Pt_U1nFMh2psXj_Ui6uahJwvfneC1YARDHIh8wsFw12kgBXMpPbdWiKhGP21DxvR0kY", description: "Découvrez les dernières innovations" },
    { id: 'mode', nom: "Mode", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaBWDGpEO7nV6zs0f5LEJO-BNJ8GSlfwlphfhaxVHt7BlSif6a2HnbLhvW9GRYWo7uos6SU38Kv9tIk_4QOw8vaNzZGhHizgWHdxnRL9rnPwZxWFYOOFh9J9-7BGAtHYubOJadLVtClXzHjGqLNn1QDgZaZFVjQmf1jxZjSujpx7cvsMWBXLkTkpRjZyLFAxweDyrc7UuvzV5MbbTRqFEKcvufdS-KYsqXvicRzfXzccQbnutOl7hsOnOx_GP2um8bFuxmpRdg3EI", description: "Tendances et styles du moment" },
    { id: 'maison', nom: "Maison", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEsrucvU6a2XMlJct51MG3DAzvvsdUI7hHpzp_pgCN2KnR8CXpcItJL3Q9tDxQxguFNgjs4O7Rdna5YJKrq3Vi-18GC_HreWUQ2w0t2fXPpaOM3l5hKorG9MtnWDaga5ORqRHXDlCDZZreWX4SMUUIMC2r69naPOeTJZPrnZhvGI6TKjB-YNyo6HF-6OQMFjRngroM1d-Xml6kgOKkes3FHLd0Wz5HkDecmDfMsGXkGgjursAnswxpAfqq3styhpYG41AwShtKCik", description: "Pour un intérieur unique" },
    { id: 'sport', nom: "Sport", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDLwLiSL3laFVQS_T8aMjD_hTH_O36-zyuWB6Jq2PsHkuM2c7A5imKfGVMTtqzqMwyG_CtHWIVnqjTB1u3lvPfO7E2Z34OGBTy0", description: "Équipements et accessoires" }
];

const produits: Produit[] = [
    // Technologie
    { id: '1', nom: 'Montre Connectée Pro V3', prix: 199.99, oldPrice: 299.99, discount: 33, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', isTrending: true, note: 4.5, reviewCount: 1542, categoryId: 'technologie' },
    { id: '2', nom: 'Écouteurs Sans Fil Premium avec ANC', prix: 129.99, oldPrice: 199.99, discount: 35, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop', isTrending: true, note: 4.8, reviewCount: 3890, categoryId: 'technologie' },
    { id: '4', nom: 'Smartphone Ultra Pro (édition limitée)', prix: 699.99, oldPrice: 899.99, discount: 22, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', isTrending: true, note: 4.7, reviewCount: 210, categoryId: 'technologie' },
    { id: '5', nom: 'Tablette Pro M2 128Go', prix: 449.99, oldPrice: 599.99, discount: 25, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', isNew: true, note: 4.1, reviewCount: 89, categoryId: 'technologie' },
    { id: '6', nom: 'Casque Audio Premium Hi-Fi', prix: 159.99, oldPrice: 249.99, discount: 36, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', isTrending: true, note: 4.9, reviewCount: 5600, categoryId: 'technologie' },
    { id: '101', nom: 'Appareil Photo Reflex', prix: 950, note: 4.6, image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop', categoryId: 'technologie' },
    { id: '103', nom: 'Casque Audio Pro', prix: 250, note: 4.2, image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop', categoryId: 'technologie' },
    { id: '104', nom: 'Ordinateur Portable ABC', prix: 1500, note: 4.8, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop', categoryId: 'technologie' },
    { id: '105', nom: 'Console de Jeux', prix: 500, note: 4.9, image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop', categoryId: 'technologie' },
    { id: '106', nom: 'Smartphone XYZ', prix: 1200, note: 4.5, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop', categoryId: 'technologie' },
    { id: '107', nom: 'Enceinte Bluetooth', prix: 150, note: 4.3, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', categoryId: 'technologie' },
    { id: '108', nom: 'Tablette Tactile', prix: 600, note: 4.5, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop', categoryId: 'technologie' },
    // Mode
    { id: '3', nom: 'Sac à Main Designer en cuir végétal', prix: 89.99, oldPrice: 149.99, discount: 40, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', isNew: true, note: 4.2, reviewCount: 450, categoryId: 'mode' },
    { id: '102', nom: 'Montre Classique', prix: 250, oldPrice: 300, discount: 17, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', note: 4.4, reviewCount: 123, categoryId: 'mode' },
    { id: '201', nom: 'Robe d\'été élégante', prix: 79.99, oldPrice: 129.99, discount: 38, image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', isNew: true, note: 4.3, reviewCount: 234, categoryId: 'mode' },
    { id: '202', nom: 'Jean Slim Fit', prix: 59.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop', note: 4.1, reviewCount: 567, categoryId: 'mode' },
    { id: '203', nom: 'Chaussures de sport', prix: 89.99, oldPrice: 119.99, discount: 25, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop', isTrending: true, note: 4.4, reviewCount: 892, categoryId: 'mode' },
    { id: '204', nom: 'T-shirt coton bio', prix: 24.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', note: 4.0, reviewCount: 123, categoryId: 'mode' },
    { id: '205', nom: 'Veste en cuir', prix: 199.99, oldPrice: 299.99, discount: 33, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop', isTrending: true, note: 4.6, reviewCount: 345, categoryId: 'mode' },
    // Maison
    { id: '301', nom: 'Lampe de bureau LED', prix: 45.99, oldPrice: 69.99, discount: 34, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', isNew: true, note: 4.2, reviewCount: 156, categoryId: 'maison' },
    { id: '302', nom: 'Coussin décoratif', prix: 19.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', note: 4.1, reviewCount: 89, categoryId: 'maison' },
    { id: '303', nom: 'Plante artificielle', prix: 29.99, oldPrice: 49.99, discount: 40, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop', note: 4.3, reviewCount: 234, categoryId: 'maison' },
    { id: '304', nom: 'Tapis moderne', prix: 89.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', isTrending: true, note: 4.4, reviewCount: 456, categoryId: 'maison' },
    { id: '305', nom: 'Cadre photo bois', prix: 15.99, oldPrice: 24.99, discount: 36, image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop', note: 4.0, reviewCount: 78, categoryId: 'maison' },
    { id: '306', nom: 'Vase décoratif', prix: 34.99, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop', note: 4.2, reviewCount: 167, categoryId: 'maison' },
    { id: '307', nom: 'Horloge murale', prix: 39.99, oldPrice: 59.99, discount: 33, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop', isNew: true, note: 4.3, reviewCount: 234, categoryId: 'maison' },
    { id: '308', nom: 'Boîte de rangement', prix: 24.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', note: 4.1, reviewCount: 145, categoryId: 'maison' },
    // Sport
    { id: '401', nom: 'Ballon de football', prix: 29.99, oldPrice: 39.99, discount: 25, image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=400&fit=crop', isTrending: true, note: 4.5, reviewCount: 678, categoryId: 'sport' },
    { id: '402', nom: 'Tapis de yoga', prix: 34.99, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop', note: 4.3, reviewCount: 345, categoryId: 'sport' },
    { id: '403', nom: 'Haltères 5kg', prix: 49.99, oldPrice: 69.99, discount: 29, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', note: 4.4, reviewCount: 567, categoryId: 'sport' },
    { id: '404', nom: 'Vélo d\'appartement', prix: 299.99, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', isNew: true, note: 4.6, reviewCount: 234, categoryId: 'sport' },
    { id: '405', nom: 'T-shirt de sport', prix: 19.99, oldPrice: 29.99, discount: 33, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop', note: 4.2, reviewCount: 456, categoryId: 'sport' },
    { id: '406', nom: 'Bouteille d\'eau sport', prix: 14.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', note: 4.1, reviewCount: 789, categoryId: 'sport' },
    { id: '407', nom: 'Gants de boxe', prix: 39.99, oldPrice: 59.99, discount: 33, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop', isTrending: true, note: 4.4, reviewCount: 321, categoryId: 'sport' },
    { id: '408', nom: 'Sac de sport', prix: 24.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', note: 4.3, reviewCount: 234, categoryId: 'sport' },
];

const orders: Order[] = [
  {
    id: 'CMD-001',
    date: '2023-10-25',
    status: 'paid_delivered',
    deliveryDate: '2023-10-28',
    total: 299.97,
    userId: 'user-1',
    products: [
      { ...produits.find(p => p.id === '2')!, quantity: 1 },
      { ...produits.find(p => p.id === '3')!, quantity: 2 }
    ]
  },
  {
    id: 'CMD-002',
    date: '2023-10-24',
    status: 'paid_not_delivered',
    deliveryDate: '2023-11-01',
    trackingNumber: 'TRK-FR34567890',
    total: 699.99,
    userId: 'user-1',
    products: [
      { ...produits.find(p => p.id === '4')!, quantity: 1 }
    ]
  },
  {
    id: 'CMD-003',
    date: '2023-10-23',
    status: 'not_paid',
    total: 449.99,
    userId: 'user-1',
    products: [
      { ...produits.find(p => p.id === '5')!, quantity: 1 }
    ]
  }
];


const getDb = () => {
    if (typeof window === 'undefined') {
        return { produits, categories, orders, users: [] };
    }
    const db = localStorage.getItem(DB_KEY);
    return db ? JSON.parse(db) : { produits, categories, orders, users: [] };
};

const saveDb = (db: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(DB_KEY, JSON.stringify(db));
    }
};

export const initializeDb = () => {
    if (typeof window !== 'undefined' && !localStorage.getItem(DB_KEY)) {
        console.log("Initialisation de la base de données fictive...");
        saveDb({
            produits,
            categories,
            orders,
            users: [
                { id: 'user-1', email: 'test@example.com', password: 'password123', fullName: 'Test User' }
            ]
        });
    }
};

export const db = {
    produits: {
        getAll: () => getDb().produits,
        getById: (id: string) => getDb().produits.find((p: Produit) => p.id === id),
        getByCategory: (categoryId: string) => getDb().produits.filter((p: Produit) => p.categoryId === categoryId),
        getTrending: () => getDb().produits.filter((p: Produit) => p.isTrending),
    },
    categories: {
        getAll: () => getDb().categories,
        getById: (id: string) => getDb().categories.find((c: Category) => c.id === id),
    },
    orders: {
        getByUserId: (userId: string) => getDb().orders.filter((o: Order) => o.userId === userId),
        create: (order: Omit<Order, 'id' | 'date'>) => {
            const currentDb = getDb();
            const newOrder: Order = {
                ...order,
                id: `CMD-${Math.floor(Math.random() * 100000)}`,
                date: new Date().toISOString(),
            };
            currentDb.orders.push(newOrder);
            saveDb(currentDb);
            return newOrder;
        }
    },
    users: {
        findByEmail: (email: string) => getDb().users.find((u: any) => u.email === email),
        create: (user: any) => {
            const currentDb = getDb();
            const newUser = { ...user, id: `user-${currentDb.users.length + 1}` };
            currentDb.users.push(newUser);
            saveDb(currentDb);
            return newUser;
        }
    }
};