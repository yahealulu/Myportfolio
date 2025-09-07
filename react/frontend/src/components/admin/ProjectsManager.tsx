import React, { useState, useEffect } from 'react';

interface ProjectsManagerProps {
  token: string;
}

interface Project {
  id?: number;
  title: string;
  framework: string;
  github_url: string;
  demo_url: string;
  description: string;
  features: string[];
  technologies: string[];
  images?: ProjectImage[];
}

interface ProjectImage {
  id?: number;
  project_id?: number;
  image_path: string;
  display_order: number;
}

const ProjectsManager: React.FC<ProjectsManagerProps> = ({ token }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [newFeature, setNewFeature] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [projectImage, setProjectImage] = useState<File | null>(null);

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const data = await response.json();
        setProjects(data);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Reset form for new project
  const handleAddNew = () => {
    setSelectedProject({
      title: '',
      framework: 'react',
      github_url: '',
      demo_url: '',
      description: '',
      features: [],
      technologies: []
    });
    setIsEditing(true);
  };

  // Handle edit project
  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setIsEditing(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (selectedProject) {
      setSelectedProject({ ...selectedProject, [name]: value });
    }
  };

  // Add a new feature
  const handleAddFeature = () => {
    if (newFeature.trim() && selectedProject) {
      setSelectedProject({
        ...selectedProject,
        features: [...selectedProject.features, newFeature.trim()]
      });
      setNewFeature('');
    }
  };

  // Remove a feature
  const handleRemoveFeature = (featureToRemove: string) => {
    if (selectedProject) {
      setSelectedProject({
        ...selectedProject,
        features: selectedProject.features.filter(feature => feature !== featureToRemove)
      });
    }
  };

  // Add a new technology
  const handleAddTechnology = () => {
    if (newTechnology.trim() && selectedProject) {
      setSelectedProject({
        ...selectedProject,
        technologies: [...selectedProject.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  // Remove a technology
  const handleRemoveTechnology = (technologyToRemove: string) => {
    if (selectedProject) {
      setSelectedProject({
        ...selectedProject,
        technologies: selectedProject.technologies.filter(tech => tech !== technologyToRemove)
      });
    }
  };

  // Handle project image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProjectImage(e.target.files[0]);
    }
  };

  // Upload project image
  const handleImageUpload = async () => {
    if (!projectImage || !selectedProject || !selectedProject.id) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', projectImage);

    try {
      const response = await fetch('http://localhost:5000/api/upload/project-image', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        // Add image to project
        const imageResponse = await fetch('http://localhost:5000/api/projects/images', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            project_id: selectedProject.id,
            image_path: data.filePath,
            display_order: selectedProject.images ? selectedProject.images.length : 0
          })
        });

        if (imageResponse.ok) {
          // Refresh project data
          fetchProjects();
          // Fetch the updated project to refresh the selected project
          const updatedProjectResponse = await fetch(`http://localhost:5000/api/projects/${selectedProject.id}`);
          if (updatedProjectResponse.ok) {
            const updatedProject = await updatedProjectResponse.json();
            setSelectedProject(updatedProject);
          }
          setMessage({ text: 'Image uploaded successfully', type: 'success' });
        } else {
          const imageData = await imageResponse.json();
          setMessage({ text: imageData.message || 'Failed to add image to project', type: 'error' });
        }
      } else {
        setMessage({ text: data.message || 'Failed to upload image', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error uploading image', type: 'error' });
    } finally {
      setIsLoading(false);
      setProjectImage(null);
    }
  };

  // Delete project image
  const handleDeleteImage = async (imageId: number) => {
    if (!selectedProject) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/projects/images/${imageId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Refresh project data
        fetchProjects();
        // Fetch the updated project to refresh the selected project
        if (selectedProject.id) {
          const updatedProjectResponse = await fetch(`http://localhost:5000/api/projects/${selectedProject.id}`);
          if (updatedProjectResponse.ok) {
            const updatedProject = await updatedProjectResponse.json();
            setSelectedProject(updatedProject);
          }
        }
        setMessage({ text: 'Image deleted successfully', type: 'success' });
      } else {
        const data = await response.json();
        setMessage({ text: data.message || 'Failed to delete image', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error deleting image', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Save project
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProject) return;

    setIsLoading(true);
    try {
      const method = selectedProject.id ? 'PUT' : 'POST';
      const url = selectedProject.id 
        ? `http://localhost:5000/api/projects/${selectedProject.id}` 
        : 'http://localhost:5000/api/projects';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title: selectedProject.title,
          framework: selectedProject.framework,
          github_url: selectedProject.github_url,
          demo_url: selectedProject.demo_url,
          description: selectedProject.description,
          features: selectedProject.features,
          technologies: selectedProject.technologies
        })
      });

      const data = await response.json();

      if (response.ok) {
        fetchProjects();
        setMessage({ text: `Project ${selectedProject.id ? 'updated' : 'created'} successfully`, type: 'success' });
        setIsEditing(false);
        setSelectedProject(null);
      } else {
        setMessage({ text: data.message || `Failed to ${selectedProject.id ? 'update' : 'create'} project`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `Error ${selectedProject.id ? 'updating' : 'creating'} project`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete project
  const handleDelete = async (projectId: number) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchProjects();
        setMessage({ text: 'Project deleted successfully', type: 'success' });
        if (selectedProject && selectedProject.id === projectId) {
          setSelectedProject(null);
          setIsEditing(false);
        }
      } else {
        const data = await response.json();
        setMessage({ text: data.message || 'Failed to delete project', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error deleting project', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedProject(null);
  };

  return (
    <div className="projects-manager">
      <h2>Manage Projects</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      {!isEditing ? (
        <>
          <button 
            onClick={handleAddNew} 
            className="add-new-btn"
          >
            Add New Project
          </button>
          
          <div className="projects-list">
            {projects.length === 0 ? (
              <p>No projects found. Add your first project!</p>
            ) : (
              projects.map(project => (
                <div key={project.id} className="project-item">
                  <h3>{project.title}</h3>
                  <p className="project-framework">{project.framework}</p>
                  <div className="project-actions">
                    <button 
                      onClick={() => handleEdit(project)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => project.id && handleDelete(project.id)}
                      className="delete-btn"
                      disabled={isLoading}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <form onSubmit={handleSubmit} className="project-form">
          <div className="form-group">
            <label htmlFor="title">Project Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={selectedProject?.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="framework">Framework</label>
            <select
              id="framework"
              name="framework"
              value={selectedProject?.framework || 'react'}
              onChange={handleInputChange}
              required
            >
              <option value="react">React</option>
              <option value="nextjs">Next.js</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="github_url">GitHub URL</label>
            <input
              type="url"
              id="github_url"
              name="github_url"
              value={selectedProject?.github_url || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="demo_url">Demo URL</label>
            <input
              type="url"
              id="demo_url"
              name="demo_url"
              value={selectedProject?.demo_url || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={selectedProject?.description || ''}
              onChange={handleInputChange}
              rows={5}
            />
          </div>
          
          <div className="form-group">
            <label>Features</label>
            <div className="tags-container">
              {selectedProject?.features.map((feature, index) => (
                <div key={index} className="tag">
                  {feature}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveFeature(feature)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="add-tag-container">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add a feature"
              />
              <button 
                type="button" 
                onClick={handleAddFeature}
                className="add-tag-btn"
              >
                Add
              </button>
            </div>
          </div>
          
          <div className="form-group">
            <label>Technologies</label>
            <div className="tags-container">
              {selectedProject?.technologies.map((tech, index) => (
                <div key={index} className="tag">
                  {tech}
                  <button 
                    type="button" 
                    onClick={() => handleRemoveTechnology(tech)}
                    className="remove-tag"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <div className="add-tag-container">
              <input
                type="text"
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add a technology"
              />
              <button 
                type="button" 
                onClick={handleAddTechnology}
                className="add-tag-btn"
              >
                Add
              </button>
            </div>
          </div>
          
          {selectedProject?.id && (
            <div className="form-group">
              <label>Project Images</label>
              <div className="images-container">
                {selectedProject.images && selectedProject.images.length > 0 ? (
                  selectedProject.images.map(image => (
                    <div key={image.id} className="image-item">
                      <img 
                        src={`http://localhost:5000${image.image_path}`} 
                        alt="Project screenshot" 
                      />
                      <button 
                        type="button" 
                        onClick={() => image.id && handleDeleteImage(image.id)}
                        className="delete-image-btn"
                        disabled={isLoading}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No images added yet</p>
                )}
              </div>
              
              <div className="image-upload">
                <input 
                  type="file" 
                  accept=".jpg,.jpeg,.png,.gif" 
                  onChange={handleImageChange} 
                />
                <button 
                  type="button" 
                  onClick={handleImageUpload}
                  disabled={!projectImage || isLoading}
                >
                  Upload Image
                </button>
              </div>
            </div>
          )}
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Project'}
            </button>
            <button 
              type="button" 
              onClick={handleCancel}
              className="cancel-btn"
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProjectsManager;