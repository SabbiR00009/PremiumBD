import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api, Product, ORIGINS } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState<Product[] | null>(null);
  const [q, setQ] = useState(params.get('q') || '');

  const category = params.get('category') || '';
  const origin = params.get('origin') || '';

  useEffect(() => {
    api<Product[]>('/api/products').then(setProducts).catch(() => setProducts([]));
  }, []);

  const categories = useMemo(
    () => Array.from(new Set((products || []).map((p) => p.category))).sort(),
    [products]
  );

  const filtered = useMemo(() => {
    if (!products) return null;
    return products.filter((p) => {
      if (category && p.category !== category) return false;
      if (origin && p.origin !== origin) return false;
      if (q) {
        const t = q.toLowerCase();
        if (!`${p.name} ${p.brand} ${p.description}`.toLowerCase().includes(t)) return false;
      }
      return true;
    });
  }, [products, category, origin, q]);

  function setFilter(key: string, value: string) {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-bold text-stone-800">
        {category || 'All products'}
        {filtered && <span className="ml-2 text-sm font-normal text-stone-400">{filtered.length} items</span>}
      </h1>

      <div className="card mt-4 flex flex-wrap items-center gap-3 p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search name or brand…"
          className="input max-w-xs"
        />
        <select value={category} onChange={(e) => setFilter('category', e.target.value)} className="input w-auto">
          <option value="">All categories</option>
          {categories.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={origin} onChange={(e) => setFilter('origin', e.target.value)} className="input w-auto">
          <option value="">All origins</option>
          {ORIGINS.map((o) => <option key={o}>{o}</option>)}
        </select>
        {(category || origin || q) && (
          <button
            onClick={() => { setQ(''); setParams(new URLSearchParams()); }}
            className="text-sm font-medium text-bangladesh-700 hover:underline"
          >
            Clear ✕
          </button>
        )}
      </div>

      {!filtered ? (
        <p className="py-16 text-center text-sm text-stone-400">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="py-16 text-center text-sm text-stone-400">No products match your filters.</p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}
