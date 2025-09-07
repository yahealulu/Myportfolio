import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import About from './sections/About';
import Projects from './sections/Projects';
import Resume from './sections/Resume';
import Contact from './sections/Contact';
import ParticleBackground from './ParticleBackground';

interface PortfolioProps {
  visible: boolean;
}

const Portfolio: React.FC<PortfolioProps> = ({ visible }) => {
  const [activeSection, setActiveSection] = useState('about');

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div className={`portfolio-space ${visible ? 'visible' : ''}`}>
      <ParticleBackground />
      
      <div className="hex-container">
        <About active={activeSection === 'about'} />
        <Projects active={activeSection === 'projects'} />
        <Resume active={activeSection === 'resume'} />
        <Contact active={activeSection === 'contact'} />
      </div>
      
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange} 
      />
    </div>
  );
};

export default Portfolio;