import React from 'react';

interface FrameworkTabsProps {
  activeFramework: string;
  onFrameworkChange: (framework: string) => void;
}

const FrameworkTabs: React.FC<FrameworkTabsProps> = ({ 
  activeFramework, 
  onFrameworkChange 
}) => {
  const frameworks = [
    { id: 'react', label: 'React.js' },
    { id: 'nextjs', label: 'Next.js && javascript' }
  ];

  return (
    <div className="framework-tabs">
      {frameworks.map(framework => (
        <button
          key={framework.id}
          className={`framework-tab ${activeFramework === framework.id ? 'active' : ''}`}
          data-framework={framework.id}
          onClick={() => onFrameworkChange(framework.id)}
        >
          {framework.label}
        </button>
      ))}
    </div>
  );
};

export default FrameworkTabs;