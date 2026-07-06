import React, { useState, useEffect } from 'react';
import { api } from '../lib/api';
import ProductCard from './ProductCard';
import { Loader2 } from 'lucide-react';

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

interface ProductGridProps {
  category?: string;
  limit?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ category, limit }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const data = await api.getProducts();
        let filteredProducts = data;
        
        if (category) {
          filteredProducts = data.filter((product: Product) => 
            product.category.toLowerCase() === category.toLowerCase()
          );
        }
        
        if (limit) {
          filteredProducts = filteredProducts.slice(0, limit);
        }
        
        setProducts(filteredProducts);
      } catch (err) {
        setError('Failed to fetch products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [category, limit]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-bangladesh-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;