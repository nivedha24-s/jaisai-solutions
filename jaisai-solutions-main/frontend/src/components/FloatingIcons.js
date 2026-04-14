import React from 'react';
import './FloatingIcons.css';

const icons = [
  { id: 1, type: 'brain', x: 20, y: 15, speed: 0.15, size: 28 },
  { id: 2, type: 'code', x: 80, y: 30, speed: 0.25, size: 24 },
  { id: 3, type: 'cloud', x: 15, y: 75, speed: 0.2, size: 32 },
  { id: 4, type: 'database', x: 85, y: 80, speed: 0.3, size: 26 },
  { id: 5, type: 'python', x: 10, y: 40, speed: 0.1, size: 22 },
  { id: 6, type: 'network', x: 90, y: 10, speed: 0.35, size: 30 },
  { id: 7, type: 'shield', x: 75, y: 70, speed: 0.22, size: 25 }
];

const IconSVG = ({ type }) => {
  switch (type) {
    case 'brain': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.04-2.44V4.5A2.5 2.5 0 017.5 2h2zM14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.04-2.44V4.5A2.5 2.5 0 0016.5 2h-2z" />
      </svg>
    );
    case 'code': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    );
    case 'cloud': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
      </svg>
    );
    case 'database': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.664 3.336 3 9 3s9-1.336 9-3V5" />
      </svg>
    );
    case 'python': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2a5 5 0 00-5 5v2H5a3 3 0 00-3 3v2a3 3 0 003 3h2v2a5 5 0 005 5 5 5 0 005-5v-2h2a3 3 0 003-3v-2a3 3 0 00-3-3h-2V7a5 5 0 00-5-5zM10 6a1 1 0 110 2 1 1 0 010-2zM14 16a1 1 0 110 2 1 1 0 010-2z" />
      </svg>
    );
    case 'network': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    );
    case 'shield': return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    );
    default: return null;
  }
};

const FloatingIcons = ({ mousePos }) => {
  return (
    <div className="floating-icons-container">
      {icons.map((icon) => (
        <div 
          key={icon.id}
          className="floating-icon"
          style={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            transform: `translate(${mousePos.x * icon.speed}px, ${mousePos.y * icon.speed}px) rotate(${mousePos.x * 0.2}deg)`,
            opacity: 0.15 + (icon.speed * 0.4)
          }}
        >
          <IconSVG type={icon.type} />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
