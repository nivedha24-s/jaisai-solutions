import React, { useEffect, useRef, useState } from 'react';
import './StatsSection.css';

/* ── Gold SVG Icons ── */
const Icons = {
  Understand: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  ),
  Design: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>
    </svg>
  ),
  Develop: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/>
    </svg>
  ),
  Deliver: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/>
      <path d="M12 15l-3-3a22 22 0 012-11l11 11a22 22 0 01-11 2z"/>
    </svg>
  )
};

const statsData = [
  { value: 1, suffix: '', label: 'UNDERSTAND', Icon: Icons.Understand },
  { value: 2, suffix: '', label: 'DESIGN', Icon: Icons.Design },
  { value: 3, suffix: '', label: 'DEVELOP', Icon: Icons.Develop },
  { value: 4, suffix: '', label: 'DELIVER', Icon: Icons.Deliver }
];

const useCountUp = (end, duration = 2000, start = false) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
};

const StatItem = ({ stat, index, trigger }) => {
  const count = useCountUp(stat.value, 2000 + index * 200, trigger);
  const Icon = stat.Icon;

  return (
    <div className={`stat-item ${trigger ? 'visible' : ''}`} style={{ animationDelay: `${index * 0.15}s` }}>
      <div className="stat-icon"><Icon /></div>
      <div className="stat-number">
        <span className="stat-count">{count}</span>
        <span className="stat-suffix">{stat.suffix}</span>
      </div>
      <div className="stat-label">{stat.label}</div>
      <div className="stat-bar">
        <div className="stat-bar-fill" style={{ transitionDelay: `${index * 0.2}s` }} />
      </div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTriggered(true); },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-bg" />
      <div className="stats-grid-overlay" />

      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, index) => (
            <StatItem key={index} stat={stat} index={index} trigger={triggered} />
          ))}
        </div>
      </div>

      {/* Scanline effect */}
      <div className="stats-scanline" />
    </section>
  );
};

export default StatsSection;
