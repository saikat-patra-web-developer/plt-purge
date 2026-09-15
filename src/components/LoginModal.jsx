import React, { useState } from 'react';
import PurgeLogo from './Logo';

export function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-5 z-[100] animate-[fadeIn_0.2s_ease]" onClick={onClose}>
      <div className="bg-white rounded-xl w-full max-w-[440px] p-8 relative shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute top-4 right-4.5 text-2xl text-slate-400 hover:text-slate-800 leading-none p-1 rounded cursor-pointer transition-colors" 
          onClick={onClose} 
          aria-label="Close modal"
        >
          &times;
        </button>

        <div className="flex justify-center mb-5">
          <PurgeLogo className="h-9 w-auto" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 text-center mb-1.5">Sign in to PLT Generator</h3>
        <p className="text-[13.5px] text-slate-500 text-center mb-6">Access your blinds cutting queue and CAD exports</p>

        {success ? (
          <div className="flex flex-col items-center gap-3 py-6 px-4 text-center text-green-600 text-[14.5px] font-medium">
            <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Welcome back! Redirecting to cutting queue...</p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700" htmlFor="modal-email">Work Email</label>
              <input
                id="modal-email"
                type="email"
                required
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all"
                placeholder="name@purgeblinds.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700" htmlFor="modal-password">Password</label>
              <input
                id="modal-password"
                type="password"
                required
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="bg-[#1967d2] hover:bg-[#1558b8] text-white py-3 rounded-[6px] text-[14.5px] font-semibold transition-all mt-2 cursor-pointer disabled:opacity-60" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In to Account →'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
