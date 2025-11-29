export type Produit = {
  id: string;
  nom: string;
  prix: number;
  oldPrice?: number;
  note: number;
  reviewCount?: number;
  image: string;
  categoryId: string;
  isTrending?: boolean;
  isNew?: boolean;
  discount?: number;
  shopId?: string;
};