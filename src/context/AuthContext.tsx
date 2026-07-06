import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { api, User } from '../lib/api';

interface AuthCtx {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('pbd_token');
    if (!token) {
      setLoading(false);
      return;
    }
    api<User>('/api/auth/me', { auth: true })
      .then(setUser)
      .catch(() => localStorage.removeItem('pbd_token'))
      .finally(() => setLoading(false));
  }, []);

  async function login(email: string, password: string) {
    const data = await api<{ token: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    localStorage.setItem('pbd_token', data.token);
    setUser(data.user);
  }

  async function register(name: string, email: string, password: string) {
    const data = await api<{ token: string; user: User }>('/api/auth/register', {
      method: 'POST',
      body: { name, email, password },
    });
    localStorage.setItem('pbd_token', data.token);
    setUser(data.user);
  }

  function logout() {
    localStorage.removeItem('pbd_token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthCtx {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
