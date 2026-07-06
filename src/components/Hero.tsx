import React from 'react';
import { ArrowRight, Star, Sparkles, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-rose-200 to-pink-200 rounded-full opacity-15 blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full text-sm font-medium text-rose-700 border border-rose-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Premium Beauty & Fashion Collection
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                Luxury
              </span>
              <br />
              <span className="text-gray-900">Beauty &</span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Fashion
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Discover authentic premium cosmetics and fashion brands imported directly from 
              USA and Europe. Experience luxury that defines elegance in Bangladesh.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-rose-400 border-2 border-white flex items-center justify-center">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <div className="ml-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">Loved by 10,000+ customers</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                to="/category/beauty"
                className="group bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-8 py-4 rounded-2xl font-semibold flex items-center justify-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span>Shop Beauty</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/category/fashion"
                className="group border-2 border-gray-300 hover:border-rose-300 text-gray-700 hover:text-rose-600 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:bg-rose-50"
              >
                Explore Fashion
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative z-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 to-rose-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <img 
                      src="https://images.pexels.com/photos/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Premium Cosmetics" 
                      className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">Premium Cosmetics</p>
                      <p className="text-sm opacity-90">From Europe</p>
                    </div>
                  </div>
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-100 to-pink-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <img 
                      src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Luxury Skincare" 
                      className="w-full h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold text-sm">Luxury Skincare</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6 pt-12">
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-rose-100 to-pink-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <img 
                      src="https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Designer Fashion" 
                      className="w-full h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold text-sm">Designer Fashion</p>
                    </div>
                  </div>
                  <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-pink-100 to-purple-100 p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                    <img 
                      src="https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg?auto=compress&cs=tinysrgb&w=400" 
                      alt="Premium Accessories" 
                      className="w-full h-48 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <p className="font-semibold">Premium Accessories</p>
                      <p className="text-sm opacity-90">From USA</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-300 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="relative bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-10 h-10 text-rose-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">100% Authentic</h3>
              <p className="text-gray-600">Genuine products directly imported from authorized distributors in USA and Europe</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Premium Quality</h3>
              <p className="text-gray-600">Carefully curated selection of the finest luxury beauty and fashion brands</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-10 h-10 text-pink-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Curation</h3>
              <p className="text-gray-600">Hand-picked by beauty and fashion experts for the discerning Bangladesh market</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;