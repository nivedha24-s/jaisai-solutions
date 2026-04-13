import React, { useEffect, useRef, useState } from 'react';
import './IndustriesSection.css';

/* ── Gold SVG Icons ── */
const Icons = {
  Healthcare: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
    </svg>
  ),
  Retail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
      <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
    </svg>
  ),
  Logistics: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16 16 8"/>
      <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
    </svg>
  ),
  Education: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
    </svg>
  ),
  Corporate: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
    </svg>
  ),
  Startups: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 012-11l11 11a22 22 0 01-11 2z"/>
    </svg>
  )
};

const industries = [
  { name: 'Healthcare', desc: 'AI-integrated diagnostics and patient data management.', Icon: Icons.Healthcare, color: '#ef4444' },
  { name: 'Retail & E-commerce', desc: 'Hyper-personalized shopping AI and inventory optimization.', Icon: Icons.Retail, color: '#22c55e' },
  { name: 'Logistics & Supply Chain', desc: 'Predictive supply chain, fleet management, and route optimization.', Icon: Icons.Logistics, color: '#3b82f6' },
  { name: 'Education', desc: 'Personalized learning platforms and automated grading systems.', Icon: Icons.Education, color: '#a855f7' },
  { name: 'Corporate Enterprises', desc: 'Streamlining operations with custom ERP and workflow automation.', Icon: Icons.Corporate, color: '#FFD700' },
  { name: 'Startups', desc: 'Scalable AI products designed to accelerate growth and innovation.', Icon: Icons.Startups, color: '#f97316' }
];

const IndustriesSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="industries" className="industries-section section-padding" ref={sectionRef}>
      <div className="ind-bg" />

      <div className="container">
        <div className={`ind-layout ${visible ? 'visible' : ''}`}>
          {/* Content side */}
          <div className="ind-content">
            <div className="section-tag">DOMAINS WE SERVE</div>
            <h2 className="ind-title">
              Pervasive Intelligence<br />
              <span className="gradient-text">Across Sectors</span>
            </h2>
            <p className="ind-subtitle">
              We don't just solve problems; we redefine how industries function.
              Our models are fine-tuned for the unique complexities of global commerce.
            </p>

            <div className="ind-list">
              {industries.map((ind, i) => {
                const Icon = ind.Icon;
                return (
                  <div
                    key={i}
                    className={`ind-item ${active === i ? 'active' : ''}`}
                    onClick={() => setActive(i)}
                  >
                    <div className="ind-item-indicator" style={{ background: ind.color }} />
                    <div className="ind-item-info">
                      <h4>{ind.name}</h4>
                      <p>{ind.desc}</p>
                    </div>
                    <div className="ind-item-icon"><Icon /></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visual side */}
          <div className="ind-visual">
            <div className="ind-hologram">
              {/* 3D laptop/screen effect */}
              <div className="holo-screen">
                <div className="holo-screen-inner">
                  <div className="holo-grid" />
                  <div className="holo-orb" style={{ color: industries[active].color }}>
                    <span className="holo-orb-icon">
                      {(() => {
                        const ActiveIcon = industries[active].Icon;
                        return <ActiveIcon />;
                      })()}
                    </span>
                    <div className="holo-ring r1" style={{ borderColor: industries[active].color + '33' }} />
                    <div className="holo-ring r2" style={{ borderColor: industries[active].color + '22' }} />
                    <div className="holo-ring r3" style={{ borderColor: industries[active].color + '11' }} />
                  </div>
                  <div className="holo-title">{industries[active].name}</div>
                  <div className="holo-desc">{industries[active].desc}</div>
                  {/* Data bars */}
                  <div className="holo-bars">
                    {[80, 60, 90, 45, 70].map((w, i) => (
                      <div key={i} className="holo-bar">
                        <div
                          className="holo-bar-fill"
                          style={{ width: `${w}%`, background: industries[active].color, transitionDelay: `${i*0.1}s` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Screen glow */}
                <div className="screen-glow" style={{ background: `radial-gradient(ellipse, ${industries[active].color}22, transparent)` }} />
              </div>

              {/* Laptop base */}
              <div className="holo-base">
                <div className="holo-base-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
