import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import CapabilitiesSection from './components/CapabilitiesSection';
import WhyChooseUs from './components/WhyChooseUs';
import StatsSection from './components/StatsSection';
import IndustriesSection from './components/IndustriesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ParticleBackground from './components/ParticleBackground';

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <CapabilitiesSection />
        <WhyChooseUs />
        <IndustriesSection />
        <StatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
