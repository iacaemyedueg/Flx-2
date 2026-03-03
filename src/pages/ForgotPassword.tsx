import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

export const ForgotPassword = () => {
  const navigate = useNavigate();

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
            className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg"
          >
            Sign in
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="text-black px-6 py-2 rounded-full text-sm font-medium hover:bg-black/5"
          >
            Register
          </button>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center relative px-4 overflow-hidden">
        {/* Left Illustration Placeholder */}
        <div className="hidden xl:block absolute left-10 top-1/2 -translate-y-1/2 w-[400px]">
          <img 
            src="https://picsum.photos/seed/auth4/600/600" 
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
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Forgot password</h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              We'll send you reset instructions.
            </p>
          </div>

          <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); alert('Reset instructions sent!'); navigate('/login'); }}>
            <div className="space-y-2">
              <label className="text-xs font-medium text-gray-700 ml-1">Email</label>
              <input 
                type="email" 
                placeholder="Enter your email"
                className="w-full bg-white border border-gray-200 rounded-xl px-5 py-4 text-sm focus:ring-2 focus:ring-[#1443C3] outline-none transition-all"
                required
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#1443C3] text-white py-4 rounded-xl font-bold shadow-[0_10px_20px_rgba(20,67,195,0.2)] hover:bg-blue-700 transition-all"
            >
              Reset Password
            </button>

            <div className="text-center">
              <Link to="/login" className="text-sm text-gray-500 hover:text-[#1443C3] transition-colors">
                Back to Sign in
              </Link>
            </div>
          </form>
        </motion.div>

        {/* Right Illustration Placeholder */}
        <div className="hidden xl:block absolute right-10 top-1/2 -translate-y-1/2 w-[400px]">
          <img 
            src="https://picsum.photos/seed/auth5/600/600" 
            alt="Illustration" 
            className="w-full h-auto opacity-80 mix-blend-multiply"
            referrerPolicy="no-referrer"
          />
        </div>
      </main>
    </div>
  );
};
