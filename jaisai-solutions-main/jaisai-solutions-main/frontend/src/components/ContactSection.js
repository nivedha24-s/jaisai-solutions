import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './ContactSection.css';

/* ── Gold SVG Icons ── */
const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <polyline points="2,4 12,13 22,4"/>
  </svg>
);

const LocationIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
    <circle cx="12" cy="9" r="2.5" stroke="#FFD700" strokeWidth="1.5"/>
  </svg>
);

const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const contactDetails = [
  {
    Icon: EmailIcon,
    label: 'EMAIL',
    value: 'sales@jaisaisolutions.com'
  },
  {
    Icon: LocationIcon,
    label: 'PHONE',
    value: '+91 9345788915'
  },
  {
    Icon: ClockIcon,
    label: 'WEBSITE',
    value: 'www.jaisaisolutions.com'
  }
];

const ContactSection = () => {
  const [form, setForm] = useState({ legal_name: '', email: '', project_blueprint: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post('/api/contact', form);
      setStatus({ type: 'success', message: response.data.message });
      setForm({ legal_name: '', email: '', project_blueprint: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || 'Failed to submit. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section section-padding" ref={sectionRef}>
      <div className="contact-bg" />
      <div className="contact-grid-bg" />

      <div className="container">
        <div className={`contact-wrapper ${visible ? 'visible' : ''}`}>
          <div className="contact-header">
            <div className="section-tag" style={{ justifyContent: 'center' }}>CONNECT WITH US</div>
            <h2 className="contact-title">
              Let’s Build Something <span className="gradient-text">Smart Together</span> 🚀
            </h2>
            <p className="contact-subtitle">
              Looking to transform your business with AI-powered solutions? Contact Jai Sai Solutions today and take your business to the next level.
            </p>
          </div>

          <div className="contact-layout">
            {/* Info Panel */}
            <div className="contact-info">
              <div className="info-card">
                <div className="info-orb" />
                <h3>Let's Build Intelligence</h3>
                <p>Transform your enterprise with bespoke AI frameworks tailored to your unique operational landscape.</p>

                <div className="contact-details">
                  {contactDetails.map(({ Icon, label, value }, i) => (
                    <div className="contact-detail" key={i}>
                      <div className="detail-icon">
                        <Icon />
                      </div>
                      <div>
                        <div className="detail-label">{label}</div>
                        <div className="detail-value">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="contact-form-wrapper">
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">LEGAL NAME</label>
                  <input
                    type="text"
                    name="legal_name"
                    className="form-input"
                    placeholder="John Doe"
                    value={form.legal_name}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-line" />
                </div>

                <div className="form-group">
                  <label className="form-label">SECURE EMAIL</label>
                  <input
                    type="email"
                    name="email"
                    className="form-input"
                    placeholder="john@company.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                  <div className="input-line" />
                </div>

                <div className="form-group">
                  <label className="form-label">PROJECT BLUEPRINT</label>
                  <textarea
                    name="project_blueprint"
                    className="form-input form-textarea"
                    placeholder="Describe your digital challenge..."
                    value={form.project_blueprint}
                    onChange={handleChange}
                    rows={4}
                  />
                  <div className="input-line" />
                </div>

                {status.message && (
                  <div className={`form-status ${status.type}`}>
                    {status.type === 'success' ? '✅' : '❌'} {status.message}
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading}>
                  {loading ? (
                    <span className="btn-loading">
                      <span className="loading-dot" />
                      <span className="loading-dot" />
                      <span className="loading-dot" />
                    </span>
                  ) : (
                    <>
                      <span>SUBMIT TO INTELLIGENCE</span>
                      <div className="btn-shine" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
