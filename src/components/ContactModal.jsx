import React, { useState } from 'react';
import PurgeLogo from './Logo';

export function ContactModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [machine, setMachine] = useState('Aeronaut Automation');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2000);
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

        <h3 className="text-xl font-bold text-slate-900 text-center mb-1.5">Purge Wholesale Support</h3>
        <p className="text-[13.5px] text-slate-500 text-center mb-6">Connect with our automated blinds CAD & PLT engineering team</p>

        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6 px-4 text-center text-green-600 text-[14.5px] font-medium">
            <svg className="w-11 h-11" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p>Thank you! Our technical specialist will reach out within 1 business hour.</p>
          </div>
        ) : (
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">Your Name / Company</label>
              <input 
                type="text" 
                required 
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all"
                placeholder="e.g. Acme Blinds & Manufacturing" 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">Email Address</label>
              <input 
                type="email" 
                required 
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all"
                placeholder="contact@acmeblinds.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">Cutting Machine Model</label>
              <select 
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all bg-white"
                value={machine} 
                onChange={(e) => setMachine(e.target.value)}
              >
                <option value="Aeronaut Automation">Aeronaut Automation (Elektron / Cam-Tek)</option>
                <option value="Eastman Machine">Eastman Machine Company</option>
                <option value="Carlson Design">Carlson Design Plotter/Cutter</option>
                <option value="Matic M1 / Cronos">Matic (M1 / Cronos Ultimate)</option>
                <option value="Asco Cutting Tables">Asco Automated Cutting Tables</option>
                <option value="Solarise Cutting Systems">Solarise CNC Tables</option>
                <option value="Other HPGL / DXF Compatible">Other HPGL / DXF Compatible Machine</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[13px] font-semibold text-slate-700">Message / Specifications</label>
              <textarea 
                rows="3" 
                className="px-3.5 py-2.5 rounded-[6px] border border-slate-300 text-[14px] text-slate-900 outline-none focus:border-[#1967d2] focus:ring-3 focus:ring-[#1967d2]/15 transition-all resize-none"
                placeholder="Tell us about your blind cutting specifications or custom fabric requirements..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="bg-[#1967d2] hover:bg-[#1558b8] text-white py-3 rounded-[6px] text-[14.5px] font-semibold transition-all mt-1.5 cursor-pointer"
            >
              Send Message to Support →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactModal;
