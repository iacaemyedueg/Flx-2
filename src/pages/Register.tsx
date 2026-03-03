import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Eye, EyeOff, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    password: '',
    role: 'vendor' as 'vendor' | 'customer'
  });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd call an API here
    login({
      name: formData.name,
      email: formData.emailOrPhone,
      phone: formData.emailOrPhone, // Simplified for demo
      role: formData.role
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F5F2ED] flex flex-col">
      {/* Auth Header */}
      <header className="p-6 flex justify-between items-center">
        <Link to="/">
          <img src="/logo.png" alt="FLX Logo" className="h-10 object-contain" />
        </Link>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/login')}
            className="text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black/5"
          >
            Sign in
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            Register
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center relative px-4 overflow-hidden">
        {/* Left Illustration Placeholder */}
        <div className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 w-[400px]">
          <img 
            src="https://picsum.photos/seed/auth1/600/600" 
            alt="Illustration" 
            className="w-full h-auto opacity-80 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Auth Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white w-full max-w-[480px] rounded-[32px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-10"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Sign up</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Hey, Enter your details to get sign up to<br />your account
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Name"
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <input 
                type="text" 
                placeholder="Enter Email or Phone"
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all"
                required
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
              />
            </div>

            <div className="space-y-2 relative">
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="Password"
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="space-y-2 relative">
              <select 
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all appearance-none cursor-pointer"
                required
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as 'vendor' | 'customer' })}
              >
                <option value="vendor">Vendor</option>
                <option value="customer">Customer</option>
              </select>
              <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            </div>

            <div className="flex justify-end">
              <Link to="/forgot-password" size="sm" className="text-gray-400 text-xs hover:text-[#1443C3] transition-colors">
                Forgot Password ?
              </Link>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#1443C3] text-white py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(20,67,195,0.2)] hover:bg-blue-700 transition-all"
            >
              Sign up
            </button>

            <div className="text-center text-gray-400 text-xs py-1">
              Or Continue wuth
            </div>

            <button 
              type="button"
              className="w-full bg-[#F8FAFF] text-gray-700 py-4 rounded-xl font-medium flex items-center justify-center gap-3 border border-gray-100 hover:bg-gray-50 transition-all"
            >
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
              <span className="text-sm">Sign in with Google</span>
            </button>
          </form>
        </motion.div>

        {/* Right Illustration Placeholder */}
        <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-[400px]">
          <img 
            src="https://picsum.photos/seed/auth3/600/600" 
            alt="Illustration" 
            className="w-full h-auto opacity-80 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>
      </main>
    </div>
  );
};
