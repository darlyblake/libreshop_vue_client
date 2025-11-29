export interface PaymentTransaction {
  id: string;
  orderId: string;
  userId: string;
  amount: number;
  currency: string;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId?: string;
  createdAt: string;
  completedAt?: string;
  details?: PaymentDetails;
}

export type PaymentMethod = 'visa_mobile' | 'airtel_money' | 'moov_money';

export type PaymentStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';

export interface PaymentDetails {
  // Visa Mobile
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;

  // Mobile Money
  phoneNumber?: string;
  provider?: 'airtel' | 'moov';

  // Transaction details
  reference?: string;
  description?: string;

  // Refund details
  refundedAmount?: number;
  refundedAt?: string;
}

export interface PaymentMethodConfig {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  fees: number;
  available: boolean;
}
