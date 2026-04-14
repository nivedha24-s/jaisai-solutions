import React, { useEffect, useRef, useState } from 'react';
import './AboutSection.css';
import LaptopAIVisual from './LaptopAIVisual';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* Mouse parallax for the visual */
  useEffect(() => {
    const handleMouse = (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMousePos({
        x: (e.clientX - cx) / cx * 30,
        y: (e.clientY - cy) / cy * 30
      });
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section id="about" className="about-section section-padding" ref={sectionRef}>
      <div className="about-bg-grid" />

      <div className="container">
        <div className={`about-layout ${visible ? 'visible' : ''}`}>

          {/* ── LEFT: Laptop AI Visual ── */}
          <div className="about-visual">
            <LaptopAIVisual mousePos={mousePos} />
          </div>

          {/* ── RIGHT: Text Content ── */}
          <div className="about-content">
            <div className="section-tag">WHO WE ARE</div>

            <h2 className="about-title">
              Who We <span className="gradient-text">Are</span>
            </h2>

            <p className="about-text">
              Jai Sai Solutions is a technology-driven company specializing in AI-based software development, data analytics, and intelligent automation solutions.
              <br /><br />
              We combine modern technologies, AI intelligence, and domain expertise to create high-impact digital products.
            </p>

            {/* Feature cards */}
            <div className="about-features">
              <div className="feature-item">
                <div className="feature-icon">👉</div>
                <div>
                  <h4>Identify Pain Points</h4>
                  <p>Identify critical business pain points with deep analysis.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">👉</div>
                <div>
                  <h4>Build Smart Solutions</h4>
                  <p>Build efficient, AI-driven and scalable architecture.</p>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">👉</div>
                <div>
                  <h4>Deliver Outcomes</h4>
                  <p>Deliver measurable business outcomes and continuous support.</p>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="about-metrics">
              <div className="metric">
                <span className="metric-val">10+</span>
                <span className="metric-lab">Years Active</span>
              </div>
              <div className="metric">
                <span className="metric-val">500+</span>
                <span className="metric-lab">AI Systems</span>
              </div>
              <div className="metric">
                <span className="metric-val">99.9%</span>
                <span className="metric-lab">Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
