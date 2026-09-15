import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlindsIndustry from './components/BlindsIndustry';
import HowItWorks from './components/HowItWorks';
import StreamlineCta from './components/StreamlineCta';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import GeneratorHome from './components/GeneratorHome';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('purge_auth') === 'true';
  });
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('purge_auth', 'true');
    } else {
      localStorage.removeItem('purge_auth');
    }
  }, [isAuthenticated]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  // If authenticated, render the dedicated generator workspace home page
  if (isAuthenticated) {
    return <GeneratorHome onLogout={handleLogout} />;
  }

  // Otherwise, render the public landing page
  return (
    <div className="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
      />

      {/* Main Landing Content */}
      <main>
        {/* Hero Section */}
        <Hero 
          onLoginClick={() => setIsLoginOpen(true)}
        />

        {/* Built for the Blinds Industry */}
        <BlindsIndustry />

        {/* How It Works with CNC machine banner */}
        <HowItWorks />

        {/* Ready to Streamline Your Production */}
        <StreamlineCta 
          onLoginClick={() => setIsLoginOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Login Modal with static auth verification */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
