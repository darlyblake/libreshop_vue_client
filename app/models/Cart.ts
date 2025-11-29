export interface CartItem {
  id: string;
  productId: string;
  userId: string;
  quantity: number;
  addedAt: string;
  product?: {
    id: string;
    nom: string;
    prix: number;
    image: string;
  };
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  updatedAt: string;
}
