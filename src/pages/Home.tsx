import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api, Product } from '../lib/api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api<Product[]>('/api/products')
      .then(setProducts)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4">
      <section className="mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-bangladesh-900 via-bangladesh-700 to-bangladesh-500 px-6 py-14 text-center text-white md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-300">
          Imported · Authentic · Premium
        </p>
        <h1 className="mx-auto mt-3 max-w-2xl text-3xl font-extrabold md:text-5xl">
          Luxury beauty &amp; fashion, direct from the USA &amp; Europe
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-bangladesh-100 md:text-base">
          100% genuine cosmetics, skincare and designer fashion — delivered anywhere in Bangladesh.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to="/products" className="btn btn-gold px-6">Shop now</Link>
          <Link to="/products?origin=USA" className="btn border border-white/40 text-white hover:bg-white/10 px-6">
            USA imports
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between">
          <h2 className="text-xl font-bold text-stone-800 md:text-2xl">Latest arrivals</h2>
          <Link to="/products" className="text-sm font-medium text-bangladesh-700 hover:underline">
            View all →
          </Link>
        </div>
        {error ? (
          <p className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            Could not load products: {error}. Is the API server running? (npm run dev:server)
          </p>
        ) : !products ? (
          <p className="mt-6 py-12 text-center text-sm text-stone-400">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="mt-6 py-12 text-center text-sm text-stone-400">
            No products yet — run <code>npm run seed</code> to load the demo catalog.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
