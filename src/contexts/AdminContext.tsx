import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { api, ApiError } from '../lib/api';
import { useAuth } from './AuthContext';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  brand: string;
  origin: string;
  createdAt: string;
}

interface Order {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  items: Array<{
    product: string;
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  createdAt: string;
}

interface AdminContextType {
  products: Product[];
  orders: Order[];
  users: AdminUser[];
  isLoading: boolean;
  error: string | null;
  // Product methods
  fetchProducts: () => Promise<void>;
  createProduct: (product: Omit<Product, '_id' | 'createdAt'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  // Order methods
  fetchOrders: () => Promise<void>;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  // User methods
  fetchUsers: () => Promise<void>;
  updateUserRole: (id: string, role: string) => Promise<void>;
  clearError: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const data = await api.getProducts();
      setProducts(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const createProduct = async (product: Omit<Product, '_id' | 'createdAt'>) => {
    try {
      setIsLoading(true);
      const newProduct = await api.createProduct(product);
      setProducts(prev => [...prev, newProduct]);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to create product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    try {
      setIsLoading(true);
      const updatedProduct = await api.updateProduct(id, product);
      setProducts(prev => prev.map(p => p._id === id ? updatedProduct : p));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setIsLoading(true);
      await api.deleteProduct(id);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to delete product');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const data = await api.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to fetch orders');
    } finally {
      setIsLoading(false);
    }
  };

  const updateOrderStatus = async (id: string, status: string) => {
    try {
      setIsLoading(true);
      await api.updateOrderStatus(id, status);
      setOrders(prev => prev.map(order => 
        order._id === id ? { ...order, status } : order
      ));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update order status');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const data = await api.getUsers();
      setUsers(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (id: string, role: string) => {
    try {
      setIsLoading(true);
      await api.updateUserRole(id, role);
      setUsers(prev => prev.map(user => 
        user._id === id ? { ...user, role } : user
      ));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update user role');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    products,
    orders,
    users,
    isLoading,
    error,
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    fetchOrders,
    updateOrderStatus,
    fetchUsers,
    updateUserRole,
    clearError,
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};