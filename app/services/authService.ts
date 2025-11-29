const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
    [key: string]: any;
  }
}

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password }),
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Échec de la connexion');
  }
  const data = await response.json();
  if (!data.token) {
    throw new Error('Token manquant dans la réponse');
  }
  // Stocker token dans localStorage
  localStorage.setItem('token', data.token);
  return data;
};

export const logout = (): void => {
  localStorage.removeItem('token');
  // Optionally clear other user-related info
};

export const getToken = (): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

export const isAuthenticated = (): boolean => {
  return getToken() !== null;
};

// Fonction utilitaire pour inclure token JWT dans les headers d'une requête fetch
export const authFetch = async (input: RequestInfo, init: RequestInit = {}): Promise<Response> => {
  const token = getToken();
  const headers = new Headers(init.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const response = await fetch(input, {
    ...init,
    headers,
    credentials: 'include'
  });
  if (!response.ok) {
    // gérer erreurs ici, par exemple rediriger vers login si 401
    throw new Error(`Error ${response.status}: ${response.statusText}`);
  }
  return response;
};
