import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Heart, Eye } from 'lucide-react';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { Product } from '../../types';
import { useNavigate } from 'react-router-dom';

interface CategoriesProps {
  title?: string;
  variant?: 'default' | 'browse';
}

export const Categories = ({ title = "Popular Categories", variant = 'default' }: CategoriesProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();
  const navigate = useNavigate();

  const defaultProducts = [
    {
      id: 1,
      title: "HAVIT HV-G92 Gamepad",
      price: 120,
      image: "https://m.media-amazon.com/images/I/61s7s+eR+JL._AC_SX679_.jpg",
    },
    {
      id: 2,
      title: "AK-900 Wired Keyboard",
      price: 960,
      image: "https://m.media-amazon.com/images/I/7189iXimfWL._AC_SX679_.jpg",
    },
    {
      id: 3,
      title: "IPS LCD Gaming Monitor",
      price: 370,
      image: "https://m.media-amazon.com/images/I/71sxlhYhKWL._AC_SX679_.jpg",
    },
    {
      id: 4,
      title: "S-Series Comfort Chair",
      price: 375,
      image: "https://m.media-amazon.com/images/I/61t4C3t0hLL._AC_SX679_.jpg",
    },
    {
      id: 5,
      title: "Gaming Mouse",
      price: 80,
      image: "https://m.media-amazon.com/images/I/61lCLrCqI-L._AC_SX679_.jpg",
    },
    {
      id: 6,
      title: "Gaming Headset",
      price: 150,
      image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SX679_.jpg",
    }
  ];

  const browseProducts = [
    {
      id: 1,
      title: "Gaming Accessories",
      image: "https://m.media-amazon.com/images/I/61s7s+eR+JL._AC_SX679_.jpg",
    },
    {
      id: 2,
      title: "Keyboards",
      image: "https://m.media-amazon.com/images/I/7189iXimfWL._AC_SX679_.jpg",
    },
    {
      id: 3,
      title: "Monitors",
      image: "https://m.media-amazon.com/images/I/71sxlhYhKWL._AC_SX679_.jpg",
    },
    {
      id: 4,
      title: "Chairs",
      image: "https://m.media-amazon.com/images/I/61t4C3t0hLL._AC_SX679_.jpg",
    },
    {
      id: 5,
      title: "Mice",
      image: "https://m.media-amazon.com/images/I/61lCLrCqI-L._AC_SX679_.jpg",
    },
    {
      id: 6,
      title: "Headsets",
      image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._AC_SX679_.jpg",
    }
  ];

  const products = variant === 'browse' ? browseProducts : defaultProducts;

  const handleToggleFavorite = (product: any) => {
    const wasFavorite = isFavorite(product.id);
    // Categories products are slightly different from API products, but we'll cast them for the favorites context
    toggleFavorite(product as Product);
    if (!wasFavorite) {
      addToast('Added to favorites');
    }
  };

  const itemsPerPage = 4;

  const nextSlide = () => {
    setStartIndex((prev) => 
      prev + 1 > products.length - itemsPerPage ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setStartIndex((prev) => 
      prev - 1 < 0 ? products.length - itemsPerPage : prev - 1
    );
  };

  return (
    <section className={`py-16 ${variant === 'browse' ? 'border-b border-gray-100' : ''}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-black">{title}</h2>
          <a href="#" className="text-blue-500 font-medium text-lg hover:underline">Browse All Product</a>
        </div>

        {/* Carousel Container */}
        <div className="relative px-12"> {/* Added padding for arrows */}
          {/* Product Grid Window */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${startIndex * (100 / itemsPerPage)}%)` }}
            >
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className="w-1/4 flex-shrink-0 px-3 group flex flex-col items-center"
                >
                  {/* Card Image Container */}
                  <div 
                    onClick={() => variant === 'default' && handleToggleFavorite(product)}
                    className="relative bg-gray-50 w-[90%] h-[200px] flex flex-col items-center justify-center rounded-md mb-4 group-hover:shadow-lg transition-shadow overflow-hidden cursor-pointer"
                  >
                    {/* Icons */}
                    {variant === 'default' && (
                      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleFavorite(product);
                          }}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                            isFavorite(product.id) 
                              ? 'bg-red-500 text-white' 
                              : 'bg-white text-black hover:bg-red-500 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/products/${product.id}`);
                          }}
                          className="w-8 h-8 rounded-full bg-white flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Image */}
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className={`w-3/4 h-[120px] object-contain mix-blend-multiply ${variant === 'default' ? 'mb-8' : ''}`}
                    />

                    {/* Buy Now Button */}
                    {variant === 'default' && (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate('/checkout', { state: { product } });
                        }}
                        className="absolute bottom-0 left-0 w-full bg-black text-white py-2 text-sm font-medium opacity-100 transition-opacity hover:bg-gray-800"
                      >
                        Buy Now
                      </button>
                    )}
                  </div>

                  {/* Info */}
                  <div className="text-center min-h-[4rem] flex flex-col items-center justify-start pt-2 w-full">
                    <h3 className="font-bold text-base mb-1 text-gray-800 line-clamp-1">{product.title}</h3>
                    {variant === 'default' ? (
                      <span className="text-red-500 font-medium">${(product as any).price}</span>
                    ) : (
                      <button className="bg-black text-white px-4 py-2 text-sm font-medium rounded-sm hover:bg-gray-800 transition-colors mt-1 w-full max-w-[180px]">
                        Show Classification
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-20 shadow-md"
          >
            <ArrowLeft className="w-5 h-5 text-black" />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 top-[40%] -translate-y-1/2 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors z-20 shadow-md"
          >
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
};
