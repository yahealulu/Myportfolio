import React from 'react';
import ImageCarousel from './ImageCarousel';
import { Project } from '../../data/projectsData';

interface ProjectDetailProps {
  project: Project;
  active: boolean;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, active }) => {
  return (
    <div className={`project-detail ${active ? 'active' : ''}`} id={project.id}>
      <div className="project-header">
        <h3>{project.title}</h3>
        <div className="project-links">
          <a href={project.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={project.demo} target="_blank" rel="noopener noreferrer">Demo</a>
        </div>
      </div>
      <div className="project-preview">
        <ImageCarousel images={project.images} />
        <div className="project-description">
          <p>{project.description}</p>
          <ul>
            {project.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <div className="project-tech">
            {project.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;