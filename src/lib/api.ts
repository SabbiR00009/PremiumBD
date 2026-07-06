const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5005';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  brand: string;
  origin: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface OrderItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Record<string, string>;
  createdAt: string;
}

export function getToken(): string | null {
  return localStorage.getItem('pbd_token');
}

export async function api<T>(
  path: string,
  options: { method?: string; body?: unknown; auth?: boolean } = {}
): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (options.auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error((data as { message?: string }).message || `Request failed (${res.status})`);
  }
  return data as T;
}

export function taka(n: number): string {
  return `৳${n.toLocaleString('en-US')}`;
}

export const ORIGINS = ['USA', 'Europe', 'UK', 'Germany', 'France', 'Italy'];
