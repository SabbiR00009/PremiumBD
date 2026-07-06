import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { api, ORIGINS, Product, User } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const EMPTY = {
  name: '', description: '', price: '', category: 'Cosmetics',
  brand: '', origin: 'USA', image: '', stock: '10',
};

export default function Admin() {
  const { user, loading } = useAuth();
  const [tab, setTab] = useState<'product' | 'users'>('product');
  const [form, setForm] = useState<Record<string, string>>(EMPTY);
  const [users, setUsers] = useState<User[] | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (tab === 'users' && user?.role === 'admin') {
      api<User[]>('/api/admin/users', { auth: true }).then(setUsers).catch(() => setUsers([]));
    }
  }, [tab, user]);

  if (loading) return <p className="py-16 text-center text-sm text-stone-400">Loading…</p>;
  if (!user || user.role !== 'admin') {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-stone-600">Admin access required.</p>
        <Link to="/" className="btn btn-primary mt-4">Back to home</Link>
      </div>
    );
  }

  async function addProduct(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!form.name.trim() || !form.description.trim() || !form.brand.trim() || !form.image.trim()) {
      setMsg({ ok: false, text: 'Please fill in every field.' });
      return;
    }
    if (!(Number(form.price) > 0)) {
      setMsg({ ok: false, text: 'Price must be a positive number.' });
      return;
    }
    setBusy(true);
    try {
      const created = await api<Product>('/api/products', {
        method: 'POST',
        auth: true,
        body: {
          name: form.name.trim(),
          description: form.description.trim(),
          price: Number(form.price),
          category: form.category.trim(),
          brand: form.brand.trim(),
          origin: form.origin,
          image: form.image.trim(),
          stock: Number(form.stock) || 0,
        },
      });
      setMsg({ ok: true, text: `✓ "${created.name}" added to the catalog.` });
      setForm(EMPTY);
    } catch (err) {
      setMsg({ ok: false, text: (err as Error).message });
    }
    setBusy(false);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">Admin panel</h1>
      <div className="mt-4 flex gap-2 border-b border-stone-200">
        {(['product', 'users'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t ? 'border-b-2 border-bangladesh-700 text-bangladesh-800' : 'text-stone-500'
            }`}
          >
            {t === 'product' ? 'Add product' : 'Users'}
          </button>
        ))}
      </div>

      {tab === 'product' ? (
        <form onSubmit={addProduct} className="card mt-4 grid gap-4 p-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Product name</label>
            <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Chanel No.5 Eau de Parfum 100ml" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description</label>
            <textarea rows={3} className="input" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          </div>
          <div>
            <label className="label">Price (৳)</label>
            <input type="number" min="1" className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
          </div>
          <div>
            <label className="label">Stock</label>
            <input type="number" min="0" className="input" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
          </div>
          <div>
            <label className="label">Category</label>
            <input className="input" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Cosmetics / Skincare / Fashion / Fragrance" />
          </div>
          <div>
            <label className="label">Brand</label>
            <input className="input" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} placeholder="Chanel" />
          </div>
          <div>
            <label className="label">Origin</label>
            <select className="input" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })}>
              {ORIGINS.map((o) => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Image URL</label>
            <input className="input" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="https://…" />
          </div>
          {msg && (
            <p className={`sm:col-span-2 text-sm font-medium ${msg.ok ? 'text-bangladesh-700' : 'text-red-600'}`}>{msg.text}</p>
          )}
          <div className="sm:col-span-2">
            <button type="submit" disabled={busy} className="btn btn-primary">
              {busy ? 'Adding…' : 'Add product'}
            </button>
          </div>
        </form>
      ) : (
        <div className="card mt-4 overflow-x-auto">
          {!users ? (
            <p className="py-12 text-center text-sm text-stone-400">Loading users…</p>
          ) : (
            <table className="w-full text-left text-sm">
              <thead className="border-b border-stone-200 text-xs uppercase text-stone-400">
                <tr><th className="px-4 py-3">Name</th><th className="px-4 py-3">Email</th><th className="px-4 py-3">Role</th></tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {users.map((u) => (
                  <tr key={u._id}>
                    <td className="px-4 py-3 font-medium">{u.name}</td>
                    <td className="px-4 py-3 text-stone-500">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`badge capitalize ${u.role === 'admin' ? 'bg-gold-100 text-gold-800' : 'bg-stone-100 text-stone-600'}`}>
                        {u.role}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
