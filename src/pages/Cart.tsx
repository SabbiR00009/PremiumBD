import { Link, useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { taka } from '../lib/api';

export default function Cart() {
  const cart = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-4xl">🛍️</p>
        <p className="mt-2 font-medium text-stone-700">Your cart is empty</p>
        <Link to="/products" className="btn btn-primary mt-4">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">Your cart ({cart.count})</h1>
      <div className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3 lg:col-span-2">
          {cart.items.map((item) => (
            <div key={item.productId} className="card flex items-center gap-4 p-3">
              <img src={item.image} alt={item.name} className="h-20 w-20 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <Link to={`/products/${item.productId}`} className="text-sm font-medium hover:text-bangladesh-700">
                  {item.name}
                </Link>
                <p className="text-xs text-stone-400">{taka(item.price)} each</p>
                <div className="mt-2 flex items-center rounded-lg border border-stone-300 w-fit">
                  <button onClick={() => cart.updateQty(item.productId, item.quantity - 1)} className="px-2.5 py-1 text-stone-600 hover:bg-stone-100">−</button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button onClick={() => cart.updateQty(item.productId, item.quantity + 1)} className="px-2.5 py-1 text-stone-600 hover:bg-stone-100">+</button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-bangladesh-900">{taka(item.price * item.quantity)}</p>
                <button onClick={() => cart.remove(item.productId)} className="mt-2 text-red-500 hover:text-red-700" aria-label="Remove">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="card h-fit p-4">
          <p className="text-sm font-semibold">Summary</p>
          <div className="mt-3 flex justify-between text-sm">
            <span className="text-stone-500">Subtotal</span>
            <span className="font-bold text-bangladesh-900">{taka(cart.total)}</span>
          </div>
          <p className="mt-1 text-xs text-stone-400">Delivery is arranged after ordering.</p>
          <button
            onClick={() => navigate(user ? '/checkout' : '/login?next=/checkout')}
            className="btn btn-primary mt-4 w-full"
          >
            Checkout
          </button>
          {!user && <p className="mt-2 text-center text-xs text-stone-400">You'll sign in first.</p>}
        </div>
      </div>
    </div>
  );
}
