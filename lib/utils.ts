import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const TAUX_CONVERSION_XAF = 655.96;

export function formatCurrency(amount: number, currency = 'XAF') {
  const convertedAmount = amount * TAUX_CONVERSION_XAF;
  return new Intl.NumberFormat('fr-FR', {
    // style: 'currency', // currency display can be verbose
    // currency: currency,
  }).format(convertedAmount) + ` ${currency}`;
}
