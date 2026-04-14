import React, { useEffect, useRef, useState } from 'react';
import './AIRobot.css';

const AIRobot = ({ mousePos }) => {
  const [eyeGlow, setEyeGlow] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    // Eye pulse every 3s
    const eyeInterval = setInterval(() => {
      setEyeGlow(prev => !prev);
    }, 2000);

    // Speaking animation every 5s
    const speakInterval = setInterval(() => {
      setSpeaking(true);
      setTimeout(() => setSpeaking(false), 1500);
    }, 5000);

    return () => {
      clearInterval(eyeInterval);
      clearInterval(speakInterval);
    };
  }, []);

  return (
    <div
      className="robot-scene"
      style={{
        transform: `perspective(1000px) rotateY(${mousePos.x * 0.04}deg) rotateX(${-mousePos.y * 0.04}deg)`
      }}
    >
      {/* ── FLOATING PLATFORM ── */}
      <div className="robot-platform">
        <div className="platform-ring p-ring-1" />
        <div className="platform-ring p-ring-2" />
        <div className="platform-ring p-ring-3" />
        <div className="platform-glow" />
      </div>

      {/* ── ROBOT BODY ── */}
      <div className="robot-body-wrap">
        <svg
          className="robot-svg"
          viewBox="0 0 280 420"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ─── GLOW DEFS ─── */}
          <defs>
            <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <filter id="glow-strong" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
            <linearGradient id="bodyGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1A1A1A"/>
              <stop offset="100%" stopColor="#0D0D0D"/>
            </linearGradient>
            <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#B8860B"/>
              <stop offset="50%" stopColor="#FFD700"/>
              <stop offset="100%" stopColor="#B8860B"/>
            </linearGradient>
            <linearGradient id="headGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#222"/>
              <stop offset="100%" stopColor="#111"/>
            </linearGradient>
            <radialGradient id="eyeGlowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="1"/>
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
            </radialGradient>
          </defs>

          {/* ══════════════════════════
               HEAD
          ══════════════════════════ */}

          {/* Antenna */}
          <line x1="140" y1="10" x2="140" y2="38" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
          <circle cx="140" cy="8" r="5" fill="#FFD700" filter="url(#glow)" opacity="0.9"/>
          <circle cx="140" cy="8" r="2" fill="#FFF176"/>
          <line x1="110" y1="22" x2="140" y2="32" stroke="#FFD700" strokeWidth="1" opacity="0.3"/>
          <line x1="170" y1="22" x2="140" y2="32" stroke="#FFD700" strokeWidth="1" opacity="0.3"/>
          <circle cx="108" cy="20" r="3" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.4"/>
          <circle cx="172" cy="20" r="3" fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.4"/>

          {/* Head outer */}
          <rect x="72" y="38" width="136" height="110" rx="18" fill="url(#headGrad)" stroke="#FFD700" strokeWidth="1.5" opacity="0.9"/>

          {/* Head inner plate */}
          <rect x="80" y="46" width="120" height="94" rx="12" fill="#161616" stroke="#FFD700" strokeWidth="0.5" opacity="0.4"/>

          {/* Head highlight top */}
          <rect x="82" y="48" width="116" height="4" rx="2" fill="#FFD700" opacity="0.06"/>

          {/* ── EYES ── */}
          {/* Eye sockets */}
          <rect x="88" y="62" width="42" height="28" rx="8" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1" opacity="0.7"/>
          <rect x="150" y="62" width="42" height="28" rx="8" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1" opacity="0.7"/>

          {/* Eye glow bg */}
          <ellipse cx="109" cy="76" rx="14" ry="9" fill="#FFD700" opacity={eyeGlow ? "0.15" : "0.05"} filter="url(#glow)"/>
          <ellipse cx="171" cy="76" rx="14" ry="9" fill="#FFD700" opacity={eyeGlow ? "0.15" : "0.05"} filter="url(#glow)"/>

          {/* Eye pupils */}
          <ellipse cx="109" cy="76" rx="10" ry="7" fill="#FFD700" opacity={eyeGlow ? "0.9" : "0.5"} filter="url(#glow-strong)"/>
          <ellipse cx="171" cy="76" rx="10" ry="7" fill="#FFD700" opacity={eyeGlow ? "0.9" : "0.5"} filter="url(#glow-strong)"/>

          {/* Eye iris inner */}
          <ellipse cx="109" cy="76" rx="5" ry="4" fill="#FFF176" opacity="0.9"/>
          <ellipse cx="171" cy="76" rx="5" ry="4" fill="#FFF176" opacity="0.9"/>

          {/* Eye center dot */}
          <circle cx="109" cy="76" r="2" fill="#000"/>
          <circle cx="171" cy="76" r="2" fill="#000"/>

          {/* Eye scan line */}
          <line x1="88" y1="76" x2="130" y2="76" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
          <line x1="150" y1="76" x2="192" y2="76" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>

          {/* ── NOSE SENSOR ── */}
          <rect x="130" y="96" width="20" height="8" rx="4" fill="#0A0A0A" stroke="#FFD700" strokeWidth="0.5" opacity="0.5"/>
          <circle cx="136" cy="100" r="2" fill="#FFD700" opacity="0.6"/>
          <circle cx="144" cy="100" r="2" fill="#FFD700" opacity="0.6"/>

          {/* ── MOUTH ── */}
          <rect x="100" y="112" width="80" height="14" rx="5" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1" opacity="0.7"/>
          {/* Speaking bars */}
          {speaking ? (
            <>
              <rect x="108" y="115" width="6" height="8" rx="1" fill="#FFD700" opacity="0.9"/>
              <rect x="118" y="113" width="6" height="12" rx="1" fill="#FFD700" opacity="0.7"/>
              <rect x="128" y="116" width="6" height="6" rx="1" fill="#FFD700" opacity="0.8"/>
              <rect x="138" y="114" width="6" height="10" rx="1" fill="#FFD700" opacity="0.9"/>
              <rect x="148" y="115" width="6" height="8" rx="1" fill="#FFD700" opacity="0.6"/>
              <rect x="158" y="113" width="6" height="12" rx="1" fill="#FFD700" opacity="0.7"/>
            </>
          ) : (
            <>
              <rect x="108" y="118" width="6" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
              <rect x="118" y="118" width="6" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
              <rect x="128" y="118" width="6" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
              <rect x="138" y="118" width="6" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
              <rect x="148" y="118" width="6" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
              <rect x="158" y="118" width="6" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
            </>
          )}

          {/* Head side vents */}
          <rect x="72" y="58" width="8" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
          <rect x="72" y="63" width="8" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
          <rect x="72" y="68" width="8" height="2" rx="1" fill="#FFD700" opacity="0.2"/>
          <rect x="200" y="58" width="8" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
          <rect x="200" y="63" width="8" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
          <rect x="200" y="68" width="8" height="2" rx="1" fill="#FFD700" opacity="0.2"/>

          {/* ══════════════════════════
               NECK
          ══════════════════════════ */}
          <rect x="124" y="148" width="32" height="18" rx="4" fill="#161616" stroke="#FFD700" strokeWidth="0.8" opacity="0.6"/>
          <line x1="130" y1="152" x2="130" y2="162" stroke="#FFD700" strokeWidth="1" opacity="0.3"/>
          <line x1="140" y1="150" x2="140" y2="164" stroke="#FFD700" strokeWidth="1" opacity="0.5"/>
          <line x1="150" y1="152" x2="150" y2="162" stroke="#FFD700" strokeWidth="1" opacity="0.3"/>

          {/* ══════════════════════════
               CHEST / TORSO
          ══════════════════════════ */}
          {/* Shoulder pads */}
          <path d="M64 170 Q60 165 68 160 L112 158 L108 172 Q80 176 64 170Z" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <path d="M216 170 Q220 165 212 160 L168 158 L172 172 Q200 176 216 170Z" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>

          {/* Shoulder accent lines */}
          <line x1="72" y1="162" x2="72" y2="168" stroke="#FFD700" strokeWidth="1.5" opacity="0.6"/>
          <line x1="80" y1="160" x2="80" y2="170" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>
          <line x1="208" y1="162" x2="208" y2="168" stroke="#FFD700" strokeWidth="1.5" opacity="0.6"/>
          <line x1="200" y1="160" x2="200" y2="170" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>

          {/* Main torso */}
          <rect x="78" y="166" width="124" height="110" rx="10" fill="url(#bodyGrad)" stroke="#FFD700" strokeWidth="1.5" opacity="0.9"/>

          {/* Torso top highlight */}
          <rect x="82" y="168" width="116" height="3" rx="1.5" fill="url(#goldGrad)" opacity="0.15"/>

          {/* ── CHEST REACTOR ── */}
          {/* Reactor housing */}
          <circle cx="140" cy="212" r="28" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1.5" opacity="0.8"/>
          <circle cx="140" cy="212" r="22" fill="#0D0D0D" stroke="#FFD700" strokeWidth="0.8" opacity="0.5"/>

          {/* Reactor core glow */}
          <circle cx="140" cy="212" r="16" fill="#FFD700" opacity="0.08" filter="url(#glow-strong)"/>
          <circle cx="140" cy="212" r="12" fill="#FFD700" opacity="0.12" filter="url(#glow)"/>
          <circle cx="140" cy="212" r="8" fill="#FFD700" opacity="0.7" filter="url(#glow-strong)"/>
          <circle cx="140" cy="212" r="4" fill="#FFF176"/>

          {/* Reactor segments */}
          <path d="M140 190 L140 196" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
          <path d="M140 228 L140 234" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
          <path d="M118 212 L124 212" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
          <path d="M156 212 L162 212" stroke="#FFD700" strokeWidth="2" opacity="0.6"/>
          {/* Diagonal */}
          <path d="M123 196 L127 200" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>
          <path d="M153 224 L157 228" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>
          <path d="M157 196 L153 200" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>
          <path d="M127 224 L123 228" stroke="#FFD700" strokeWidth="1.5" opacity="0.4"/>

          {/* ── CHEST PANELS ── */}
          {/* Left panel */}
          <rect x="86" y="174" width="40" height="26" rx="4" fill="#111" stroke="#FFD700" strokeWidth="0.8" opacity="0.5"/>
          <rect x="90" y="178" width="32" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
          <rect x="90" y="183" width="24" height="2" rx="1" fill="#FFD700" opacity="0.2"/>
          <rect x="90" y="188" width="28" height="2" rx="1" fill="#FFD700" opacity="0.25"/>
          <circle cx="96" cy="195" r="3" fill="#FFD700" opacity="0.5"/>

          {/* Right panel */}
          <rect x="154" y="174" width="40" height="26" rx="4" fill="#111" stroke="#FFD700" strokeWidth="0.8" opacity="0.5"/>
          <rect x="158" y="178" width="32" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
          <rect x="166" y="183" width="24" height="2" rx="1" fill="#FFD700" opacity="0.2"/>
          <rect x="162" y="188" width="28" height="2" rx="1" fill="#FFD700" opacity="0.25"/>
          <circle cx="184" cy="195" r="3" fill="#FFD700" opacity="0.5"/>

          {/* ── BELLY PANEL ── */}
          <rect x="86" y="240" width="108" height="28" rx="4" fill="#0D0D0D" stroke="#FFD700" strokeWidth="0.8" opacity="0.5"/>
          {/* Progress bars */}
          <rect x="92" y="246" width="60" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          <rect x="92" y="246" width="42" height="3" rx="1.5" fill="#FFD700" opacity="0.6"/>
          <rect x="92" y="252" width="60" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          <rect x="92" y="252" width="54" height="3" rx="1.5" fill="#FFD700" opacity="0.4"/>
          <rect x="92" y="258" width="60" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          <rect x="92" y="258" width="30" height="3" rx="1.5" fill="#FFD700" opacity="0.5"/>
          {/* Status dots */}
          <circle cx="166" cy="248" r="3" fill="#22c55e" opacity="0.8"/>
          <circle cx="174" cy="248" r="3" fill="#FFD700" opacity="0.8"/>
          <circle cx="182" cy="248" r="3" fill="#FFD700" opacity="0.4"/>

          {/* Side torso vents */}
          <rect x="78" y="200" width="8" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
          <rect x="78" y="206" width="8" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
          <rect x="78" y="212" width="8" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
          <rect x="78" y="218" width="8" height="2" rx="1" fill="#FFD700" opacity="0.2"/>
          <rect x="194" y="200" width="8" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
          <rect x="194" y="206" width="8" height="2" rx="1" fill="#FFD700" opacity="0.3"/>
          <rect x="194" y="212" width="8" height="2" rx="1" fill="#FFD700" opacity="0.4"/>
          <rect x="194" y="218" width="8" height="2" rx="1" fill="#FFD700" opacity="0.2"/>

          {/* ══════════════════════════
               ARMS
          ══════════════════════════ */}
          {/* LEFT ARM */}
          {/* Upper arm */}
          <rect x="38" y="168" width="38" height="80" rx="10" fill="#161616" stroke="#FFD700" strokeWidth="1.2" opacity="0.85"/>
          <rect x="42" y="172" width="30" height="4" rx="2" fill="url(#goldGrad)" opacity="0.2"/>
          <line x1="50" y1="182" x2="70" y2="182" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
          <line x1="50" y1="188" x2="70" y2="188" stroke="#FFD700" strokeWidth="0.5" opacity="0.2"/>
          <circle cx="57" cy="208" r="6" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1" opacity="0.6"/>
          <circle cx="57" cy="208" r="3" fill="#FFD700" opacity="0.4"/>

          {/* Elbow joint */}
          <ellipse cx="57" cy="250" rx="14" ry="10" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>
          <ellipse cx="57" cy="250" rx="8" ry="6" fill="#FFD700" opacity="0.1"/>
          <circle cx="57" cy="250" r="4" fill="#FFD700" opacity="0.3" filter="url(#glow)"/>

          {/* Lower arm */}
          <rect x="38" y="258" width="38" height="72" rx="8" fill="#141414" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <rect x="42" y="262" width="30" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          {/* Power lines */}
          <line x1="50" y1="272" x2="50" y2="300" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>
          <line x1="58" y1="270" x2="58" y2="302" stroke="#FFD700" strokeWidth="0.8" opacity="0.2"/>
          <line x1="64" y1="272" x2="64" y2="300" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>

          {/* Left hand */}
          <rect x="36" y="330" width="42" height="22" rx="6" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          {/* Fingers */}
          <rect x="36" y="352" width="8" height="16" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <rect x="46" y="352" width="8" height="18" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <rect x="56" y="352" width="8" height="18" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <rect x="66" y="352" width="8" height="14" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          {/* Palm glow */}
          <circle cx="57" cy="341" r="6" fill="#FFD700" opacity="0.1" filter="url(#glow)"/>
          <circle cx="57" cy="341" r="3" fill="#FFD700" opacity="0.4"/>

          {/* RIGHT ARM */}
          <rect x="204" y="168" width="38" height="80" rx="10" fill="#161616" stroke="#FFD700" strokeWidth="1.2" opacity="0.85"/>
          <rect x="208" y="172" width="30" height="4" rx="2" fill="url(#goldGrad)" opacity="0.2"/>
          <line x1="214" y1="182" x2="234" y2="182" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
          <line x1="214" y1="188" x2="234" y2="188" stroke="#FFD700" strokeWidth="0.5" opacity="0.2"/>
          <circle cx="223" cy="208" r="6" fill="#0A0A0A" stroke="#FFD700" strokeWidth="1" opacity="0.6"/>
          <circle cx="223" cy="208" r="3" fill="#FFD700" opacity="0.4"/>

          {/* Right elbow */}
          <ellipse cx="223" cy="250" rx="14" ry="10" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>
          <ellipse cx="223" cy="250" rx="8" ry="6" fill="#FFD700" opacity="0.1"/>
          <circle cx="223" cy="250" r="4" fill="#FFD700" opacity="0.3" filter="url(#glow)"/>

          {/* Right lower arm */}
          <rect x="204" y="258" width="38" height="72" rx="8" fill="#141414" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <rect x="208" y="262" width="30" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          <line x1="216" y1="272" x2="216" y2="300" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>
          <line x1="224" y1="270" x2="224" y2="302" stroke="#FFD700" strokeWidth="0.8" opacity="0.2"/>
          <line x1="230" y1="272" x2="230" y2="300" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>

          {/* Right hand */}
          <rect x="202" y="330" width="42" height="22" rx="6" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <rect x="202" y="352" width="8" height="14" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <rect x="212" y="352" width="8" height="18" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <rect x="222" y="352" width="8" height="18" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <rect x="232" y="352" width="8" height="16" rx="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="0.8" opacity="0.7"/>
          <circle cx="223" cy="341" r="6" fill="#FFD700" opacity="0.1" filter="url(#glow)"/>
          <circle cx="223" cy="341" r="3" fill="#FFD700" opacity="0.4"/>

          {/* ══════════════════════════
               WAIST & HIPS
          ══════════════════════════ */}
          <rect x="90" y="276" width="100" height="20" rx="6" fill="#111" stroke="#FFD700" strokeWidth="1" opacity="0.7"/>
          <rect x="94" y="280" width="92" height="3" rx="1.5" fill="url(#goldGrad)" opacity="0.2"/>
          {/* Hip bolts */}
          <circle cx="100" cy="286" r="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.6"/>
          <circle cx="180" cy="286" r="4" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.6"/>

          {/* ══════════════════════════
               LEGS
          ══════════════════════════ */}
          {/* LEFT LEG */}
          {/* Upper leg */}
          <rect x="96" y="296" width="40" height="68" rx="8" fill="#161616" stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>
          <rect x="100" y="300" width="32" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          <line x1="106" y1="312" x2="130" y2="312" stroke="#FFD700" strokeWidth="0.5" opacity="0.25"/>
          <line x1="106" y1="320" x2="130" y2="320" stroke="#FFD700" strokeWidth="0.5" opacity="0.15"/>

          {/* Knee */}
          <ellipse cx="116" cy="366" rx="18" ry="10" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>
          <ellipse cx="116" cy="366" rx="10" ry="6" fill="#FFD700" opacity="0.06"/>
          <circle cx="116" cy="366" r="4" fill="#FFD700" opacity="0.25" filter="url(#glow)"/>

          {/* Lower leg */}
          <rect x="98" y="374" width="36" height="36" rx="6" fill="#141414" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <line x1="106" y1="382" x2="106" y2="400" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>
          <line x1="116" y1="380" x2="116" y2="402" stroke="#FFD700" strokeWidth="0.8" opacity="0.2"/>
          <line x1="126" y1="382" x2="126" y2="400" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>

          {/* Left foot */}
          <rect x="90" y="408" width="52" height="12" rx="6" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <rect x="90" y="416" width="52" height="4" rx="2" fill="#FFD700" opacity="0.08"/>

          {/* RIGHT LEG */}
          <rect x="144" y="296" width="40" height="68" rx="8" fill="#161616" stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>
          <rect x="148" y="300" width="32" height="3" rx="1.5" fill="#FFD700" opacity="0.15"/>
          <line x1="154" y1="312" x2="178" y2="312" stroke="#FFD700" strokeWidth="0.5" opacity="0.25"/>
          <line x1="154" y1="320" x2="178" y2="320" stroke="#FFD700" strokeWidth="0.5" opacity="0.15"/>

          {/* Right knee */}
          <ellipse cx="164" cy="366" rx="18" ry="10" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1.2" opacity="0.8"/>
          <ellipse cx="164" cy="366" rx="10" ry="6" fill="#FFD700" opacity="0.06"/>
          <circle cx="164" cy="366" r="4" fill="#FFD700" opacity="0.25" filter="url(#glow)"/>

          <rect x="146" y="374" width="36" height="36" rx="6" fill="#141414" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <line x1="154" y1="382" x2="154" y2="400" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>
          <line x1="164" y1="380" x2="164" y2="402" stroke="#FFD700" strokeWidth="0.8" opacity="0.2"/>
          <line x1="174" y1="382" x2="174" y2="400" stroke="#FFD700" strokeWidth="0.8" opacity="0.3"/>

          {/* Right foot */}
          <rect x="138" y="408" width="52" height="12" rx="6" fill="#1A1A1A" stroke="#FFD700" strokeWidth="1" opacity="0.8"/>
          <rect x="138" y="416" width="52" height="4" rx="2" fill="#FFD700" opacity="0.08"/>
        </svg>

        {/* ── SCAN EFFECT ── */}
        <div className="robot-scan-line" />
      </div>

      {/* ── HOLOGRAPHIC DATA ── */}
      <div className="holo-data-left">
        <div className="holo-data-item">
          <span className="holo-label">CPU</span>
          <span className="holo-val">98.2%</span>
          <div className="holo-progress"><div className="holo-prog-fill" style={{width:'98%'}} /></div>
        </div>
        <div className="holo-data-item">
          <span className="holo-label">NEURAL</span>
          <span className="holo-val">ACTIVE</span>
          <div className="holo-status active" />
        </div>
        <div className="holo-data-item">
          <span className="holo-label">POWER</span>
          <span className="holo-val">100%</span>
          <div className="holo-progress"><div className="holo-prog-fill" style={{width:'100%'}} /></div>
        </div>
      </div>

      <div className="holo-data-right">
        <div className="holo-data-item">
          <span className="holo-label">IQ</span>
          <span className="holo-val">∞</span>
          <div className="holo-status active" />
        </div>
        <div className="holo-data-item">
          <span className="holo-label">UPTIME</span>
          <span className="holo-val">24/7</span>
          <div className="holo-progress"><div className="holo-prog-fill" style={{width:'100%'}} /></div>
        </div>
        <div className="holo-data-item">
          <span className="holo-label">LEARN</span>
          <span className="holo-val">ON</span>
          <div className="holo-status active" />
        </div>
      </div>

      {/* ── FLOATING ORBIT NODES ── */}
      <div className="orbit-system">
        <div className="orbit orbit-1">
          <div className="orbit-node n1">AI</div>
        </div>
        <div className="orbit orbit-2">
          <div className="orbit-node n2">ML</div>
        </div>
        <div className="orbit orbit-3">
          <div className="orbit-node n3">⚡</div>
        </div>
      </div>
    </div>
  );
};

export default AIRobot;
