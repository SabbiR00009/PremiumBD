import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingBag, Menu, X, User as UserIcon, LogOut, Package, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const cart = useCart();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  function handleLogout() {
    logout();
    setProfileOpen(false);
    navigate('/');
  }

  const links = (
    <>
      <Link to="/products" onClick={() => setOpen(false)} className="text-sm text-stone-600 hover:text-bangladesh-700">
        All products
      </Link>
      <Link to="/products?category=Cosmetics" onClick={() => setOpen(false)} className="text-sm text-stone-600 hover:text-bangladesh-700">
        Cosmetics
      </Link>
      <Link to="/products?category=Skincare" onClick={() => setOpen(false)} className="text-sm text-stone-600 hover:text-bangladesh-700">
        Skincare
      </Link>
      <Link to="/products?category=Fashion" onClick={() => setOpen(false)} className="text-sm text-stone-600 hover:text-bangladesh-700">
        Fashion
      </Link>
    </>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
        <button className="rounded-lg p-2 hover:bg-stone-100 lg:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <Link to="/" className="flex items-baseline gap-1">
          <span className="text-xl font-extrabold text-bangladesh-900">Premium</span>
          <span className="text-xl font-extrabold text-gold-500">BD</span>
        </Link>

        <nav className="ml-6 hidden items-center gap-5 lg:flex">{links}</nav>

        <div className="ml-auto flex items-center gap-1">
          <Link to="/cart" className="relative rounded-lg p-2 text-stone-600 hover:bg-stone-100" aria-label="Cart">
            <ShoppingBag size={20} />
            {cart.count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-bangladesh-900 px-1 text-[11px] font-semibold text-white">
                {cart.count}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-2 rounded-lg p-1.5 hover:bg-stone-100"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-bangladesh-100 text-sm font-bold text-bangladesh-800">
                  {user.name[0]?.toUpperCase()}
                </span>
                <span className="hidden text-sm font-medium md:block">{user.name.split(' ')[0]}</span>
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-xl border border-stone-200 bg-white py-1 shadow-lg">
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                        <Shield size={15} /> Admin panel
                      </Link>
                    )}
                    <Link to="/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-4 py-2 text-sm text-stone-700 hover:bg-stone-50">
                      <Package size={15} /> My orders
                    </Link>
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-stone-50">
                      <LogOut size={15} /> Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              <UserIcon size={16} /> Sign in
            </Link>
          )}
        </div>
      </div>

      {open && (
        <div className="flex flex-col gap-3 border-t border-stone-200 bg-white px-4 py-3 lg:hidden">{links}</div>
      )}
    </header>
  );
}
