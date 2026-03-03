import React, { useState, useEffect, useRef } from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, Shield, LogOut, Save, Camera, Upload, X } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Profile = () => {
  const { user, updateUser, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'customer' as 'vendor' | 'customer',
    avatar: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showChangeAccountModal, setShowChangeAccountModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        avatar: user.avatar || ''
      });
    }
  }, [user, isAuthenticated, navigate]);

  const handleUpdateClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to make changes?')) {
      setShowConfirmModal(true);
    }
  };

  const confirmUpdate = () => {
    updateUser(formData);
    setIsEditing(false);
    setShowConfirmModal(false);
    addToast('Profile updated successfully');
  };

  const handleChangeAccount = () => {
    setShowChangeAccountModal(false);
    addToast('Successfully changed the account');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    addToast('Logged out successfully');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, avatar: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-12">
            <Link to="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <span className="text-black font-medium">My Profile</span>
          </nav>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
                  <div className="relative group">
                    <div className="w-32 h-32 bg-[#7DA2F3] rounded-full flex items-center justify-center text-white text-4xl font-bold overflow-hidden border-4 border-white shadow-md">
                      {formData.avatar ? (
                        <img src={formData.avatar} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0)
                      )}
                    </div>
                    {isEditing && (
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-0 right-0 bg-[#1443C3] text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all border-2 border-white"
                        title="Upload Picture"
                      >
                        <Camera className="w-5 h-5" />
                      </button>
                    )}
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>

                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 mb-1 justify-center md:justify-start">
                      <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
                      {isEditing && (
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="text-[#1443C3] hover:text-blue-700 transition-colors"
                          title="Upload Picture"
                        >
                          <Upload className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-500 capitalize">{user.role} Account</p>
                  </div>

                  <div className="md:ml-auto flex flex-wrap gap-4 justify-center md:justify-start">
                    <button 
                      onClick={() => setIsEditing(!isEditing)}
                      className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                        isEditing 
                          ? 'bg-gray-100 text-gray-600 hover:bg-gray-200' 
                          : 'bg-[#1443C3] text-white hover:bg-blue-700'
                      }`}
                    >
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                    <button 
                      onClick={() => setShowChangeAccountModal(true)}
                      className="px-6 py-2 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all"
                    >
                      Change Account
                    </button>
                    <button 
                      onClick={handleLogout}
                      className="px-6 py-2 rounded-full text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-all flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>

                <form onSubmit={handleUpdateClick} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      disabled={!isEditing}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all disabled:opacity-60"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      disabled={!isEditing}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all disabled:opacity-60"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      disabled={!isEditing}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all disabled:opacity-60"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      Account Role
                    </label>
                    <select 
                      disabled={!isEditing}
                      className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all disabled:opacity-60 appearance-none"
                      value={formData.role}
                      onChange={(e) => setFormData({...formData, role: e.target.value as 'vendor' | 'customer'})}
                    >
                      <option value="vendor">Vendor</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>

                  {isEditing && (
                    <div className="md:col-span-2 flex justify-end pt-4">
                      <button 
                        type="submit"
                        className="bg-[#1443C3] text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all flex items-center gap-2 shadow-lg shadow-blue-100"
                      >
                        <Save className="w-5 h-5" />
                        Save Changes
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Confirmation Modal */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowConfirmModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-[#1443C3] rounded-full flex items-center justify-center mx-auto mb-6">
                <Save className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Confirm Changes</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to save these changes to your profile?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  No
                </button>
                <button 
                  onClick={confirmUpdate}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-[#1443C3] hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  OK
                </button>
              </div>
              <button 
                onClick={() => setShowConfirmModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Change Account Modal */}
      <AnimatePresence>
        {showChangeAccountModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setShowChangeAccountModal(false)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl relative z-10 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 text-[#1443C3] rounded-full flex items-center justify-center mx-auto mb-6">
                <User className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Change Account</h3>
              <p className="text-gray-500 mb-8">Are you sure you want to change the account?</p>
              <div className="flex gap-3">
                <button 
                  onClick={() => setShowChangeAccountModal(false)}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 transition-all"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleChangeAccount}
                  className="flex-1 px-6 py-3 rounded-xl font-bold text-white bg-[#1443C3] hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  OK
                </button>
              </div>
              <button 
                onClick={() => setShowChangeAccountModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};
