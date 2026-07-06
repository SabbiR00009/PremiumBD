import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api, taka, Order } from '../lib/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const FIELDS: { key: string; label: string; placeholder: string; half?: boolean }[] = [
  { key: 'firstName', label: 'First name', placeholder: 'Nusrat', half: true },
  { key: 'lastName', label: 'Last name', placeholder: 'Jahan', half: true },
  { key: 'email', label: 'Email', placeholder: 'you@example.com' },
  { key: 'phone', label: 'Phone', placeholder: '01712345678' },
  { key: 'address', label: 'Street address', placeholder: 'House 12, Road 5, Dhanmondi' },
  { key: 'city', label: 'City', placeholder: 'Dhaka', half: true },
  { key: 'postalCode', label: 'Postal code', placeholder: '1205', half: true },
];

export default function Checkout() {
  const cart = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<Record<string, string>>({
    email: user?.email || '',
  });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-stone-600">Please sign in to check out.</p>
        <Link to="/login?next=/checkout" className="btn btn-primary mt-4">Sign in</Link>
      </div>
    );
  }
  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-stone-600">Your cart is empty.</p>
        <Link to="/products" className="btn btn-primary mt-4">Browse products</Link>
      </div>
    );
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    for (const f of FIELDS) {
      if (!form[f.key]?.trim()) {
        setError(`Please fill in: ${f.label}.`);
        return;
      }
    }
    setBusy(true);
    try {
      await api<Order>('/api/orders', {
        method: 'POST',
        auth: true,
        body: {
          items: cart.items.map((i) => ({
            product: i.productId,
            name: i.name,
            price: i.price,
            quantity: i.quantity,
          })),
          total: cart.total,
          shippingAddress: form,
        },
      });
      cart.clear();
      navigate('/orders?placed=1');
    } catch (err) {
      setError((err as Error).message);
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">Checkout</h1>
      <form onSubmit={submit} className="mt-4 grid gap-6 lg:grid-cols-3">
        <div className="card grid gap-4 p-5 sm:grid-cols-2 lg:col-span-2">
          {FIELDS.map((f) => (
            <div key={f.key} className={f.half ? '' : 'sm:col-span-2'}>
              <label className="label">{f.label}</label>
              <input
                className="input"
                placeholder={f.placeholder}
                value={form[f.key] || ''}
                onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
              />
            </div>
          ))}
        </div>
        <div className="card h-fit p-5">
          <p className="text-sm font-semibold">Order summary</p>
          <ul className="mt-3 space-y-1.5 border-b border-stone-100 pb-3 text-sm">
            {cart.items.map((i) => (
              <li key={i.productId} className="flex justify-between gap-2">
                <span className="text-stone-600">{i.name} ×{i.quantity}</span>
                <span className="shrink-0 font-medium">{taka(i.price * i.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-bangladesh-900">{taka(cart.total)}</span>
          </div>
          <p className="mt-2 text-xs text-stone-400">Payment: cash on delivery (demo).</p>
          {error && <p className="mt-3 text-sm font-medium text-red-600">{error}</p>}
          <button type="submit" disabled={busy} className="btn btn-primary mt-4 w-full">
            {busy ? 'Placing order…' : 'Place order'}
          </button>
        </div>
      </form>
    </div>
  );
}
