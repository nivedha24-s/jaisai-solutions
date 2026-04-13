import React, { useEffect, useRef, useState, useCallback } from 'react';
import './WhyChooseUs.css';

/* ══════════════════════════
   GOLD SVG ICONS
══════════════════════════ */
const Icons = {
  Affordable: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      <circle cx="20" cy="20" r="13" stroke="#FFD700" strokeWidth="1.5"/>
      <path d="M20 9v2M20 29v2" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M25 14h-8a3 3 0 100 6h6a3 3 0 110 6H13" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="20" r="2" fill="#FFD700" opacity="0.4"/>
    </svg>
  ),
  ProblemSolving: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      <path d="M14 8c0 0 6 2 6 7s-6 7-6 12M26 8c0 0-6 2-6 7s6 7 6 12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M11 27h18" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 32h12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="20" cy="15" r="2.5" fill="#FFD700" opacity="0.6"/>
    </svg>
  ),
  Satisfaction: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      <path d="M8 30h24M13 30V22a1 1 0 00-1-1H9a1 1 0 00-1 1v8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 30V22a1 1 0 00-1-1h-3a1 1 0 00-1 1v8" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M16.5 30V23h7v7" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 10l2.4 4.8 5.4.8-3.9 3.8.9 5.3L20 22.4l-4.8 2.3.9-5.3L12.2 15.6l5.4-.8z" stroke="#FFD700" strokeWidth="1.4" fill="rgba(255,215,0,0.12)" strokeLinejoin="round"/>
    </svg>
  ),
  Growth: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      <path d="M8 28l8-8 5 5 11-12" stroke="#FFD700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="28,12 34,12 34,18" stroke="#FFD700" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="16" cy="20" r="2" fill="#FFD700" opacity="0.5"/>
      <circle cx="21" cy="25" r="2" fill="#FFD700" opacity="0.5"/>
    </svg>
  ),
  Innovation: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      <path d="M20 8c-4.4 0-8 3.6-8 8 0 3 1.6 5.6 4 7.1V26h8v-2.9c2.4-1.5 4-4.1 4-7.1 0-4.4-3.6-8-8-8z" stroke="#FFD700" strokeWidth="1.5" fill="rgba(255,215,0,0.08)" strokeLinejoin="round"/>
      <path d="M16 28h8M17 31h6" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M20 12v2M15 14l1.5 1.5M25 14l-1.5 1.5" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="20" cy="17" r="2" fill="#FFD700" opacity="0.7"/>
    </svg>
  ),
  Support: () => (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="18" stroke="#FFD700" strokeWidth="1.2" opacity="0.3"/>
      <circle cx="20" cy="15" r="5" stroke="#FFD700" strokeWidth="1.5"/>
      <path d="M10 32c0-5.5 4.5-10 10-10s10 4.5 10 10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M28 18l2.5 2.5M28 23l2.5-2.5" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="30" cy="20.5" r="3" stroke="#FFD700" strokeWidth="1.2"/>
    </svg>
  ),
};

const reasons = [
  {
    key: 'affordable',
    title: 'Affordable Solutions',
    desc: 'High-quality software at competitive pricing — we make enterprise-grade AI accessible for every business.',
    Icon: Icons.Affordable,
    stat: '60%',
    statLabel: 'Cost Savings',
    color: '#FFD700',
    delay: 0,
  },
  {
    key: 'problem',
    title: 'Problem-Solving Approach',
    desc: 'We dig deep into your real business challenges to craft solutions that actually move the needle.',
    Icon: Icons.ProblemSolving,
    stat: '100%',
    statLabel: 'Custom Built',
    color: '#FFF176',
    delay: 0.1,
  },
  {
    key: 'satisfaction',
    title: 'Customer Satisfaction',
    desc: 'Our solutions are purpose-built to enhance user experience and ensure long-term client success.',
    Icon: Icons.Satisfaction,
    stat: '98%',
    statLabel: 'Client Score',
    color: '#FFD700',
    delay: 0.2,
  },
  {
    key: 'growth',
    title: 'Revenue Growth Focus',
    desc: 'We architect systems that scale operations and drive measurable profitability across every vertical.',
    Icon: Icons.Growth,
    stat: '3×',
    statLabel: 'Avg ROI',
    color: '#FFF176',
    delay: 0.3,
  },
  {
    key: 'innovation',
    title: 'AI-Driven Innovation',
    desc: 'We harness the latest AI breakthroughs to keep your business on the cutting edge of the industry.',
    Icon: Icons.Innovation,
    stat: '50+',
    statLabel: 'AI Models',
    color: '#FFD700',
    delay: 0.4,
  },
  {
    key: 'support',
    title: 'Dedicated Support',
    desc: '24/7 expert support and agile delivery — we are a long-term partner, not just a vendor.',
    Icon: Icons.Support,
    stat: '24/7',
    statLabel: 'Live Support',
    color: '#FFF176',
    delay: 0.5,
  },
];

/* ── Spotlight hover card ── */
const ReasonCard = ({ reason, visible, index }) => {
  const cardRef = useRef(null);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlight({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight(s => ({ ...s, opacity: 0 }));
  }, []);

  const Icon = reason.Icon;

  return (
    <div
      ref={cardRef}
      className={`wcu-card ${visible ? 'wcu-visible' : ''}`}
      style={{ transitionDelay: `${reason.delay}s` }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight */}
      <div
        className="wcu-spotlight"
        style={{
          background: `radial-gradient(260px circle at ${spotlight.x}% ${spotlight.y}%, rgba(255,215,0,0.1), transparent 70%)`,
          opacity: spotlight.opacity,
        }}
      />

      {/* Animated corner borders */}
      <div className="wcu-border-tl" />
      <div className="wcu-border-br" />

      {/* Top accent line */}
      <div className="wcu-accent-line" />

      {/* Card number */}
      <div className="wcu-number">0{index + 1}</div>

      {/* Icon with hexagon backdrop */}
      <div className="wcu-icon-wrap">
        <div className="wcu-hex-bg">
          <svg viewBox="0 0 80 80" fill="none">
            <polygon
              points="40,4 72,22 72,58 40,76 8,58 8,22"
              stroke="rgba(255,215,0,0.35)"
              strokeWidth="1.2"
              fill="rgba(255,215,0,0.04)"
            />
            <polygon
              points="40,12 66,27 66,53 40,68 14,53 14,27"
              stroke="rgba(255,215,0,0.15)"
              strokeWidth="0.6"
              fill="none"
            />
          </svg>
        </div>
        <div className="wcu-icon-inner">
          <Icon />
        </div>
      </div>

      {/* Stat badge */}
      <div className="wcu-stat-badge">
        <span className="wcu-stat-val">{reason.stat}</span>
        <span className="wcu-stat-lab">{reason.statLabel}</span>
      </div>

      {/* Text */}
      <h3 className="wcu-title">{reason.title}</h3>
      <p className="wcu-desc">{reason.desc}</p>

      {/* Bottom tag */}
      <div className="wcu-bottom-tag">
        <div className="wcu-dot" />
        <span>JAI SAI SOLUTIONS</span>
      </div>
    </div>
  );
};

/* ══════════════════════════
   SECTION
══════════════════════════ */
const WhyChooseUs = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handle = (e) => {
      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;
      setMousePos({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section id="why-choose-us" className="wcu-section" ref={sectionRef}>

      {/* ── Animated grid background ── */}
      <div className="wcu-grid-bg" />

      {/* ── Parallax glow orbs ── */}
      <div
        className="wcu-orb wcu-orb-1"
        style={{ transform: `translate(${mousePos.x * -25}px, ${mousePos.y * -20}px)` }}
      />
      <div
        className="wcu-orb wcu-orb-2"
        style={{ transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 25}px)` }}
      />
      <div
        className="wcu-orb wcu-orb-3"
        style={{ transform: `translate(${mousePos.x * -15}px, ${mousePos.y * 30}px)` }}
      />

      {/* ── Diagonal gold sweep lines ── */}
      <div className="wcu-sweep-lines" />

      <div className="container">

        {/* ── Section Header ── */}
        <div className={`wcu-header ${visible ? 'wcu-visible' : ''}`}>
          <div className="wcu-tag-wrap">
            <div className="wcu-tag-line" />
            <span className="wcu-tag">WHY PARTNER WITH US</span>
            <div className="wcu-tag-line" />
          </div>

          <h2 className="wcu-heading">
            Why Choose <span className="wcu-gold">Jai Sai Solutions</span>
          </h2>

          <p className="wcu-subheading">
            We don't just build software — we build competitive advantages.
            Here's what sets us apart.
          </p>

          {/* Decorative underline */}
          <div className="wcu-title-deco">
            <div className="wcu-deco-line" />
            <div className="wcu-deco-diamond" />
            <div className="wcu-deco-line" />
          </div>
        </div>

        {/* ── Cards Grid ── */}
        <div className="wcu-grid">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.key} reason={reason} visible={visible} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA Strip ── */}
        <div className={`wcu-cta-strip ${visible ? 'wcu-visible' : ''}`} style={{ transitionDelay: '0.7s' }}>
          <div className="wcu-cta-left">
            <div className="wcu-cta-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div>
              <div className="wcu-cta-heading">Ready to transform your business with AI?</div>
              <div className="wcu-cta-sub">Join 50+ companies that trust Jai Sai Solutions.</div>
            </div>
          </div>
          <a href="#contact" className="wcu-cta-btn">
            <span>Start Your Project</span>
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 10h12M12 6l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
