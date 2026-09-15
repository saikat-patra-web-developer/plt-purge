import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlindsIndustry from './components/BlindsIndustry';
import HowItWorks from './components/HowItWorks';
import StreamlineCta from './components/StreamlineCta';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import './App.css';

function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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

      {/* Login Modal */}
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </div>
  );
}

export default App;
