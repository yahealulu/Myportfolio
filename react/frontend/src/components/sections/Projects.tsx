import React, { useState } from 'react';
import HexPanel from '../HexPanel';
import { projectsData } from '../../data/projectsData';
import FrameworkTabs from '../projects/FrameworkTabs';
import ProjectTabs from '../projects/ProjectTabs';
import ProjectDetail from '../projects/ProjectDetail';

interface ProjectsProps {
  active: boolean;
}

const Projects: React.FC<ProjectsProps> = ({ active }) => {
  const [activeFramework, setActiveFramework] = useState('react');
  const [activeProject, setActiveProject] = useState({
    react: 'react1',
    nextjs: 'next1'
  });

  const handleFrameworkChange = (framework: string) => {
    setActiveFramework(framework);
  };

  const handleProjectChange = (framework: string, projectId: string) => {
    setActiveProject(prev => ({
      ...prev,
      [framework]: projectId
    }));
  };

  return (
    <HexPanel id="projects" active={active}>
      <h2>ls ./projects</h2>
      <div className="filter-container">
        <FrameworkTabs 
          activeFramework={activeFramework} 
          onFrameworkChange={handleFrameworkChange} 
        />
        
        <div className="projects-container">
          {Object.keys(projectsData).map(framework => (
            <div 
              key={framework}
              className={`project-group ${activeFramework === framework ? 'active' : ''}`} 
              data-framework={framework}
            >
              <ProjectTabs 
                framework={framework}
                projects={projectsData[framework]} 
                activeProject={activeProject[framework as keyof typeof activeProject]} 
                onProjectChange={(projectId) => handleProjectChange(framework, projectId)}
              />
              
              <div className="project-details">
                {projectsData[framework].map(project => (
                  <ProjectDetail 
                    key={project.id}
                    project={project}
                    active={activeProject[framework as keyof typeof activeProject] === project.id}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </HexPanel>
  );
};

export default Projects;