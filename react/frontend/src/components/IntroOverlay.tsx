import React from 'react';

interface IntroOverlayProps {
  visible: boolean;
}

const IntroOverlay: React.FC<IntroOverlayProps> = ({ visible }) => {
  return (
    <div className={`intro-overlay ${!visible ? 'fade-out' : ''}`}>
      <div className="intro-content">
        <div className="intro-name">Yahya Loulou</div>
        <div className="intro-title">Web Developer</div>
      </div>
    </div>
  );
};

export default IntroOverlay;