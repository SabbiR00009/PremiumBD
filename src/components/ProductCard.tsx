import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import { Product, taka } from '../lib/api';

export default function ProductCard({ product }: { product: Product }) {
  const out = product.stock <= 0;
  return (
    <Link to={`/products/${product._id}`} className="card group block overflow-hidden transition hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-bangladesh-800">
          {product.origin}
        </span>
        {out && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70">
            <span className="rounded-full bg-stone-800 px-3 py-1 text-xs font-semibold text-white">Out of stock</span>
          </div>
        )}
      </div>
      <div className="p-3">
        <p className="text-xs uppercase tracking-wide text-stone-400">{product.brand} · {product.category}</p>
        <h3 className="mt-0.5 truncate text-sm font-medium text-stone-800 group-hover:text-bangladesh-700">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-1 text-xs text-stone-400">
          <Star size={13} className="fill-gold-400 text-gold-400" />
          {product.rating > 0 ? product.rating.toFixed(1) : 'New'}
          {product.reviews > 0 && <span>({product.reviews})</span>}
        </div>
        <p className="mt-1.5 text-base font-bold text-bangladesh-900">{taka(product.price)}</p>
      </div>
    </Link>
  );
}
