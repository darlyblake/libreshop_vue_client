import { Produit } from './Produit';

export interface ProductInOrder extends Produit {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'paid_delivered' | 'paid_not_delivered' | 'not_paid';
  deliveryDate?: string;
  trackingNumber?: string;
  total: number;
  products: ProductInOrder[];
  userId: string;
  paymentMethod?: 'visa_mobile' | 'airtel_money' | 'moov_money';
}
