import { paymentsStorage } from '@/lib/fileStorage';
import { PaymentTransaction } from '@/app/models/Payment';

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'mobile_money' | 'card';
  provider?: 'airtel' | 'moov' | 'visa' | 'mastercard';
  icon: string;
  description: string;
  fees: number;
  minAmount: number;
  maxAmount: number;
  enabled: boolean;
}

export interface PaymentRequest {
  amount: number;
  currency: string;
  method: string;
  orderId: string;
  userId: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  message: string;
  data?: any;
}

// Configuration des méthodes de paiement
export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'airtel_money',
    name: 'Airtel Money',
    type: 'mobile_money',
    provider: 'airtel',
    icon: '📱',
    description: 'Paiement via Airtel Money',
    fees: 0.5,
    minAmount: 100,
    maxAmount: 500000,
    enabled: true
  },
  {
    id: 'moov_money',
    name: 'Moov Money',
    type: 'mobile_money',
    provider: 'moov',
    icon: '📱',
    description: 'Paiement via Moov Money',
    fees: 0.5,
    minAmount: 100,
    maxAmount: 500000,
    enabled: true
  },
  {
    id: 'visa_mobile',
    name: 'Carte Visa Mobile',
    type: 'card',
    provider: 'visa',
    icon: '💳',
    description: 'Paiement par carte Visa',
    fees: 2.5,
    minAmount: 500,
    maxAmount: 1000000,
    enabled: true
  },
  {
    id: 'mastercard_mobile',
    name: 'Mastercard Mobile',
    type: 'card',
    provider: 'mastercard',
    icon: '💳',
    description: 'Paiement par carte Mastercard',
    fees: 2.5,
    minAmount: 500,
    maxAmount: 1000000,
    enabled: true
  }
];

// Service de paiement simulé
export class PaymentService {
  private static instance: PaymentService;

  private constructor() {}

  static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  // Obtenir toutes les méthodes de paiement disponibles
  getAvailableMethods(): PaymentMethod[] {
    return PAYMENT_METHODS.filter(method => method.enabled);
  }

  // Obtenir une méthode de paiement par ID
  getMethodById(id: string): PaymentMethod | undefined {
    return PAYMENT_METHODS.find(method => method.id === id);
  }

  // Calculer les frais de transaction
  calculateFees(amount: number, methodId: string): number {
    const method = this.getMethodById(methodId);
    if (!method) return 0;

    if (method.type === 'mobile_money') {
      return method.fees;
    } else {
      return (amount * method.fees) / 100;
    }
  }

  // Calculer le montant total avec frais
  calculateTotal(amount: number, methodId: string): number {
    return amount + this.calculateFees(amount, methodId);
  }

  // Valider un paiement
  validatePayment(request: PaymentRequest): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const method = this.getMethodById(request.method);

    if (!method) {
      errors.push('Méthode de paiement invalide');
      return { valid: false, errors };
    }

    if (!method.enabled) {
      errors.push('Cette méthode de paiement n\'est pas disponible');
    }

    if (request.amount < method.minAmount) {
      errors.push(`Le montant minimum est de ${method.minAmount} ${request.currency}`);
    }

    if (request.amount > method.maxAmount) {
      errors.push(`Le montant maximum est de ${method.maxAmount} ${request.currency}`);
    }

    return { valid: errors.length === 0, errors };
  }

  // Traiter un paiement (simulation)
  async processPayment(request: PaymentRequest): Promise<PaymentResponse> {
    // Validation
    const validation = this.validatePayment(request);
    if (!validation.valid) {
      return {
        success: false,
        message: validation.errors.join(', '),
      };
    }

    // Simulation du délai de traitement
    await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 3000));

    // Simulation de succès/échec (90% de succès)
    const isSuccess = Math.random() > 0.1;

    if (!isSuccess) {
      return {
        success: false,
        message: 'Paiement échoué. Veuillez réessayer.',
      };
    }

    // Créer la transaction
    const transaction: Omit<PaymentTransaction, 'id' | 'createdAt'> = {
      orderId: request.orderId,
      userId: request.userId,
      amount: request.amount,
      currency: request.currency,
      method: request.method as any,
      status: 'completed',
      transactionId: `TXN-${request.method.toUpperCase()}-${Date.now()}`,
      completedAt: new Date().toISOString(),
      details: {
        description: request.description || `Paiement commande ${request.orderId}`,
        ...request.metadata
      }
    };

    const savedTransaction = paymentsStorage.create(transaction);

    return {
      success: true,
      transactionId: savedTransaction.transactionId,
      message: 'Paiement traité avec succès',
      data: savedTransaction
    };
  }

  // Vérifier le statut d'une transaction
  async checkPaymentStatus(transactionId: string): Promise<PaymentTransaction | null> {
    const transaction = paymentsStorage.getAll().find(t => t.transactionId === transactionId);
    return transaction || null;
  }

  // Annuler un paiement (si possible)
  async cancelPayment(transactionId: string): Promise<boolean> {
    const transaction = paymentsStorage.getAll().find(t => t.transactionId === transactionId);
    if (!transaction) return false;

    // Ne peut annuler que les paiements en attente
    if (transaction.status !== 'pending') return false;

    paymentsStorage.update(transaction.id, { status: 'cancelled' });
    return true;
  }

  // Rembourser un paiement
  async refundPayment(transactionId: string, amount?: number): Promise<PaymentResponse> {
    const transaction = paymentsStorage.getAll().find(t => t.transactionId === transactionId);
    if (!transaction) {
      return {
        success: false,
        message: 'Transaction non trouvée'
      };
    }

    if (transaction.status !== 'completed') {
      return {
        success: false,
        message: 'Impossible de rembourser cette transaction'
      };
    }

    // Simulation du remboursement
    await new Promise(resolve => setTimeout(resolve, 1500));

    const refundAmount = amount || transaction.amount;

    paymentsStorage.update(transaction.id, {
      status: 'refunded',
      details: {
        ...transaction.details,
        refundedAmount: refundAmount,
        refundedAt: new Date().toISOString()
      }
    });

    return {
      success: true,
      message: `Remboursement de ${refundAmount} ${transaction.currency} effectué`,
      data: { refundAmount, transactionId }
    };
  }
}

// Instance singleton
export const paymentService = PaymentService.getInstance();
