import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Sparkles } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  origin: string;
  rating?: number;
  reviews?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      _id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
  };

  const getCategoryGradient = (category: string) => {
    switch (category.toLowerCase()) {
      case 'beauty':
      case 'cosmetics':
        return 'from-pink-500 to-rose-500';
      case 'fashion':
        return 'from-purple-500 to-pink-500';
      case 'skincare':
        return 'from-emerald-500 to-teal-500';
      case 'fragrances':
        return 'from-violet-500 to-purple-500';
      default:
        return 'from-rose-500 to-pink-500';
    }
  };

  return (
    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
      <Link to={`/product/${product._id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Origin badge */}
          <div className={`absolute top-4 left-4 bg-gradient-to-r ${getCategoryGradient(product.category)} text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1`}>
            <Sparkles className="w-3 h-3" />
            <span>{product.origin}</span>
          </div>
          
          {/* Wishlist button */}
          <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 group/heart">
            <Heart className="w-4 h-4 text-gray-600 group-hover/heart:text-rose-500 transition-colors" />
          </button>
        </div>
      </Link>
      
      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-500 mb-2">{product.brand}</p>
            <h3 className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-pink-600 group-hover:bg-clip-text transition-all duration-300">
              {product.name}
            </h3>
          </div>
        </Link>
        
        <div className="flex items-center mb-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < (product.rating || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500 ml-2">({product.reviews || 0})</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
              ৳{product.price.toLocaleString()}
            </span>
            <span className="text-xs text-gray-500">Free shipping</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white p-3 rounded-2xl transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl group/cart"
          >
            <ShoppingCart className="w-5 h-5 group-hover/cart:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;