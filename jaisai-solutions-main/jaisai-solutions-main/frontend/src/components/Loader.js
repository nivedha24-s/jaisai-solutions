import React, { useEffect, useState } from 'react';
import './Loader.css';
import logo from '../assets/logo.png';

const Loader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        {/* Logo */}
        <div className="loader-logo">
          <img src={logo} alt="Jai Sai Solutions" className="loader-logo-img" />
        </div>

        <div className="loader-brand">
          <span className="loader-brand-text">JAI SAI</span>
          <span className="loader-brand-sub">SOLUTIONS</span>
        </div>

        {/* Progress bar */}
        <div className="loader-progress-container">
          <div className="loader-progress-bar" style={{ width: `${progress}%` }} />
        </div>

        <div className="loader-status">
          {progress < 30 && 'Initializing Neural Networks...'}
          {progress >= 30 && progress < 60 && 'Loading AI Systems...'}
          {progress >= 60 && progress < 90 && 'Calibrating Intelligence...'}
          {progress >= 90 && 'Ready to Transform...'}
        </div>

        <div className="loader-percentage">{progress}%</div>
      </div>

      {/* Scanning lines */}
      <div className="scan-line" />
      <div className="scan-line-2" />
    </div>
  );
};

export default Loader;
