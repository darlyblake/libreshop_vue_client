import { authFetch } from './authService';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

export interface OrderData {
  productId: string;
  quantity: number;
  // Add other fields as needed for order creation
}

export const createOrder = async (orderData: OrderData): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  const json = await response.json();
  return json;
};

export const addToCart = createOrder;

export const getUserOrders = async (): Promise<any[]> => {
  const response = await authFetch(`${API_BASE_URL}/orders`);
  const json = await response.json();
  return json.data || json;
};

export const getOrderDetails = async (orderId: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/orders/${orderId}`);
  const json = await response.json();
  return json.data;
};

export const getCartItems = async (): Promise<any[]> => {
  const response = await authFetch(`${API_BASE_URL}/cart`);
  const json = await response.json();
  return json.data || json;
};

export const getOrders = async (): Promise<any[]> => {
  const response = await authFetch(`${API_BASE_URL}/orders`);
  const json = await response.json();
  return json.data || json;
};

export const removeFromCart = async (productId: string): Promise<void> => {
  await authFetch(`${API_BASE_URL}/cart/${productId}`, {
    method: 'DELETE',
  });
};

export const updateCartItemQuantity = async (productId: string, quantity: number): Promise<void> => {
  await authFetch(`${API_BASE_URL}/cart/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantity }),
  });
};
