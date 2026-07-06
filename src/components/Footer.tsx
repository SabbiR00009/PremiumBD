import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-stone-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-3">
        <div>
          <p className="text-lg font-extrabold">
            <span className="text-bangladesh-900">Premium</span>
            <span className="text-gold-500">BD</span>
          </p>
          <p className="mt-2 text-sm text-stone-500">
            Authentic premium cosmetics, skincare and fashion — imported directly from the USA
            and Europe, delivered across Bangladesh.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Shop</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            <li><Link to="/products?category=Cosmetics" className="hover:text-bangladesh-700">Cosmetics</Link></li>
            <li><Link to="/products?category=Skincare" className="hover:text-bangladesh-700">Skincare</Link></li>
            <li><Link to="/products?category=Fashion" className="hover:text-bangladesh-700">Fashion</Link></li>
            <li><Link to="/products?category=Fragrance" className="hover:text-bangladesh-700">Fragrance</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-stone-700">Support</p>
          <ul className="mt-3 space-y-2 text-sm text-stone-500">
            <li>Helpline: <a href="tel:+8801700000000" className="font-medium text-bangladesh-700 hover:underline">+880 1700-000000</a></li>
            <li>Sat–Thu, 10am–8pm</li>
            <li className="text-xs text-stone-400">Demo project — no real payments.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-100 py-4 text-center text-xs text-stone-400">
        © {new Date().getFullYear()} PremiumBD · Luxury Beauty &amp; Fashion
      </div>
    </footer>
  );
}
