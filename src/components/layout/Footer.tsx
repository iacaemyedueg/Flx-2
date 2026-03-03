import React from 'react';
import { Send, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-16">
          {/* Exclusive */}
          <div className="col-span-1 md:col-span-1.5">
            <h3 className="text-2xl font-bold mb-6">Exclusive</h3>
            <h4 className="text-lg font-medium mb-4">Subscribe</h4>
            <p className="text-sm mb-4 opacity-80">Get 10% off your first order</p>
            <div className="relative max-w-[220px]">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-transparent border border-white rounded py-2 pl-3 pr-10 text-sm placeholder:text-gray-500 focus:outline-none"
              />
              <Send className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer" />
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-medium mb-6">Support</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li className="max-w-[180px]">111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-lg font-medium mb-6">Account</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><a href="#" className="hover:underline">My Account</a></li>
              <li><a href="#" className="hover:underline">Login / Register</a></li>
              <li><a href="#" className="hover:underline">Cart</a></li>
              <li><a href="#" className="hover:underline">Wishlist</a></li>
              <li><a href="#" className="hover:underline">Shop</a></li>
            </ul>
          </div>

          {/* Quick Link */}
          <div>
            <h4 className="text-lg font-medium mb-6">Quick Link</h4>
            <ul className="space-y-4 text-sm opacity-80">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h4 className="text-lg font-medium mb-6">Download App</h4>
            <p className="text-xs opacity-70 mb-3">Save $3 with App New User Only</p>
            <div className="flex gap-2 items-center mb-6">
              {/* QR Code Placeholder */}
              <div className="w-20 h-20 bg-white p-1">
                 <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Example" alt="QR" className="w-full h-full" />
              </div>
              <div className="flex flex-col gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className="h-8 object-contain" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className="h-8 object-contain" />
              </div>
            </div>
            <div className="flex gap-6">
              <Facebook className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <Instagram className="w-5 h-5 cursor-pointer hover:text-gray-300" />
              <Linkedin className="w-5 h-5 cursor-pointer hover:text-gray-300" />
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center text-sm opacity-40">
          <p>&copy; Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};
