import React, { useState, useEffect } from 'react';

interface HexPanelProps {
  id: string;
  active: boolean;
  children: React.ReactNode;
}

const HexPanel: React.FC<HexPanelProps> = ({ id, active, children }) => {
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (active) {
      // Delay the content animation slightly
      timeout = setTimeout(() => {
        setContentVisible(true);
      }, 50);
    } else {
      setContentVisible(false);
    }
    
    return () => clearTimeout(timeout);
  }, [active]);

  return (
    <div className={`hex-panel ${active ? 'active' : ''}`} id={id}>
      <div className="terminal-buttons">
        <div className="terminal-button"></div>
        <div className="terminal-button"></div>
        <div className="terminal-button"></div>
      </div>
      <div 
        className="hex-content"
        style={{ 
          transform: contentVisible ? 'translateY(0)' : 'translateY(-100%)',
          opacity: contentVisible ? 1 : 0
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default HexPanel;