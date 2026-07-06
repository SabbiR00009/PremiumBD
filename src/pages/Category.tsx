import React from 'react';
import { useParams } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';

const Category: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  const getCategoryDisplayName = (slug: string) => {
    return slug
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {getCategoryDisplayName(categoryName || '')}
          </h1>
          <p className="text-lg text-gray-600">
            Explore our premium collection of {getCategoryDisplayName(categoryName || '').toLowerCase()} products
          </p>
        </div>
        
        <ProductGrid category={categoryName} />
      </div>
    </div>
  );
};

export default Category;