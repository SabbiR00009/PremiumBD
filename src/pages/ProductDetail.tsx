import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingBag } from 'lucide-react';
import { api, Product, taka } from '../lib/api';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const cart = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    api<Product>(`/api/products/${id}`)
      .then(setProduct)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 text-center">
        <p className="text-stone-500">{error}</p>
        <Link to="/products" className="btn btn-primary mt-4">Back to products</Link>
      </div>
    );
  }
  if (!product) return <p className="py-16 text-center text-sm text-stone-400">Loading…</p>;

  const out = product.stock <= 0;

  function addToCart() {
    if (!product) return;
    const result = cart.add(product, qty);
    setMsg({ ok: result.ok, text: result.message });
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="card overflow-hidden">
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-gold-600">
            {product.brand} · imported from {product.origin}
          </p>
          <h1 className="mt-1 text-2xl font-bold text-stone-800 md:text-3xl">{product.name}</h1>
          <div className="mt-2 flex items-center gap-2 text-sm text-stone-500">
            <Star size={16} className="fill-gold-400 text-gold-400" />
            {product.rating > 0 ? `${product.rating.toFixed(1)} · ${product.reviews} reviews` : 'No reviews yet'}
            <span className="text-stone-300">|</span>
            <span className="text-stone-400">{product.category}</span>
          </div>
          <p className="mt-4 text-3xl font-extrabold text-bangladesh-900">{taka(product.price)}</p>
          <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-stone-600">{product.description}</p>

          <p className="mt-4">
            {out ? (
              <span className="badge bg-stone-200 text-stone-600">Out of stock</span>
            ) : product.stock < 5 ? (
              <span className="badge bg-gold-100 text-gold-800">Only {product.stock} left</span>
            ) : (
              <span className="badge bg-bangladesh-100 text-bangladesh-800">In stock ({product.stock})</span>
            )}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-stone-300">
              <button onClick={() => setQty((v) => Math.max(1, v - 1))} className="px-3 py-2 text-stone-600 hover:bg-stone-100" aria-label="Decrease">
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{qty}</span>
              <button onClick={() => setQty((v) => Math.min(product.stock || 1, v + 1))} className="px-3 py-2 text-stone-600 hover:bg-stone-100" aria-label="Increase">
                <Plus size={14} />
              </button>
            </div>
            <button onClick={addToCart} disabled={out} className="btn btn-primary px-6">
              <ShoppingBag size={16} /> Add to cart
            </button>
          </div>
          {msg && (
            <p className={`mt-3 text-sm font-medium ${msg.ok ? 'text-bangladesh-700' : 'text-red-600'}`}>
              {msg.ok ? '✓ ' : '✕ '}{msg.text}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
