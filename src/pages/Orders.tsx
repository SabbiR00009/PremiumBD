import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { api, Order, taka } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-gold-100 text-gold-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped: 'bg-violet-100 text-violet-800',
  delivered: 'bg-bangladesh-100 text-bangladesh-800',
  cancelled: 'bg-stone-200 text-stone-600',
};

export default function Orders() {
  const { user, loading } = useAuth();
  const [params] = useSearchParams();
  const [orders, setOrders] = useState<Order[] | null>(null);

  useEffect(() => {
    if (!user) return;
    api<Order[]>('/api/orders/my-orders', { auth: true })
      .then(setOrders)
      .catch(() => setOrders([]));
  }, [user]);

  if (loading) return <p className="py-16 text-center text-sm text-stone-400">Loading…</p>;
  if (!user) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-stone-600">Sign in to see your orders.</p>
        <Link to="/login?next=/orders" className="btn btn-primary mt-4">Sign in</Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {params.get('placed') && (
        <p className="mb-4 rounded-lg border border-bangladesh-200 bg-bangladesh-50 px-4 py-3 text-sm text-bangladesh-800">
          🎉 <b>Order placed!</b> We'll contact you to confirm delivery.
        </p>
      )}
      <h1 className="text-2xl font-bold text-stone-800">My orders</h1>

      {!orders ? (
        <p className="py-16 text-center text-sm text-stone-400">Loading orders…</p>
      ) : orders.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-stone-500">You haven't ordered anything yet.</p>
          <Link to="/products" className="btn btn-primary mt-4">Start shopping</Link>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {orders.map((o) => (
            <li key={o._id} className="card p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">Order #{o._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-stone-400">
                    {new Date(o.createdAt).toLocaleString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </p>
                </div>
                <span className={`badge capitalize ${STATUS_STYLE[o.status]}`}>{o.status}</span>
              </div>
              <ul className="mt-3 space-y-1 border-t border-stone-100 pt-3 text-sm text-stone-600">
                {o.items.map((i, idx) => (
                  <li key={idx} className="flex justify-between">
                    <span>{i.name} ×{i.quantity}</span>
                    <span className="font-medium">{taka(i.price * i.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-right text-sm font-bold text-bangladesh-900">Total {taka(o.total)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
