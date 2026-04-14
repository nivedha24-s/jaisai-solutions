import React, { useEffect, useRef, useState } from 'react';
import './LaptopAIVisual.css';

/* ══════════════════════════════════════════
   ANIMATED SCREEN CANVAS
══════════════════════════════════════════ */
const ScreenCanvas = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = 480, H = 290;
    canvas.width = W; canvas.height = H;

    const chars = '01アイカキABXYZ#@∑∞≈∂><{}';
    const fs = 11;
    const cols = Math.floor(W / fs);
    const drops = Array.from({ length: cols }, () => Math.random() * H / fs);
    let frame = 0, scanY = 0;
    let raf;

    const draw = () => {
      frame++;
      scanY = (scanY + 0.75) % H;

      // Fade
      ctx.fillStyle = 'rgba(0,0,0,0.055)';
      ctx.fillRect(0, 0, W, H);

      // Scan sweep
      const sg = ctx.createLinearGradient(0, scanY - 10, 0, scanY + 10);
      sg.addColorStop(0, 'rgba(255,215,0,0)');
      sg.addColorStop(0.5, 'rgba(255,215,0,0.045)');
      sg.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, scanY - 10, W, 20);

      // Matrix rain
      ctx.font = `${fs}px monospace`;
      drops.forEach((y, i) => {
        const bright = Math.random() > 0.96;
        ctx.fillStyle = bright
          ? `rgba(255,252,180,0.9)`
          : `rgba(255,215,0,${0.05 + Math.random() * 0.18})`;
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fs, y * fs);
        if (y * fs > H && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.38;
      });

      /* ── CENTRAL ORB ── */
      const cx = W * 0.62, cy = H * 0.5;
      const pulse = 0.72 + 0.28 * Math.sin(frame * 0.038);

      // Halo rings
      [100, 86, 72, 60].forEach((r, i) => {
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,215,0,${0.04 + i * 0.025})`;
        ctx.lineWidth = 0.8; ctx.stroke();
      });

      // Outer rotating dashes
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(frame * 0.022);
      for (let d = 0; d < 12; d++) {
        const a = (d / 12) * Math.PI * 2;
        ctx.beginPath(); ctx.arc(0, 0, 86, a, a + 0.17);
        ctx.strokeStyle = `rgba(255,215,0,${0.4 + 0.25 * Math.sin(frame * 0.05 + d)})`;
        ctx.lineWidth = 1.7; ctx.stroke();
      }
      ctx.restore();

      // Inner counter-rotating dashes
      ctx.save(); ctx.translate(cx, cy); ctx.rotate(-frame * 0.037);
      for (let d = 0; d < 8; d++) {
        const a = (d / 8) * Math.PI * 2;
        ctx.beginPath(); ctx.arc(0, 0, 62, a, a + 0.21);
        ctx.strokeStyle = `rgba(255,241,118,${0.28 + 0.18 * Math.sin(frame * 0.07 + d)})`;
        ctx.lineWidth = 1; ctx.stroke();
      }
      ctx.restore();

      // Sweep arc
      const ang = frame * 0.03;
      ctx.beginPath(); ctx.arc(cx, cy, 86, ang, ang + Math.PI * 1.35);
      ctx.strokeStyle = 'rgba(255,215,0,0.55)'; ctx.lineWidth = 2; ctx.stroke();

      // Orbit nodes
      for (let n = 0; n < 6; n++) {
        const a = (n / 6) * Math.PI * 2 + frame * 0.019;
        const nx = cx + Math.cos(a) * 86, ny = cy + Math.sin(a) * 86;
        ctx.beginPath(); ctx.arc(nx, ny, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,215,0,${0.7 + 0.3 * Math.sin(frame * 0.1 + n)})`;
        ctx.shadowBlur = 10; ctx.shadowColor = '#FFD700'; ctx.fill(); ctx.shadowBlur = 0;
      }

      // Core gradient
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48 * pulse);
      g.addColorStop(0, `rgba(255,255,210,${pulse})`);
      g.addColorStop(0.22, `rgba(255,215,0,${0.88 * pulse})`);
      g.addColorStop(0.6, `rgba(255,160,0,${0.22 * pulse})`);
      g.addColorStop(1, 'rgba(255,215,0,0)');
      ctx.beginPath(); ctx.arc(cx, cy, 48 * pulse, 0, Math.PI * 2);
      ctx.fillStyle = g; ctx.fill();

      // Center bright dot
      ctx.beginPath(); ctx.arc(cx, cy, 9, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,220,${pulse})`;
      ctx.shadowBlur = 35; ctx.shadowColor = '#FFD700'; ctx.fill(); ctx.shadowBlur = 0;

      /* ── LEFT PANEL: code lines ── */
      const codeLines = [
        '> NEURAL_INIT( depth=12 )',
        '> LOAD model_v4.2.bin  ✓',
        '  [512 layers active]  ✓',
        '> SYNC realtime_feed',
        `  Processing... ${['|','/','-','\\'][frame % 4]}`,
        '> GPU_ACCEL enabled',
      ];
      ctx.font = '8.5px monospace';
      codeLines.forEach((l, i) => {
        ctx.fillStyle = i < 3
          ? `rgba(255,215,0,${0.28 - i * 0.04})`
          : `rgba(255,215,0,${0.14 + (i === 4 && frame % 40 < 20 ? 0.3 : 0)})`;
        ctx.fillText(l, 14, 28 + i * 18);
      });

      /* Bar chart */
      const bars = [
        { label: 'ACCURACY', v: 0.984 },
        { label: 'SPEED',    v: 0.712 },
        { label: 'MEMORY',   v: 0.93 + 0.04 * Math.sin(frame * 0.04) },
        { label: 'NEURAL',   v: 0.827 },
      ];
      bars.forEach((b, i) => {
        const bx = 14, by = 148 + i * 28, bw = 130, bh = 7;
        ctx.fillStyle = 'rgba(255,215,0,0.08)';
        ctx.fillRect(bx, by, bw, bh);
        const grad = ctx.createLinearGradient(bx, 0, bx + bw, 0);
        grad.addColorStop(0, 'rgba(255,215,0,0.9)');
        grad.addColorStop(1, 'rgba(255,241,118,0.5)');
        ctx.fillStyle = grad;
        ctx.fillRect(bx, by, bw * b.v, bh);
        ctx.fillStyle = 'rgba(255,215,0,0.35)';
        ctx.font = '7px monospace';
        ctx.fillText(`${b.label}  ${Math.round(b.v * 100)}%`, bx, by - 3);
      });

      /* Crosshair */
      ctx.strokeStyle = `rgba(255,215,0,${0.08 * pulse})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.moveTo(cx - W, cy); ctx.lineTo(cx + W, cy); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx, 0); ctx.lineTo(cx, H); ctx.stroke();

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} className="lap-screen-canvas" />;
};

/* ══════════════════════════════════════════
   KEYBOARD
══════════════════════════════════════════ */
const Keyboard = () => {
  const [lit, setLit] = useState(new Set());
  useEffect(() => {
    const t = setInterval(() => {
      const s = new Set();
      for (let i = 0; i < 6 + Math.floor(Math.random() * 5); i++)
        s.add(Math.floor(Math.random() * 58));
      setLit(s);
    }, 130);
    return () => clearInterval(t);
  }, []);

  const ROWS = [14, 13, 12, 11];
  let idx = 0;
  return (
    <div className="lap-kbd">
      {ROWS.map((n, ri) => (
        <div key={ri} className="lap-kbd-row">
          {Array(n).fill(0).map((_, ki) => {
            const id = idx++;
            return <div key={ki} className={`lap-key ${lit.has(id) ? 'lap-key-on' : ''}`} />;
          })}
        </div>
      ))}
      <div className="lap-kbd-row">
        <div className={`lap-key ${lit.has(idx++) ? 'lap-key-on' : ''}`} />
        <div className="lap-key lap-space" />
        <div className={`lap-key ${lit.has(idx++) ? 'lap-key-on' : ''}`} />
      </div>
      <div className="lap-trackpad" />
    </div>
  );
};

/* ══════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════ */
const LaptopAIVisual = ({ mousePos }) => {
  const mx = mousePos?.x || 0;
  const my = mousePos?.y || 0;

  // Whole-scene subtle mouse tilt added to base perspective
  const sceneStyle = {
    transform: `rotateX(${mx * 0.25}deg) rotateY(${my * 0.25}deg)`,
    transition: 'transform 0.12s ease-out',
  };

  // Floating tag parallax layers
  const tag1Style = { transform: `translate(${-mx * 0.45}px, ${-my * 0.35}px)`, transition: 'transform 0.12s ease-out' };
  const tag2Style = { transform: `translate(${mx * 0.5}px,  ${-my * 0.4}px)`,  transition: 'transform 0.12s ease-out' };
  const tag3Style = { transform: `translate(${mx * 0.4}px,  ${my * 0.35}px)`,  transition: 'transform 0.12s ease-out' };

  // Ambient glow follows mouse
  const glowStyle = {
    background: `radial-gradient(ellipse at ${50 + mx * 0.4}% ${50 + my * 0.4}%, rgba(255,215,0,0.2) 0%, rgba(255,215,0,0.06) 40%, transparent 70%)`,
  };

  return (
    <div className="lap-scene-wrap">
      {/* Ambient glow blob */}
      <div className="lap-ambient" style={glowStyle} />

      {/* Decorative spinning rings */}
      <div className="lap-ring lap-ring-1" />
      <div className="lap-ring lap-ring-2" />

      {/* Scattered particles */}
      {[...Array(11)].map((_, i) => <div key={i} className={`lap-dot ld-${i}`} />)}

      {/* ── 3D PERSPECTIVE SCENE ── */}
      <div className="lap-perspective-stage" style={sceneStyle}>

        {/* ── LAPTOP BODY ── */}
        <div className="lap-body">

          {/* ── SCREEN PANEL ── */}
          <div className="lap-screen-panel">

            {/* Screen frame (bezel) */}
            <div className="lap-bezel">
              {/* Camera */}
              <div className="lap-camera"><div className="lap-camera-dot" /></div>

              {/* Top edge shine */}
              <div className="lap-bezel-shine" />

              {/* Corner HUD brackets */}
              <div className="lap-hud-corner lap-hc-tl" />
              <div className="lap-hud-corner lap-hc-tr" />
              <div className="lap-hud-corner lap-hc-bl" />
              <div className="lap-hud-corner lap-hc-br" />

              {/* Status bar */}
              <div className="lap-statusbar">
                <span className="lap-sb-dot" /><span className="lap-sb-dot" /><span className="lap-sb-dot lap-blink" />
                <span className="lap-sb-title">JAI_SAI_AI.exe · NEURAL ENGINE v4.2</span>
                <span className="lap-sb-live">● LIVE</span>
              </div>

              {/* Canvas area */}
              <div className="lap-canvas-wrap">
                <ScreenCanvas />

                {/* HUD overlays */}
                <div className="lap-hud-tl">
                  <span>SYS:OK</span>
                  <span>FPS:144</span>
                </div>
                <div className="lap-hud-tr">
                  <span>MEM:98%</span>
                  <span>GPU:ON</span>
                </div>

                {/* Footer progress */}
                <div className="lap-screen-footer">
                  <span className="lap-sf-label">NEURAL_SYNC_v4</span>
                  <div className="lap-sf-bar"><div className="lap-sf-fill" /></div>
                  <span className="lap-sf-status">● ACTIVE</span>
                </div>

                {/* Screen glare */}
                <div className="lap-screen-glare" />
              </div>
            </div>

            {/* Screen thickness (right & bottom edges visible in perspective) */}
            <div className="lap-screen-edge-right" />
            <div className="lap-screen-edge-bottom" />
          </div>

          {/* ── HINGE ── */}
          <div className="lap-hinge">
            <div className="lap-hinge-line" />
            {/* Right hinge thickness */}
            <div className="lap-hinge-edge" />
          </div>

          {/* ── KEYBOARD BASE PANEL ── */}
          <div className="lap-base-panel">
            <div className="lap-base-surface">
              {/* Circuit trace */}
              <svg className="lap-circuit" viewBox="0 0 480 22" fill="none">
                <path d="M0 11 H55 V4 H120 V11 H190" stroke="rgba(255,215,0,0.15)" strokeWidth="0.8"/>
                <circle cx="55" cy="4" r="2" fill="rgba(255,215,0,0.28)"/>
                <circle cx="120" cy="11" r="1.5" fill="rgba(255,215,0,0.2)"/>
                <path d="M480 11 H425 V4 H360 V11 H290" stroke="rgba(255,215,0,0.15)" strokeWidth="0.8"/>
                <circle cx="425" cy="4" r="2" fill="rgba(255,215,0,0.28)"/>
                <circle cx="360" cy="11" r="1.5" fill="rgba(255,215,0,0.2)"/>
              </svg>

              <Keyboard />

              {/* Logo badge */}
              <div className="lap-logo-badge">JS</div>
            </div>

            {/* Base edges (3D depth) */}
            <div className="lap-base-edge-right" />
            <div className="lap-base-edge-bottom" />
            <div className="lap-base-glow" />
          </div>
        </div>

        {/* ── GROUND SHADOW ── */}
        <div className="lap-ground-shadow" />
        <div className="lap-ground-glow" />
      </div>

      {/* ── FLOATING TAGS (outside 3D stage for crisp rendering) ── */}

      {/* Tag 1 — AI CORE */}
      <div className="lap-tag lap-tag-1" style={tag1Style}>
        <div className="lap-tag-icon">
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="6" stroke="#FFD700" strokeWidth="1.3"/>
            <circle cx="10" cy="10" r="2.5" fill="#FFD700" opacity="0.8"/>
            <circle cx="10" cy="10" r="7.5" stroke="rgba(255,215,0,0.25)" strokeWidth="0.6" strokeDasharray="2.5 2.5" className="lap-tag-ring"/>
          </svg>
        </div>
        <div>
          <div className="lap-tag-val">AI CORE</div>
          <div className="lap-tag-lab">RUNNING</div>
        </div>
        <div className="lap-tag-pulse" />
      </div>

      {/* Tag 2 — 99.8% */}
      <div className="lap-tag lap-tag-2" style={tag2Style}>
        <div className="lap-tag-icon">
          <svg viewBox="0 0 20 20" fill="none">
            <polyline points="2,14 6,9 10,11 14,6 18,8" stroke="#FFD700" strokeWidth="1.4" strokeLinecap="round"/>
            <circle cx="18" cy="8" r="2" fill="#FFD700"/>
          </svg>
        </div>
        <div>
          <div className="lap-tag-val">99.8%</div>
          <div className="lap-tag-lab">ACCURACY</div>
        </div>
        <div className="lap-mini-bar"><div className="lap-mini-fill" /></div>
      </div>

      {/* Tag 3 — 500+ */}
      <div className="lap-tag lap-tag-3" style={tag3Style}>
        <div className="lap-tag-icon">
          <svg viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="2" stroke="#FFD700" strokeWidth="1.3"/>
            <line x1="10" y1="6" x2="10" y2="14" stroke="#FFD700" strokeWidth="1.3" strokeLinecap="round"/>
            <line x1="6" y1="10" x2="14" y2="10" stroke="#FFD700" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <div className="lap-tag-val">500+</div>
          <div className="lap-tag-lab">AI MODELS</div>
        </div>
      </div>

      {/* Holo ground rings */}
      <div className="lap-holo-ring lap-hr-1" />
      <div className="lap-holo-ring lap-hr-2" />
    </div>
  );
};

export default LaptopAIVisual;
