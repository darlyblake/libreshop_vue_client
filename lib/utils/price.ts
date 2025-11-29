/**
 * Utility functions for price calculations and currency conversion
 */

// Conversion rate from EUR to XAF (Central African Franc)
export const EUR_TO_XAF_RATE = 655.96;

/**
 * Convert price from EUR to XAF
 * @param priceInEur - Price in Euros
 * @returns Price in XAF
 */
export const convertEurToXaf = (priceInEur: number): number => {
  return priceInEur * EUR_TO_XAF_RATE;
};

/**
 * Format price for display in XAF
 * @param priceInEur - Price in Euros
 * @returns Formatted price string in XAF
 */
export const formatPriceXaf = (priceInEur: number): string => {
  return convertEurToXaf(priceInEur).toLocaleString('fr-FR') + ' XAF';
};

/**
 * Format price for display in EUR
 * @param priceInEur - Price in Euros
 * @returns Formatted price string in EUR
 */
export const formatPriceEur = (priceInEur: number): string => {
  return priceInEur.toFixed(2) + ' €';
};

/**
 * Calculate discount percentage
 * @param originalPrice - Original price in EUR
 * @param discountedPrice - Discounted price in EUR
 * @returns Discount percentage
 */
export const calculateDiscountPercentage = (originalPrice: number, discountedPrice: number): number => {
  if (originalPrice <= 0) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Calculate discounted price
 * @param originalPrice - Original price in EUR
 * @param discountPercentage - Discount percentage (0-100)
 * @returns Discounted price in EUR
 */
export const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number): number => {
  return originalPrice * (1 - discountPercentage / 100);
};
