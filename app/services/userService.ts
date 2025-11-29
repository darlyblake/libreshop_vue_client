import { authFetch } from './authService';

const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

export const getCurrentUser = async (): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/auth/me`);
  const json = await response.json();
  return json.data;
};

export const updateProfile = async (profileData: any): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/auth/profile`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  const json = await response.json();
  return json.data;
};

export const changePassword = async (passwordData: any): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/auth/change-password`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(passwordData),
  });
  const json = await response.json();
  return json;
};

export const deactivateAccount = async (): Promise<any> => {
  const response = await authFetch(`${API_BASE_URL}/auth/deactivate`, {
    method: 'DELETE',
  });
  const json = await response.json();
  return json;
};
