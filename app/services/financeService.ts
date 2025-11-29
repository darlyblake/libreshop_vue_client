import { authFetch } from './authService';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

export const getOverview = async (): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/finances/overview`);
  const json = await response.json();
  return json.data;
};

export const getTransactionHistory = async (): Promise<any[]> => {
  const response = await authFetch(`${API_BASE_URL}/finances/transactions`);
  const json = await response.json();
  return json.data || json;
};

export const postWithdrawalRequest = async (withdrawalData: any): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/finances/withdrawals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(withdrawalData),
  });
  const json = await response.json();
  return json;
};
