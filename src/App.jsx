import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlindsIndustry from './components/BlindsIndustry';
import HowItWorks from './components/HowItWorks';
import GeneratorHome from './components/GeneratorHome';
import StreamlineCta from './components/StreamlineCta';
import FaqSection from './components/FaqSection';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    // Normalise pathname (treat empty or root as '/')
    return window.location.pathname || '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isGeneratePage = currentPath === '/generate' || currentPath.startsWith('/generate');

  return (
    <div className="alphenex-inspired-bg relative flex min-h-screen w-full flex-col overflow-x-hidden">
      {/* Header (Navbar with Purge logo and navigation controls) */}
      <Navbar currentPath={currentPath} onNavigate={navigate} />

      {/* Route Content */}
      {isGeneratePage ? (
        /* /generate route: Displays CNC & CAD Cutting Export workspace with Header & Footer */
        <GeneratorHome />
      ) : (
        /* / landing route: Full homepage with Hero, Features, How It Works, FAQ, CTA */
        <main className="flex-1">
          {/* Hero Section */}
          <Hero onGenerateClick={() => navigate('/generate')} />

          {/* Built for the Blinds Industry */}
          <BlindsIndustry />

          {/* How It Works */}
          <HowItWorks />

          {/* Technical Reference & FAQs for Operators and Search Engines */}
          <FaqSection />

          {/* Production Call-to-Action */}
          <StreamlineCta onGenerateClick={() => navigate('/generate')} />
        </main>
      )}

      {/* Footer (Consistent on all pages) */}
      <Footer />
    </div>
  );
}

export default App;
