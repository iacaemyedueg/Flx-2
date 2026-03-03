import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Phone, Mail } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-20">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black font-medium">Contact</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Contact Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/3 bg-white p-8 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-50"
            >
              {/* Call To Us */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#DB4444] rounded-full flex items-center justify-center text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Call To Us</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-800">
                  <p>We are available 24/7, 7 days a week.</p>
                  <p>Phone: +8801611112222</p>
                </div>
              </div>

              <div className="h-[1px] bg-gray-200 mb-8"></div>

              {/* Write To Us */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-[#DB4444] rounded-full flex items-center justify-center text-white">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg">Write To Us</h3>
                </div>
                <div className="space-y-3 text-sm text-gray-800">
                  <p>Fill out our form and we will contact you within 24 hours.</p>
                  <p>Emails: customer@exclusive.com</p>
                  <p>Emails: support@exclusive.com</p>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Contact Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-2/3 bg-white p-8 rounded-md shadow-[0_0_15px_rgba(0,0,0,0.05)] border border-gray-50"
            >
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input 
                    type="text" 
                    placeholder="Your Name *" 
                    required
                    className="bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#DB4444] outline-none"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email *" 
                    required
                    className="bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#DB4444] outline-none"
                  />
                  <input 
                    type="tel" 
                    placeholder="Your Phone *" 
                    required
                    className="bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#DB4444] outline-none"
                  />
                </div>
                
                <textarea 
                  placeholder="Your Message" 
                  rows={8}
                  className="w-full bg-[#F5F5F5] border-none rounded-md px-4 py-3 text-sm focus:ring-1 focus:ring-[#DB4444] outline-none resize-none"
                ></textarea>

                <div className="flex justify-end">
                  <button 
                    type="submit"
                    className="bg-[#DB4444] text-white px-10 py-4 rounded-md font-medium hover:bg-[#c33d3d] transition-colors"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
