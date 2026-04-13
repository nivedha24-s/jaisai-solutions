import React, { useEffect, useRef, useState } from 'react';
import './CapabilitiesSection.css';

/* ── All icons as gold SVGs ── */
const Icons = {
  NeuralAutomation: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      {/* Brain shape */}
      <path d="M14 18 C14 13 18 11 20 11 C22 11 26 13 26 18 C28 18 30 20 29 23 C28 25 26 26 24 25.5 C23 27 21 28 20 27.5 C19 28 17 27 16 25.5 C14 26 12 25 11 23 C10 20 12 18 14 18Z"
        stroke="#FFD700" strokeWidth="1.5" fill="none" opacity="0.9"/>
      <line x1="20" y1="11" x2="20" y2="27.5" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
      <path d="M14 18 C16 19 18 18.5 20 19 C22 19.5 24 18 26 18" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
      <path d="M11 23 C13 22 16 22.5 20 22 C24 21.5 27 22 29 23" stroke="#FFD700" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="20" cy="19" r="2" fill="#FFD700" opacity="0.8"/>
      <circle cx="20" cy="19" r="1" fill="#FFF176"/>
    </svg>
  ),
  PredictiveAnalytics: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      {/* Bar chart */}
      <rect x="10" y="26" width="5" height="6" rx="1" fill="#FFD700" opacity="0.7"/>
      <rect x="17" y="20" width="5" height="12" rx="1" fill="#FFD700" opacity="0.85"/>
      <rect x="24" y="14" width="5" height="18" rx="1" fill="#FFD700" opacity="1"/>
      {/* Trend line */}
      <polyline points="12.5,24 19.5,18 26.5,12" stroke="#FFF176" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.8"/>
      <circle cx="12.5" cy="24" r="1.5" fill="#FFD700"/>
      <circle cx="19.5" cy="18" r="1.5" fill="#FFD700"/>
      <circle cx="26.5" cy="12" r="1.5" fill="#FFF176"/>
    </svg>
  ),
  EthicalAIGuard: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      {/* Shield */}
      <path d="M20 10 L28 13.5 L28 20 C28 24.5 24.5 28 20 30 C15.5 28 12 24.5 12 20 L12 13.5 Z"
        stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.06)" opacity="0.9"/>
      {/* Check inside shield */}
      <polyline points="16,20 19,23 24,17" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  HybridCloudAI: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      {/* Cloud shape */}
      <path d="M13 23 C10 23 8 21 8 18.5 C8 16 10 14 12.5 14 C13 12 15 10.5 17.5 10.5 C19 10.5 20.3 11.2 21.1 12.2 C21.6 12 22.2 11.9 22.8 11.9 C25.1 11.9 27 13.8 27 16.1 C28.7 16.6 30 18.2 30 20 C30 22.2 28.2 24 26 24 L13 24 Z"
        stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.05)" opacity="0.9"/>
      {/* Upload arrows */}
      <line x1="17" y1="28" x2="17" y2="20" stroke="#FFD700" strokeWidth="1.2" opacity="0.6"/>
      <polyline points="14,22.5 17,19.5 20,22.5" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
      <line x1="23" y1="28" x2="23" y2="20" stroke="#FFD700" strokeWidth="1.2" opacity="0.4"/>
      <polyline points="20,22.5 23,19.5 26,22.5" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.4"/>
    </svg>
  ),
  Industry40: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      {/* Gear */}
      <circle cx="20" cy="20" r="5" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.05)"/>
      <circle cx="20" cy="20" r="2" fill="#FFD700" opacity="0.7"/>
      {/* Gear teeth */}
      {[0,45,90,135,180,225,270,315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 20 + 6.5 * Math.cos(rad);
        const y1 = 20 + 6.5 * Math.sin(rad);
        const x2 = 20 + 9 * Math.cos(rad);
        const y2 = 20 + 9 * Math.sin(rad);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" opacity="0.85"/>;
      })}
    </svg>
  ),
  QuantumIntegration: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      {/* Atom nucleus */}
      <circle cx="20" cy="20" r="3" fill="#FFD700" opacity="0.9"/>
      <circle cx="20" cy="20" r="1.5" fill="#FFF176"/>
      {/* Ellipse orbits */}
      <ellipse cx="20" cy="20" rx="11" ry="5" stroke="#FFD700" strokeWidth="1.2" fill="none" opacity="0.7"/>
      <ellipse cx="20" cy="20" rx="11" ry="5" stroke="#FFD700" strokeWidth="1.2" fill="none" opacity="0.5"
        transform="rotate(60 20 20)"/>
      <ellipse cx="20" cy="20" rx="11" ry="5" stroke="#FFD700" strokeWidth="1.2" fill="none" opacity="0.4"
        transform="rotate(120 20 20)"/>
      {/* Orbiting particles */}
      <circle cx="31" cy="20" r="1.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="14.5" cy="14.5" r="1.5" fill="#FFD700" opacity="0.7"/>
      <circle cx="14.5" cy="25.5" r="1.5" fill="#FFD700" opacity="0.5"/>
    </svg>
  )
};

const capabilities = [
  {
    Icon: Icons.NeuralAutomation,
    title: 'AI-Based Software Development',
    description: 'Custom AI applications, Machine learning solutions, Predictive analytics systems, and Intelligent automation tools.',
  },
  {
    Icon: Icons.HybridCloudAI,
    title: 'Mobile & Web Application Development',
    description: 'End-to-end development of scalable Android, iOS, and Web apps with UI/UX focus and API integrations.',
  },
  {
    Icon: Icons.PredictiveAnalytics,
    title: 'Data Analytics & Business Intelligence',
    description: 'Data visualization dashboards, Business intelligence solutions, Real-time analytics, and Performance tracking systems.',
  },
  {
    Icon: Icons.EthicalAIGuard,
    title: 'AI-Based IP Camera Solutions',
    description: 'Smart surveillance with Face recognition, Object detection, Smart monitoring & alerts, and Security automation.',
  },
  {
    Icon: Icons.Industry40,
    title: 'Enterprise Software Solutions',
    description: 'Ready and custom solutions like HRMS, CRM & ERP solutions, Workflow automation, and Custom enterprise software.',
  },
  {
    Icon: Icons.QuantumIntegration,
    title: 'Custom Software & Integration',
    description: 'Tailored solutions for unique needs: Third-party integrations, Payment gateway integration, API development, and System modernization.',
  }
];

const CapabilityCard = ({ item, index }) => {
  const { Icon } = item;
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      className={`cap-card ${visible ? 'visible' : ''} ${hovered ? 'hovered' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setMousePos({ x: 50, y: 50 }); }}
      onMouseMove={handleMouseMove}
    >
      {/* Gradient spotlight */}
      <div
        className="card-spotlight"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,215,0,0.1) 0%, transparent 60%)`
            : 'none'
        }}
      />

      {/* Top accent line */}
      <div className="card-accent-top" />

      {/* Gold SVG Icon */}
      <div className="cap-icon-wrapper">
        <div className="cap-icon-svg">
          <Icon />
        </div>
        <div className="cap-icon-glow" />
      </div>

      {/* Content */}
      <h3 className="cap-title">{item.title}</h3>
      <p className="cap-desc">{item.description}</p>

      {/* Arrow */}
      <div className="cap-arrow">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>

      {/* Corner borders */}
      <div className="card-border-tl" />
      <div className="card-border-br" />
    </div>
  );
};

const CapabilitiesSection = () => {
  const sectionRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="capabilities" className="capabilities-section section-padding" ref={sectionRef}>
      <div className="cap-bg-decoration" />

      <div className="container">
        <div className={`section-header ${titleVisible ? 'visible' : ''}`}>
          <div className="section-tag">WHAT WE DO</div>
          <h2 className="section-title">
            Our <span className="gradient-text">Capabilities</span>
          </h2>
          <div className="title-underline" />
          <p className="section-subtitle">
            Cutting-edge AI solutions engineered for enterprise-grade performance
          </p>
        </div>

        <div className="capabilities-grid">
          {capabilities.map((item, index) => (
            <CapabilityCard key={index} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapabilitiesSection;
