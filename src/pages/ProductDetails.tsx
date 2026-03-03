import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Product } from '../types';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Star, Heart, ShoppingCart, ArrowLeft, Eye } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'motion/react';

export const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addToast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      setLoading(true);
      const data = await api.getProductById(parseInt(id));
      if (data) {
        setProduct(data);
        const allProducts = await api.getProducts();
        const related = allProducts
          .filter(p => p.category === data.category && p.id !== data.id)
          .slice(0, 8);
        setRelatedProducts(related);
      }
      setLoading(false);
    };
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const handleToggleFavorite = (p: Product) => {
    const wasFavorite = isFavorite(p.id);
    toggleFavorite(p);
    if (!wasFavorite) {
      addToast('Added to favorites');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1443C3]"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl font-bold">Product not found</h2>
          <Link to="/" className="text-[#1443C3] hover:underline">Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="text-black font-medium truncate max-w-[200px]">{product.title}</span>
          </nav>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            {/* Image Gallery */}
            <div className="bg-gray-50 rounded-2xl p-8 flex items-center justify-center h-[500px]">
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={product.image} 
                alt={product.title}
                className="max-h-full max-w-full object-contain mix-blend-multiply"
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-gray-500 text-sm">({product.rating.count} Reviews)</span>
                <span className="text-gray-300">|</span>
                <span className="text-green-500 text-sm font-medium">In Stock</span>
              </div>

              <div className="text-3xl font-bold text-[#1443C3] mb-6">${product.price.toFixed(2)}</div>
              
              <p className="text-gray-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="h-[1px] bg-gray-100 mb-8"></div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
                <button 
                  onClick={() => navigate('/checkout', { state: { product } })}
                  className="flex-grow w-full sm:w-auto bg-[#1443C3] text-white h-12 rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
                <button className="flex-grow w-full sm:w-auto bg-black text-white h-12 rounded-lg font-bold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button 
                  onClick={() => handleToggleFavorite(product)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all shrink-0 ${
                    isFavorite(product.id) 
                      ? 'bg-red-500 border-red-500 text-white' 
                      : 'border-gray-200 text-black hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isFavorite(product.id) ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Features */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="p-4 flex items-center gap-4 border-b border-gray-200">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5 rotate-90" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Free Delivery</div>
                    <div className="text-xs text-gray-500 underline">Enter your postal code for Delivery Availability</div>
                  </div>
                </div>
                <div className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center">
                    <ArrowLeft className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-sm">Return Delivery</div>
                    <div className="text-xs text-gray-500">Free 30 Days Delivery Returns. <span className="underline">Details</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-5 h-10 bg-[#1443C3] rounded-sm"></div>
              <span className="text-[#1443C3] font-bold">Related Item</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <motion.div 
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-xl transition-all duration-300 relative cursor-pointer"
                  onClick={() => navigate(`/products/${p.id}`)}
                >
                  <div className="relative bg-gray-50 rounded-xl p-6 mb-4 h-[240px] flex items-center justify-center overflow-hidden">
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFavorite(p);
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-sm ${
                          isFavorite(p.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-black hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(p.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/products/${p.id}`);
                        }}
                        className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-black hover:bg-red-500 hover:text-white transition-all shadow-sm"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs text-gray-500 uppercase font-bold">{p.category}</div>
                    <h3 className="font-bold text-gray-900 line-clamp-2 h-12 leading-tight group-hover:text-[#1443C3] transition-colors">
                      {p.title}
                    </h3>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xl font-bold text-[#1443C3]">${p.price.toFixed(2)}</span>
                      <div className="flex text-yellow-400 scale-75 origin-right">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.round(p.rating.rate) ? 'fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
