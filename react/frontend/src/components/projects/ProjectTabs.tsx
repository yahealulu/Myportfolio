import React from 'react';
import { Project } from '../../data/projectsData';

interface ProjectTabsProps {
  framework: string;
  projects: Project[];
  activeProject: string;
  onProjectChange: (projectId: string) => void;
}

const ProjectTabs: React.FC<ProjectTabsProps> = ({ 
  framework, 
  projects, 
  activeProject, 
  onProjectChange 
}) => {
  return (
    <div className="project-tabs">
      {projects.map(project => (
        <button
          key={project.id}
          className={`project-tab ${activeProject === project.id ? 'active' : ''}`}
          data-project={project.id}
          onClick={() => onProjectChange(project.id)}
        >
          {project.title}
        </button>
      ))}
    </div>
  );
};

export default ProjectTabs;