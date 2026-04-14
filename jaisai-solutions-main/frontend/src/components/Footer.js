import React from 'react';
import logo from '../assets/logo.png';
import './Footer.css';

/* ── Gold Social Icons ── */
const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="#FFD700" xmlns="http://www.w3.org/2000/svg">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
    <rect x="2" y="9" width="4" height="12"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="#FFD700" stroke="none"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 00-1.95 1.96C1 8.12 1 12 1 12s0 3.88.46 5.58a2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96C23 15.88 23 12 23 12s0-3.88-.46-5.58z"/>
    <polygon points="9.75,15.02 15.5,12 9.75,8.98 9.75,15.02" fill="#FFD700" stroke="none"/>
  </svg>
);



const socialLinks = [
  { Icon: TwitterIcon, label: 'Twitter' },
  { Icon: LinkedInIcon, label: 'LinkedIn' },
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: YoutubeIcon, label: 'YouTube' }
];

const Footer = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-glow" />
      <div className="footer-grid-bg" />

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <img src={logo} alt="Jai Sai Solutions" className="footer-logo-img" />
              </div>
              <p className="footer-tagline">
                AI-Based Software & Intelligent Systems Provider
              </p>

              {/* Gold SVG social icons */}
              <div className="footer-social">
                {socialLinks.map(({ Icon, label }, i) => (
                  <button key={i} className="social-btn" aria-label={label}>
                    <Icon />
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h4>CONTACT</h4>
              <a href="mailto:sales@jaisaisolutions.com" className="footer-link footer-link-highlight">
                sales@jaisaisolutions.com
              </a>
              <a href="tel:9345788915" className="footer-link footer-link-highlight">
                +91 9345788915
              </a>
              <span className="footer-link">www.jaisaisolutions.com</span>
            </div>

            {/* Governance */}
            <div className="footer-col">
              <h4>GOVERNANCE</h4>
              {['Privacy Policy', 'Terms of Service', 'AI Assurance'].map(item => (
                <button key={item} className="footer-link">{item}</button>
              ))}
            </div>

            {/* Company */}
            <div className="footer-col">
              <h4>COMPANY</h4>
              {['About', 'Partner Programs', 'Contact'].map(item => (
                <button
                  key={item}
                  className="footer-link"
                  onClick={() => item === 'Contact' && scrollTo('contact')}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <span>© 2025 Jai Sai Solutions. All Rights Reserved.</span>
            <div className="footer-bottom-links">
              <button className="footer-bottom-link">Privacy</button>
              <span className="footer-divider">·</span>
              <button className="footer-bottom-link">Terms</button>
              <span className="footer-divider">·</span>
              <button className="footer-bottom-link">Security</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
