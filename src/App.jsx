import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import BlindsIndustry from './components/BlindsIndustry';
import HowItWorks from './components/HowItWorks';
import GeneratorHome from './components/GeneratorHome';
import StreamlineCta from './components/StreamlineCta';
import Footer from './components/Footer';
import './App.css';

function App() {
  const scrollToGenerate = () => {
    document.getElementById('generate')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-white overflow-x-hidden">
      {/* Top Navigation */}
      <Navbar onGenerateClick={scrollToGenerate} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero onGenerateClick={scrollToGenerate} />

        {/* Built for the Blinds Industry */}
        <BlindsIndustry />

        {/* How It Works */}
        <HowItWorks />

        {/* Dedicated PLT Generator Section */}
        <GeneratorHome />

        {/* Ready to Streamline Your Production */}
        <StreamlineCta onGenerateClick={scrollToGenerate} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
