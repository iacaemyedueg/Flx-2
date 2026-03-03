import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { Button } from '../common/Button';
import { Star, Heart, Eye } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

export const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    api.getProducts().then(setProducts);
  }, []);

  const handleToggleFavorite = (product: Product) => {
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(product);
    if (!wasFavorite) {
      addToast('Added to favorites');
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
            <p className="text-gray-600">Our best-selling items this week</p>
          </div>
          <Button variant="outline">View All</Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="relative aspect-square p-6 bg-white flex items-center justify-center group">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <button 
                    onClick={() => handleToggleFavorite(product)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                      isFavorite(product.id) 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white text-black hover:bg-red-500 hover:text-white'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                  </button>
                  <button 
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-red-500 hover:text-white transition-all shadow-sm"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <div className="bg-white px-2 py-1 rounded-full text-xs font-bold shadow-sm">
                    New
                  </div>
                </div>
              </div>
              
              <div className="p-4 flex-1 flex flex-col">
                <div className="text-xs text-gray-500 uppercase font-semibold mb-1">{product.category}</div>
                <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 flex-1" title={product.title}>
                  {product.title}
                </h3>
                
                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-2">({product.rating.count})</span>
                </div>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                  <Button 
                    size="sm"
                    onClick={() => navigate('/checkout', { state: { product } })}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
