import React, { useEffect, useState, useRef } from 'react';
import { 
  Heart, 
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { api } from '../../services/api';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';

export const Categories = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch more products to enable scrolling
    api.getProducts().then(data => setProducts(data.slice(0, 12)));
  }, []);

  const handleToggleFavorite = (product: Product) => {
    const wasFavorite = isFavorite(product.id);
    toggleFavorite(product);
    if (!wasFavorite) {
      addToast('Added to favorites');
    }
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstItem = container.firstElementChild as HTMLElement;
      if (!firstItem) return;

      const itemWidth = firstItem.offsetWidth + 24; // width + gap (gap-6 = 24px)
      const scrollTo = direction === 'left' 
        ? container.scrollLeft - itemWidth 
        : container.scrollLeft + itemWidth;
      
      container.scrollTo({
        left: scrollTo,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16">
      <div className="max-w-[95%] mx-auto px-12 relative">
        <div className="flex items-center justify-between mb-10 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1a1a1a]">Popular Categories</h2>
          <button 
            onClick={() => navigate('/')}
            className="text-[#38bdf8] text-xl font-medium hover:underline"
          >
            Browse All Product
          </button>
        </div>

        <div className="relative group">
          {/* Navigation Arrows - Positioned outside the cards with a margin */}
          <button 
            onClick={() => scroll('left')}
            className="absolute -left-10 top-[120px] -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-20 border border-gray-100"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="absolute -right-10 top-[120px] -translate-y-1/2 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors z-20 border border-gray-100"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>

          {/* Products Scroll Container - Wrapped in overflow-hidden to hide partial cards */}
          <div className="overflow-hidden px-2">
            <div 
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="flex flex-col min-w-[calc(100%)] sm:min-w-[calc(50%-12px)] lg:min-w-[calc(25%-18px)] snap-start"
                >
                <div 
                  className="relative bg-[#f5f5f5] rounded-sm h-[240px] flex items-center justify-center group/card bg-no-repeat bg-center bg-[length:85%_auto] transition-all duration-300 hover:bg-[length:90%_auto]"
                  style={{ backgroundImage: `url(${product.image})` }}
                >
                  {/* Action Icons */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <button 
                      onClick={() => handleToggleFavorite(product)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current text-red-500 hover:text-white' : 'text-gray-600'}`} />
                    </button>
                    <button 
                      onClick={() => navigate(`/products/${product.id}`)}
                      className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-red-500 hover:text-white transition-all"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Buy Now Button */}
                  <button 
                    onClick={() => navigate('/checkout', { state: { product } })}
                    className="absolute bottom-4 left-4 right-4 bg-black text-white py-2 text-sm font-medium rounded-sm opacity-100 transition-opacity hover:bg-gray-800"
                  >
                    By Now
                  </button>
                </div>

                {/* Product Info */}
                <div className="mt-4 text-center">
                  <h3 className="font-bold text-base text-[#1a1a1a] mb-2 truncate px-2">{product.title}</h3>
                  <p className="text-red-500 font-bold">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};



