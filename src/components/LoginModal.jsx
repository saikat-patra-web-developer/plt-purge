import React, { useState } from 'react';
import PurgeLogo from './Logo';

export function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Static authentication check for user ID: "purge", password: "pltpurge"
    if (userId.trim().toLowerCase() === 'purge' && password === 'pltpurge') {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          onLoginSuccess();
          onClose();
        }, 600);
      }, 500);
    } else {
      setError('Invalid credentials. User ID is "purge" and password is "pltpurge".');
    }
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
            <p>Authenticated successfully! Redirecting to home page...</p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-[6px] text-xs font-semibold text-red-600 flex items-center gap-2">
                <svg className="w-4 h-4 min-w-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700" htmlFor="modal-userid">User ID</label>
              <input
                id="modal-userid"
                type="text"
                required
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all"
                placeholder="purge"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  setError('');
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
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
