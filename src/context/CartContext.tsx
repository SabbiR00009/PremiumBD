import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Product } from '../lib/api';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  stock: number;
  quantity: number;
}

interface CartCtx {
  items: CartItem[];
  add: (product: Product, qty?: number) => { ok: boolean; message: string };
  updateQty: (productId: string, qty: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  count: number;
  total: number;
}

const CartContext = createContext<CartCtx | null>(null);
const KEY = 'pbd_cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // corrupt cart — start fresh
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(items));
  }, [items, loaded]);

  function add(product: Product, qty = 1) {
    let result = { ok: true, message: 'Added to cart.' };
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      const already = existing?.quantity || 0;
      if (already + qty > product.stock) {
        result = { ok: false, message: `Only ${product.stock} in stock.` };
        return prev;
      }
      if (existing) {
        return prev.map((i) =>
          i.productId === product._id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          stock: product.stock,
          quantity: qty,
        },
      ];
    });
    return result;
  }

  function updateQty(productId: string, qty: number) {
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId
          ? { ...i, quantity: Math.max(1, Math.min(qty, i.stock)) }
          : i
      )
    );
  }

  function remove(productId: string) {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  const count = useMemo(() => items.reduce((s, i) => s + i.quantity, 0), [items]);
  const total = useMemo(() => items.reduce((s, i) => s + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, add, updateQty, remove, clear, count, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartCtx {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
