import React from 'react';
import './SoftwareVisual.css';
import dashboardImg from '../assets/dashboard.png';

const SoftwareVisual = ({ mousePos }) => {
  return (
    <div className="software-scene">
      {/* ── 3D MAIN FRAME ── */}
      <div 
        className="main-frame"
        style={{
          transform: `perspective(1200px) rotateY(${mousePos.x * 0.1}deg) rotateX(${-mousePos.y * 0.1}deg)`
        }}
      >
        <div className="frame-border">
          <div className="frame-header">
            <div className="status-indicator">
              <span className="dot pulse" />
              NEURAL INTELLIGENCE CORE v4.2
            </div>
            <div className="header-meta">SECURE_SYNC: ACTIVE</div>
          </div>
          
          <div className="image-wrap">
            <img src={dashboardImg} alt="AI Dashboard" className="dashboard-img" />
            <div className="scan-line" />
            <div className="noise-overlay" />
          </div>

          <div className="frame-footer">
            <div className="footer-bar">
              <div className="bar-label">PROCESSING</div>
              <div className="bar-track"><div className="bar-fill" style={{width: '87%'}} /></div>
              <div className="bar-val">87%</div>
            </div>
            <div className="footer-bar">
              <div className="bar-label">ACCURACY</div>
              <div className="bar-track"><div className="bar-fill" style={{width: '99%'}} /></div>
              <div className="bar-val">99%</div>
            </div>
          </div>
        </div>

        {/* ── PARALLAX HUD ELEMENTS ── */}
        <div 
          className="hud-element models-badge"
          style={{ transform: `translateZ(50px) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        >
          <div className="hud-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8l4 4-4 4-4-4 4-4z" />
            </svg>
          </div>
          <div className="hud-info">
            <span className="hud-val">500+</span>
            <span className="hud-tag">AI MODELS</span>
          </div>
        </div>

        <div 
          className="hud-element accuracy-badge"
          style={{ transform: `translateZ(80px) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          <div className="hud-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 6l-9.5 9.5-5-5L1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div className="hud-info">
            <span className="hud-val">98%</span>
            <span className="hud-tag">ACCURACY</span>
          </div>
        </div>

        <div 
          className="hud-element uptime-badge"
          style={{ transform: `translateZ(30px) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)` }}
        >
          <div className="hud-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </div>
          <div className="hud-info">
            <span className="hud-val">24/7</span>
            <span className="hud-tag">ONLINE</span>
          </div>
        </div>

        {/* Floating Tags */}
        <div className="floating-tags">
          <span className="tag-item">DEEP LEARNING</span>
          <span className="tag-item">NLP</span>
          <span className="tag-item">QUANTUM</span>
        </div>
      </div>

      {/* Background Glow */}
      <div className="scene-glow" />
    </div>
  );
};

export default SoftwareVisual;
