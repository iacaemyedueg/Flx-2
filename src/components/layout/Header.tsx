import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faSearch, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import { useFavorites } from '../../context/FavoritesContext';
import { useAuth } from '../../context/AuthContext';

export const Header = () => {
  const { favorites } = useFavorites();
  const { user, isAuthenticated } = useAuth();
  
  const firstName = user?.name.split(' ')[0];

  return (
    <div className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between text-black">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="/logo.png" alt="FLX Logo" className="h-12 object-contain" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-base font-medium hover:text-red-600 transition-colors">
            Home
          </Link>
          <Link to="/contact" className="text-base font-medium hover:text-red-600 transition-colors">
            Contact
          </Link>
          <Link to="/about" className="text-base font-medium hover:text-red-600 transition-colors">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center bg-gray-100 rounded-lg px-3 py-1.5 border border-transparent focus-within:bg-gray-200 transition-all">
            <input 
              type="text" 
              placeholder="What are you looking for?" 
              className="bg-transparent border-none outline-none text-sm placeholder:text-gray-500 w-48 text-black"
            />
            <FontAwesomeIcon icon={faSearch} className="text-gray-500 text-sm ml-2" />
          </div>

          <Link to="/favorites" className="hover:text-gray-200 transition-colors relative">
            <FontAwesomeIcon icon={faHeart} className="text-xl" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favorites.length}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <Link to="/profile" className="flex items-center gap-2 hover:text-gray-200 transition-colors">
              <span className="text-sm font-medium">{firstName}</span>
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          ) : (
            <Link to="/register" className="text-sm font-medium hover:underline underline-offset-4 decoration-2">
              Register
            </Link>
          )}
          
          {/* Mobile Menu Button */}
          <button className="md:hidden hover:text-gray-200 transition-colors">
            <FontAwesomeIcon icon={faBars} className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};
