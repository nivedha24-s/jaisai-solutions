import React, { useEffect, useRef, useState } from 'react';
import './AIVisual3D.css';

/* ── Canvas Neural Network ── */
const NeuralCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width = 340;
    const H = canvas.height = 340;
    let raf;
    let t = 0;

    // Build node layers
    const layers = [3, 5, 6, 5, 3];
    const nodes = [];
    const colW = W / (layers.length + 1);

    layers.forEach((count, li) => {
      const x = colW * (li + 1);
      const rowH = H / (count + 1);
      for (let ni = 0; ni < count; ni++) {
        nodes.push({ x, y: rowH * (ni + 1), layer: li, idx: ni, pulse: Math.random() * Math.PI * 2 });
      }
    });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.015;

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer !== nodes[i].layer + 1) continue;
          const alpha = 0.08 + 0.06 * Math.sin(t + nodes[i].pulse);
          const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
          grad.addColorStop(0, `rgba(255,215,0,${alpha})`);
          grad.addColorStop(0.5, `rgba(255,241,118,${alpha * 1.5})`);
          grad.addColorStop(1, `rgba(255,215,0,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Animated data packets along connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = 0; j < nodes.length; j++) {
          if (nodes[j].layer !== nodes[i].layer + 1) continue;
          if ((i + j) % 3 !== 0) continue;
          const prog = (t * 0.7 + (i * j * 0.1)) % 1;
          const px = nodes[i].x + (nodes[j].x - nodes[i].x) * prog;
          const py = nodes[i].y + (nodes[j].y - nodes[i].y) * prog;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,241,118,0.9)`;
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#FFD700';
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }

      // Draw nodes
      nodes.forEach(node => {
        const glow = 0.6 + 0.4 * Math.sin(t * 1.5 + node.pulse);
        const r = 5 + 2 * Math.sin(t + node.pulse);

        // Outer ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,215,0,${glow * 0.25})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Glow
        const g = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r + 4);
        g.addColorStop(0, `rgba(255,215,0,${glow * 0.8})`);
        g.addColorStop(0.5, `rgba(255,215,0,${glow * 0.3})`);
        g.addColorStop(1, 'rgba(255,215,0,0)');
        ctx.beginPath();
        ctx.arc(node.x, node.y, r + 4, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 0.55, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,241,118,${glow})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className="neural-canvas" />;
};

/* ── Main Component ── */
const AIVisual3D = ({ mousePos }) => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1200);
    return () => clearInterval(id);
  }, []);

  const tiltStyle = {
    transform: `perspective(900px) rotateY(${(mousePos?.x || 0) * 0.025}deg) rotateX(${-(mousePos?.y || 0) * 0.025}deg)`,
    transition: 'transform 0.1s ease-out'
  };

  return (
    <div className="ai-visual-scene" style={tiltStyle}>

      {/* ── OUTER HOLOGRAPHIC FRAME ── */}
      <div className="holo-frame">
        {/* Corner brackets */}
        <div className="corner c-tl" /><div className="corner c-tr" />
        <div className="corner c-bl" /><div className="corner c-br" />

        {/* Scan lines */}
        <div className="scan-h scan-h1" />
        <div className="scan-h scan-h2" />
        <div className="scan-v" />

        {/* Title bar */}
        <div className="holo-title-bar">
          <div className="title-dot" />
          <span>NEURAL INTELLIGENCE CORE v4.2</span>
          <div className="title-dot blink" />
        </div>

        {/* ── NEURAL NETWORK CANVAS ── */}
        <div className="neural-wrap">
          <NeuralCanvas />

          {/* Central glowing orb */}
          <div className="center-orb">
            <div className="orb-ring r1" />
            <div className="orb-ring r2" />
            <div className="orb-ring r3" />
            <div className="orb-core">
              <div className="orb-inner" />
            </div>
          </div>
        </div>

        {/* ── STATUS BAR ── */}
        <div className="holo-status-bar">
          <div className="status-item">
            <span className="s-label">PROCESSING</span>
            <div className="s-bar"><div className="s-fill" style={{width: '87%'}} /></div>
            <span className="s-val">87%</span>
          </div>
          <div className="status-item">
            <span className="s-label">ACCURACY</span>
            <div className="s-bar"><div className="s-fill" style={{width: '99%'}} /></div>
            <span className="s-val">99%</span>
          </div>
          <div className="status-item">
            <span className="s-label">UPTIME</span>
            <div className="s-bar"><div className="s-fill" style={{width: '100%'}} /></div>
            <span className="s-val">100%</span>
          </div>
        </div>

        {/* ── METRIC CHIPS ── */}
        <div className="metric-chips">
          {['DEEP LEARNING', 'NLP', 'COMPUTER VISION', 'QUANTUM'].map((chip, i) => (
            <div key={i} className={`chip ${tick % 4 === i ? 'chip-active' : ''}`}>{chip}</div>
          ))}
        </div>
      </div>

      {/* ── FLOATING DATA CARDS ── */}
      <div className="float-card fc-top">
        <div className="fc-icon">
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="4" stroke="#FFD700" strokeWidth="1.5"/>
            <circle cx="10" cy="10" r="8" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
            <line x1="10" y1="2" x2="10" y2="6" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="10" y1="14" x2="10" y2="18" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="2" y1="10" x2="6" y2="10" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="14" y1="10" x2="18" y2="10" stroke="#FFD700" strokeWidth="1.5"/>
          </svg>
        </div>
        <div>
          <div className="fc-value">500+</div>
          <div className="fc-label">AI MODELS</div>
        </div>
      </div>

      <div className="float-card fc-right">
        <div className="fc-icon">
          <svg viewBox="0 0 20 20" fill="none">
            <polyline points="2,14 6,9 10,11 14,5 18,7" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="18" cy="7" r="2" fill="#FFD700"/>
          </svg>
        </div>
        <div>
          <div className="fc-value">98%</div>
          <div className="fc-label">ACCURACY</div>
        </div>
      </div>

      <div className="float-card fc-bottom">
        <div className="fc-icon">
          <svg viewBox="0 0 20 20" fill="none">
            <rect x="3" y="3" width="14" height="14" rx="2" stroke="#FFD700" strokeWidth="1.2"/>
            <line x1="7" y1="10" x2="13" y2="10" stroke="#FFD700" strokeWidth="1.5"/>
            <line x1="10" y1="7" x2="10" y2="13" stroke="#FFD700" strokeWidth="1.5"/>
          </svg>
        </div>
        <div>
          <div className="fc-value">24/7</div>
          <div className="fc-label">ONLINE</div>
        </div>
      </div>

      {/* ── PARTICLE DOTS ── */}
      {[...Array(8)].map((_, i) => (
        <div key={i} className={`particle-dot pd-${i}`} />
      ))}
    </div>
  );
};

export default AIVisual3D;
