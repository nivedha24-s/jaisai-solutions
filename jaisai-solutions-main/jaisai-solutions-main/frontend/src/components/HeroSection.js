import React, { useEffect, useRef, useState } from 'react';
import './HeroSection.css';
import AIRobot from './AIRobot';

const HeroSection = () => {
  const heroRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [parallaxLayers, setParallaxLayers] = useState({ slow: {x:0,y:0}, mid: {x:0,y:0}, fast: {x:0,y:0} });

  useEffect(() => {
    if (window.innerWidth < 768) return; // skip on mobile — no mouse
    let ticking = false;
    const handleMouseMove = (e) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const cx = window.innerWidth / 2;
        const cy = window.innerHeight / 2;
        const rx = (e.clientX - cx) / cx;
        const ry = (e.clientY - cy) / cy;
        setMousePos({ x: rx * 20, y: ry * 20 });
        setParallaxLayers({
          slow: { x: rx * 12, y: ry * 12 },
          mid:  { x: rx * 24, y: ry * 24 },
          fast: { x: rx * 40, y: ry * 40 }
        });
        ticking = false;
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section" ref={heroRef}>
      {/* ── PARALLAX LAYER 1 — slowest (background elements) ── */}
      <div
        className="hero-parallax-layer layer-1"
        style={{ transform: `translate(${parallaxLayers.slow.x}px, ${parallaxLayers.slow.y}px)` }}
      />

      {/* ── PARALLAX LAYER 2 — medium (rings) ── */}
      <div
        className="hero-parallax-layer layer-2"
        style={{ transform: `translate(${parallaxLayers.mid.x}px, ${parallaxLayers.mid.y}px)` }}
      />

      {/* ── PARALLAX LAYER 3 — fastest (corner decorations) ── */}
      <div
        className="hero-parallax-layer layer-3"
        style={{ transform: `translate(${parallaxLayers.fast.x}px, ${parallaxLayers.fast.y}px)` }}
      />

      {/* ── AI ROBOT — 3D parallax ── */}
      <div className="hero-robot-container">
        <AIRobot mousePos={mousePos} />
      </div>

      {/* ── HERO CONTENT ── */}
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot" />
          TRANSFORMING BUSINESSES
        </div>

        <h1 className="hero-title">
          <span className="title-white">Transforming Businesses with</span>
          <span className="title-gold gradient-text">AI-Driven Innovation</span>
        </h1>

        <p className="hero-description">
          At Jai Sai Solutions, we empower businesses with cutting-edge AI-based software solutions designed to solve real-world challenges, streamline operations, and accelerate growth.
          <br /><br />
          From intelligent mobile applications to advanced analytics and AI-powered surveillance systems, we deliver scalable, secure, and affordable technology tailored to your needs.
        </p>

        <div className="hero-actions">
          <button className="btn-primary" onClick={() => scrollTo('contact')}>
            <span>INITIATE STRATEGY</span>
            <div className="btn-shine" />
          </button>
          <button className="btn-secondary" onClick={() => scrollTo('capabilities')}>
            <span>VIEW ECOSYSTEM</span>
          </button>
        </div>

        {/* Mini stats */}
        <div className="hero-mini-stats">
          <div className="mini-stat">
            <span className="mini-stat-value">500+</span>
            <span className="mini-stat-label">AI DEPLOYMENTS</span>
          </div>
          <div className="mini-stat-divider" />
          <div className="mini-stat">
            <span className="mini-stat-value">98%</span>
            <span className="mini-stat-label">EFFICIENCY GAIN</span>
          </div>
          <div className="mini-stat-divider" />
          <div className="mini-stat">
            <span className="mini-stat-value">24/7</span>
            <span className="mini-stat-label">TECH SUPPORT</span>
          </div>
        </div>
      </div>

      {/* ── SCROLL INDICATOR ── */}
      <div className="scroll-indicator">
        <div className="scroll-line" />
        <span>SCROLL</span>
      </div>
    </section>
  );
};

export default HeroSection;
