import React from 'react';
import './RobotHeroVisual.css';
import robotImg from '../assets/robot_final.png';
import logo from '../assets/logo.png';

const RobotHeroVisual = ({ mousePos }) => {
  return (
    <div className="robot-hero-scene">
      {/* ── 3D MAIN FRAME ── */}
      <div 
        className="robot-hero-frame"
        style={{
          transform: `perspective(1200px) rotateY(${mousePos.x * 0.15}deg) rotateX(${-mousePos.y * 0.15}deg)`
        }}
      >
        <div className="robot-image-container">
          <img src={robotImg} alt="AI Robot Assistant" className="robot-hero-img" />
          
          <div className="holographic-logo-wrap">
            <img src={logo} alt="" className="holographic-logo" />
          </div>

          {/* Diagnostic Grid Overlay */}
          <div className="diagnostic-grid" />
          <div className="energy-pulse" />
        </div>

        {/* ── PARALLAX HUD ELEMENTS ── */}
        <div 
          className="robot-hud core-status"
          style={{ transform: `translateZ(70px) translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          <div className="hud-line" />
          <div className="hud-content">
            <span className="hud-label">CORE_STABILITY</span>
            <span className="hud-value">99.8%</span>
          </div>
        </div>

        <div 
          className="robot-hud sync-badge"
          style={{ transform: `translateZ(40px) translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
        >
          <div className="sync-dot" />
          <span className="sync-text">NEURAL_SYNC: ACTIVE</span>
        </div>

        {/* Floating Decorative Elements */}
        <div className="frame-bracket br-tl" />
        <div className="frame-bracket br-tr" />
        <div className="frame-bracket br-bl" />
        <div className="frame-bracket br-br" />
      </div>

      {/* Atmospheric Glow */}
      <div className="scene-atmosphere" />
    </div>
  );
};

export default RobotHeroVisual;
