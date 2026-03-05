import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { Heart, Eye } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const BEST_SELLING_PRODUCTS = [
  {
    id: 5,
    title: "The North Coat",
    price: 260,
    image: "https://storage.googleapis.com/birdview-sandbox-v2-221511-europe-west2-a/67c7d678680650002c9a9244/67c7d9f7680650002c9a9284/input_file_3.png"
  },
  {
    id: 6,
    title: "Gucci Duffle Bag",
    price: 960,
    image: "https://storage.googleapis.com/birdview-sandbox-v2-221511-europe-west2-a/67c7d678680650002c9a9244/67c7d9f7680650002c9a9284/input_file_2.png"
  },
  {
    id: 7,
    title: "RGB Liquid CPU Cooler",
    price: 160,
    image: "https://storage.googleapis.com/birdview-sandbox-v2-221511-europe-west2-a/67c7d678680650002c9a9244/67c7d9f7680650002c9a9284/input_file_1.png"
  },
  {
    id: 8,
    title: "Small Bookshelf",
    price: 360,
    image: "https://storage.googleapis.com/birdview-sandbox-v2-221511-europe-west2-a/67c7d678680650002c9a9244/67c7d9f7680650002c9a9284/input_file_0.png"
  }
];

export const BestSelling = () => {
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleToggleFavorite = (product: any) => {
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(product);
    if (!wasFavorite) {
      addToast('Added to favorites');
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-[95%] mx-auto px-4">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-5 h-10 bg-red-600 rounded-sm"></div>
            <span className="text-red-600 font-bold">This Month</span>
          </div>
          
          <div className="flex items-center justify-between">
            <h2 className="text-3xl md:text-4xl font-bold text-black">Best Selling Products</h2>
            <button className="bg-red-600 text-white px-8 py-3 rounded-sm font-medium hover:bg-red-500 transition-colors">
              View All
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {BEST_SELLING_PRODUCTS.map((product) => (
            <div key={product.id} className="group w-[95%] mx-auto flex flex-col">
              <div 
                className="relative bg-gray-100 rounded-md mb-4 h-[240px] flex items-center justify-center overflow-hidden bg-no-repeat bg-center bg-[length:85%_auto] transition-all duration-300"
                style={{ backgroundImage: `url(${product.image})` }}
              >
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
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
                
                <button 
                  onClick={() => navigate('/checkout', { state: { product } })}
                  className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity hover:bg-gray-800"
                >
                  Buy Now
                </button>
              </div>

              <div className="text-center">
                <h3 className="font-bold text-base mb-1 truncate text-[#1a1a1a]">{product.title}</h3>
                <div className="flex items-center justify-center gap-3 mb-1">
                  <span className="text-red-500 font-bold">${product.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
