import { authFetch } from './authService';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

export const getPromotions = async (): Promise<any[]> => {
  const response = await authFetch(`${API_BASE_URL}/promotions`);
  const json = await response.json();
  return json.data || json;
};

export const getPromotionById = async (id: string): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/promotions/${id}`);
  const json = await response.json();
  return json.data;
};

export const createPromotion = async (promotionData: any): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/promotions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(promotionData),
  });
  const json = await response.json();
  return json;
};

export const updatePromotion = async (id: string, promotionData: any): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/promotions/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(promotionData),
  });
  const json = await response.json();
  return json;
};

export const deletePromotion = async (id: string): Promise<void> => {
  await authFetch(`${API_BASE_URL}/promotions/${id}`, {
    method: 'DELETE',
  });
};
