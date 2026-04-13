import React from 'react';
import './AIHumanVisual.css';
import humanImg from '../assets/ai_human.png';

const AIHumanVisual = ({ mousePos }) => {
  return (
    <div className="human-scene">
      {/* ── 3D MAIN FRAME ── */}
      <div 
        className="human-frame"
        style={{
          transform: `perspective(1200px) rotateY(${mousePos.x * 0.12}deg) rotateX(${-mousePos.y * 0.12}deg)`
        }}
      >
        <div className="human-image-container">
          <img src={humanImg} alt="AI Human Evolution" className="human-main-img" />
          
          {/* Holographic scanning overlay */}
          <div className="human-scan-line" />
          <div className="human-glitch-overlay" />
        </div>

        {/* ── PARALLAX HUD ELEMENTS ── */}
        <div 
          className="human-hud evolution-badge"
          style={{ transform: `translateZ(60px) translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
        >
          <div className="hud-label">EVOLUTION</div>
          <div className="hud-main-val">10+ YEARS</div>
          <div className="hud-sub-val">OF DIGITAL GROWTH</div>
        </div>

        <div 
          className="human-hud intelligence-badge"
          style={{ transform: `translateZ(40px) translate(${mousePos.x * 0.25}px, ${mousePos.y * 0.25}px)` }}
        >
          <div className="hud-label">SYSTEM_CORE</div>
          <div className="hud-main-val">GEN_AI</div>
          <div className="hud-status">ACTIVE_NODE</div>
        </div>

        <div className="human-frame-decor decor-tl" />
        <div className="human-frame-decor decor-br" />
      </div>

      {/* Background Aura */}
      <div className="human-aura" />
    </div>
  );
};

export default AIHumanVisual;
