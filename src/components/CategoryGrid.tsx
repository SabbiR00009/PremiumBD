import React from 'react';
import { Link } from 'react-router-dom';
import { Palette, Shirt, Sparkles, Crown, Heart, Star } from 'lucide-react';

const CategoryGrid: React.FC = () => {
  const categories = [
    {
      name: 'Beauty & Cosmetics',
      slug: 'beauty',
      icon: Palette,
      image: 'https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Premium makeup, skincare & fragrances',
      gradient: 'from-pink-500 to-rose-500',
      bgGradient: 'from-pink-50 to-rose-50',
    },
    {
      name: 'Luxury Fashion',
      slug: 'fashion',
      icon: Crown,
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Designer clothing & accessories',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      name: 'Skincare Essentials',
      slug: 'skincare',
      icon: Sparkles,
      image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Anti-aging & premium skincare',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
    },
    {
      name: 'Designer Bags',
      slug: 'bags',
      icon: Heart,
      image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Luxury handbags & accessories',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
    },
    {
      name: 'Premium Fragrances',
      slug: 'fragrances',
      icon: Star,
      image: 'https://images.pexels.com/photos/1961795/pexels-photo-1961795.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Exclusive perfumes & colognes',
      gradient: 'from-violet-500 to-purple-500',
      bgGradient: 'from-violet-50 to-purple-50',
    },
    {
      name: 'Jewelry & Watches',
      slug: 'jewelry',
      icon: Sparkles,
      image: 'https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Fine jewelry & luxury timepieces',
      gradient: 'from-rose-500 to-pink-500',
      bgGradient: 'from-rose-50 to-pink-50',
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full text-sm font-medium text-rose-700 border border-rose-200 mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            Curated Collections
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Shop by <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Category</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our carefully curated collections of premium beauty and fashion products 
            from the world's most prestigious brands
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${category.bgGradient} p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                index === 0 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <div className="relative z-10">
                <div className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-6">{category.description}</p>
                
                <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-rose-600 transition-colors">
                  <span>Explore Collection</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              
              <div className="absolute top-4 right-4 w-32 h-32 rounded-2xl overflow-hidden opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-white/20 to-white/10 rounded-full"></div>
              <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-white/30 to-white/20 rounded-full"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;