"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { CartItem, getCartItems, addToCart as addToCartService, getCartItemCount as getCartItemCountService } from '@/app/services/orderService';
import { useToast } from '@/components/ui/use-toast';

interface CartContextType {
  cartItems: CartItem[];
  cartItemCount: number;
  addToCart: (productId: string, quantity?: number) => Promise<void>;
  refreshCart: () => Promise<void>;
  clearCart: () => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Clé pour localStorage
const CART_STORAGE_KEY = 'libreshop_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // Sauvegarder dans localStorage
  const saveCartToStorage = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Erreur lors de la sauvegarde du panier:', error);
    }
  }, []);

  // Charger depuis localStorage
  const loadCartFromStorage = useCallback((): CartItem[] => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Erreur lors du chargement du panier:', error);
      return [];
    }
  }, []);

  const refreshCart = useCallback(async () => {
    if (isLoading) return; // Éviter les appels multiples

    setIsLoading(true);
    try {
      // Essayer de charger depuis l'API d'abord
      const items = await getCartItems();
      setCartItems(items);
      saveCartToStorage(items);

      const count = items.reduce((sum, item) => sum + item.quantite, 0);
      setCartItemCount(count);
    } catch (error) {
      // Fallback vers localStorage
      console.warn('API indisponible, chargement depuis localStorage');
      const storedItems = loadCartFromStorage();
      setCartItems(storedItems);
      setCartItemCount(storedItems.reduce((sum, item) => sum + item.quantite, 0));
    } finally {
      setIsLoading(false);
      setIsInitialized(true);
    }
  }, [isLoading, saveCartToStorage, loadCartFromStorage]);

  const addToCart = async (productId: string, quantity: number = 1) => {
    setIsLoading(true);
    try {
      await addToCartService({ productId, quantity });
      await refreshCart();
      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté à votre panier",
      });
    } catch (error) {
      // Fallback: mise à jour locale
      console.warn('API indisponible, mise à jour locale du panier');
      setCartItems(prev => {
        const existing = prev.find(item => item.id === productId);
        let newItems: CartItem[];

        if (existing) {
          newItems = prev.map(item =>
            item.id === productId
              ? { ...item, quantite: item.quantite + quantity }
              : item
          );
        } else {
          // Créer un nouvel item (données minimales)
          newItems = [...prev, {
            id: productId,
            nom: `Produit ${productId}`,
            prix: 0,
            quantite: quantity,
            image: ''
          }];
        }

        saveCartToStorage(newItems);
        setCartItemCount(newItems.reduce((sum, item) => sum + item.quantite, 0));
        return newItems;
      });

      toast({
        title: "Produit ajouté",
        description: "Le produit a été ajouté à votre panier (mode hors ligne)",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromCart = async (productId: string) => {
    setIsLoading(true);
    try {
      // TODO: Implémenter la suppression via API
      setCartItems(prev => {
        const newItems = prev.filter(item => item.id !== productId);
        saveCartToStorage(newItems);
        setCartItemCount(newItems.reduce((sum, item) => sum + item.quantite, 0));
        return newItems;
      });
      toast({
        title: "Produit retiré",
        description: "Le produit a été retiré de votre panier",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Implémenter la mise à jour via API
      setCartItems(prev => {
        const newItems = prev.map(item =>
          item.id === productId
            ? { ...item, quantite: quantity }
            : item
        );
        saveCartToStorage(newItems);
        setCartItemCount(newItems.reduce((sum, item) => sum + item.quantite, 0));
        return newItems;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearCart = async () => {
    setIsLoading(true);
    try {
      // TODO: Implémenter la suppression via API
      setCartItems([]);
      setCartItemCount(0);
      localStorage.removeItem(CART_STORAGE_KEY);
      toast({
        title: "Panier vidé",
        description: "Tous les articles ont été retirés de votre panier",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isInitialized) {
      refreshCart();
    }
  }, [isInitialized, refreshCart]);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartItemCount,
      addToCart,
      refreshCart,
      clearCart,
      removeFromCart,
      updateQuantity,
      isLoading
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
