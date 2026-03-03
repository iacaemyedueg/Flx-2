import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Product } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, CreditCard, Banknote } from 'lucide-react';

export const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as Product;

  const [paymentMethod, setPaymentMethod] = useState<'bank' | 'cash'>('cash');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    city: '',
    phone: '',
    email: '',
    saveInfo: false,
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!product) {
      navigate('/');
    }
    window.scrollTo(0, 0);
  }, [product, navigate]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName) newErrors.firstName = 'Required';
    if (!formData.streetAddress) newErrors.streetAddress = 'Required';
    if (!formData.city) newErrors.city = 'Required';
    if (!formData.phone) newErrors.phone = 'Required';
    if (!formData.email) newErrors.email = 'Required';
    
    if (paymentMethod === 'bank') {
      if (!formData.cardNumber || formData.cardNumber.length < 16) newErrors.cardNumber = 'Invalid card number';
      if (!formData.expiry) newErrors.expiry = 'Required';
      if (!formData.cvv || formData.cvv.length < 3) newErrors.cvv = 'Invalid CVV';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
      }, 1500);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed!</h2>
            <p className="text-gray-600 mb-8">
              Your product has been ordered and will arrive within approximately five days.
            </p>
            <Link 
              to="/" 
              className="inline-block bg-[#1443C3] text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-all"
            >
              Back to Shopping
            </Link>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-12">Billing Details</h1>
          
          <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-16">
            {/* Left Side - Form */}
            <div className="lg:w-1/2 space-y-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">First Name<span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.firstName ? 'ring-1 ring-red-500' : ''}`}
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Company Name</label>
                <input 
                  type="text" 
                  className="w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.companyName}
                  onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Street Address<span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.streetAddress ? 'ring-1 ring-red-500' : ''}`}
                  value={formData.streetAddress}
                  onChange={(e) => setFormData({...formData, streetAddress: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Apartment, floor, etc. (optional)</label>
                <input 
                  type="text" 
                  className="w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500"
                  value={formData.apartment}
                  onChange={(e) => setFormData({...formData, apartment: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Town/City<span className="text-red-500">*</span></label>
                <input 
                  type="text" 
                  className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.city ? 'ring-1 ring-red-500' : ''}`}
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Phone Number<span className="text-red-500">*</span></label>
                <input 
                  type="tel" 
                  className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.phone ? 'ring-1 ring-red-500' : ''}`}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Email Address<span className="text-red-500">*</span></label>
                <input 
                  type="email" 
                  className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.email ? 'ring-1 ring-red-500' : ''}`}
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <input 
                  type="checkbox" 
                  id="saveInfo"
                  className="w-5 h-5 accent-[#1443C3]"
                  checked={formData.saveInfo}
                  onChange={(e) => setFormData({...formData, saveInfo: e.target.checked})}
                />
                <label htmlFor="saveInfo" className="text-sm font-medium">Save this information for faster check-out next time</label>
              </div>
            </div>

            {/* Right Side - Order Summary */}
            <div className="lg:w-1/2">
              <div className="space-y-6 mb-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-md p-2 flex items-center justify-center">
                      <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain mix-blend-multiply" />
                    </div>
                    <span className="font-medium text-gray-900">{product.title}</span>
                  </div>
                  <span className="font-medium">${product.price}</span>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-gray-900">
                    <span>Subtotal:</span>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Shipping:</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                    <span>Total:</span>
                    <span>${product.price}</span>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-6 mb-10">
                <div 
                  className="flex items-center justify-between cursor-pointer group"
                  onClick={() => setPaymentMethod('bank')}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'bank' ? 'border-[#1443C3]' : 'border-gray-300'}`}>
                      {paymentMethod === 'bank' && <div className="w-3 h-3 bg-[#1443C3] rounded-full" />}
                    </div>
                    <span className="font-medium">Bank</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-4 object-contain opacity-70" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 object-contain opacity-70" />
                  </div>
                </div>

                <AnimatePresence>
                  {paymentMethod === 'bank' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden space-y-4 pl-10"
                    >
                      <input 
                        type="text" 
                        placeholder="Card Number (16 digits)" 
                        className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.cardNumber ? 'ring-1 ring-red-500' : ''}`}
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({...formData, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16)})}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input 
                          type="text" 
                          placeholder="MM/YY" 
                          className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.expiry ? 'ring-1 ring-red-500' : ''}`}
                          value={formData.expiry}
                          onChange={(e) => setFormData({...formData, expiry: e.target.value})}
                        />
                        <input 
                          type="text" 
                          placeholder="CVV" 
                          className={`w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 outline-none focus:ring-1 focus:ring-blue-500 ${errors.cvv ? 'ring-1 ring-red-500' : ''}`}
                          value={formData.cvv}
                          onChange={(e) => setFormData({...formData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4)})}
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div 
                  className="flex items-center gap-4 cursor-pointer"
                  onClick={() => setPaymentMethod('cash')}
                >
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${paymentMethod === 'cash' ? 'border-[#1443C3]' : 'border-gray-300'}`}>
                    {paymentMethod === 'cash' && <div className="w-3 h-3 bg-[#1443C3] rounded-full" />}
                  </div>
                  <span className="font-medium">Cash on delivery</span>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-[#1443C3] text-white px-12 py-4 rounded-lg font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-100"
              >
                {isSubmitting ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};
