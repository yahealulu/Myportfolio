import React from 'react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeSection, onSectionChange }) => {
  const sections = [
    { id: 'about', label: 'about' },
    { id: 'projects', label: 'projects' },
    { id: 'resume', label: 'resume' },
    { id: 'contact', label: 'contact' }
  ];

  return (
    <nav className="nav-buttons">
      {sections.map(section => (
        <button
          key={section.id}
          className={`nav-button ${activeSection === section.id ? 'active' : ''}`}
          onClick={() => onSectionChange(section.id)}
        >
          {section.label}
        </button>
      ))}
    </nav>
  );
};

export default Navigation;