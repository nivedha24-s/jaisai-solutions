import React from 'react';
import './MiniRobot.css';
import robotIcon from '../assets/robot_icon.png';

const MiniRobot = ({ mousePos }) => {
  return (
    <div 
      className="mini-robot-wrap"
      style={{
        transform: `perspective(800px) rotateY(${mousePos.x * 0.15}deg) rotateX(${-mousePos.y * 0.15}deg) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`
      }}
    >
      <div className="mini-robot-frame">
        <img src={robotIcon} alt="AI Assistant" className="mini-robot-img" />
        <div className="mini-robot-glow" />
      </div>
      <div className="mini-robot-tag">AI_CORE_ACTIVE</div>
    </div>
  );
};

export default MiniRobot;
