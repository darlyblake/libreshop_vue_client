export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  password: string;
  createdAt: string;
  preferences?: {
    notifications: boolean;
    language: string;
    currency: string;
  };
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  address?: string;
  preferences?: {
    notifications: boolean;
    language: string;
    currency: string;
  };
}
