import React, { Suspense, lazy } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ParticleBackground from './components/ParticleBackground';

// Lazy load below-fold sections for faster initial load
const AboutSection      = lazy(() => import('./components/AboutSection'));
const CapabilitiesSection = lazy(() => import('./components/CapabilitiesSection'));
const WhyChooseUs       = lazy(() => import('./components/WhyChooseUs'));
const IndustriesSection = lazy(() => import('./components/IndustriesSection'));
const StatsSection      = lazy(() => import('./components/StatsSection'));
const ContactSection    = lazy(() => import('./components/ContactSection'));
const Footer            = lazy(() => import('./components/Footer'));

function App() {
  return (
    <div className="App">
      <ParticleBackground />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={null}>
          <AboutSection />
          <CapabilitiesSection />
          <WhyChooseUs />
          <IndustriesSection />
          <StatsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;
