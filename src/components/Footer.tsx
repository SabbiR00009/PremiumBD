import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Heart, Sparkles } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center">
                <Crown className="w-7 h-7 text-white" />
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                  PremiumBD
                </span>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  <span className="text-xs text-gray-400 font-medium">Luxury Beauty & Fashion</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
              Bangladesh's premier destination for authentic luxury beauty and fashion products. 
              We bring you the finest cosmetics, skincare, and designer fashion directly from 
              USA and Europe's most prestigious brands.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center hover:scale-110 transition-transform duration-300">
                <Twitter className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Beauty Collections
            </h3>
            <ul className="space-y-3">
              <li><Link to="/category/beauty" className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Premium Cosmetics</span>
              </Link></li>
              <li><Link to="/category/skincare" className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-2">
                <Heart className="w-4 h-4" />
                <span>Luxury Skincare</span>
              </Link></li>
              <li><Link to="/category/fragrances" className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-2">
                <Sparkles className="w-4 h-4" />
                <span>Designer Fragrances</span>
              </Link></li>
              <li><Link to="/category/fashion" className="text-gray-300 hover:text-pink-400 transition-colors flex items-center space-x-2">
                <Crown className="w-4 h-4" />
                <span>Designer Fashion</span>
              </Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Customer Care
            </h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-pink-400 transition-colors">About PremiumBD</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-pink-400 transition-colors">Contact Support</Link></li>
              <li><Link to="/shipping" className="text-gray-300 hover:text-pink-400 transition-colors">Shipping & Delivery</Link></li>
              <li><Link to="/returns" className="text-gray-300 hover:text-pink-400 transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/authenticity" className="text-gray-300 hover:text-pink-400 transition-colors">Authenticity Guarantee</Link></li>
            </ul>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Visit Our Store</p>
                <p className="text-gray-300 text-sm">Gulshan, Dhaka, Bangladesh</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Phone className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Call Us</p>
                <p className="text-gray-300 text-sm">+880 1234-567890</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500/20 to-pink-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <p className="font-semibold text-white">Email Support</p>
                <p className="text-gray-300 text-sm">hello@premiumbd.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400 mb-2">
            © 2024 PremiumBD. All rights reserved. 
          </p>
          <p className="text-sm text-gray-500">
            Bringing authentic luxury beauty and fashion to Bangladesh with love 
            <Heart className="w-4 h-4 inline mx-1 text-pink-400" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;