import React, { useState, useEffect } from 'react';

interface ExperienceManagerProps {
  token: string;
}

interface Experience {
  id?: number;
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string | null;
  description: string;
  type: 'professional' | 'education';
}

const ExperienceManager: React.FC<ExperienceManagerProps> = ({ token }) => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [filter, setFilter] = useState<'all' | 'professional' | 'education'>('all');

  // Fetch all experiences
  const fetchExperiences = async () => {
    try {
      const url = filter === 'all' 
        ? 'http://localhost:5000/api/experience' 
        : `http://localhost:5000/api/experience?type=${filter}`;
      
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setExperiences(data);
      }
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, [filter]);

  // Reset form for new experience
  const handleAddNew = () => {
    setSelectedExperience({
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: null,
      description: '',
      type: 'professional'
    });
    setIsEditing(true);
  };

  // Handle edit experience
  const handleEdit = (experience: Experience) => {
    // Format dates for the form
    const formattedExperience = {
      ...experience,
      start_date: new Date(experience.start_date).toISOString().split('T')[0],
      end_date: experience.end_date ? new Date(experience.end_date).toISOString().split('T')[0] : null
    };
    setSelectedExperience(formattedExperience);
    setIsEditing(true);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (selectedExperience) {
      setSelectedExperience({ ...selectedExperience, [name]: value });
    }
  };

  // Handle checkbox for current position
  const handleCurrentPositionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedExperience) {
      setSelectedExperience({
        ...selectedExperience,
        end_date: e.target.checked ? null : ''
      });
    }
  };

  // Save experience
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExperience) return;

    setIsLoading(true);
    try {
      const method = selectedExperience.id ? 'PUT' : 'POST';
      const url = selectedExperience.id 
        ? `http://localhost:5000/api/experience/${selectedExperience.id}` 
        : 'http://localhost:5000/api/experience';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(selectedExperience)
      });

      const data = await response.json();

      if (response.ok) {
        fetchExperiences();
        setMessage({ text: `Experience ${selectedExperience.id ? 'updated' : 'created'} successfully`, type: 'success' });
        setIsEditing(false);
        setSelectedExperience(null);
      } else {
        setMessage({ text: data.message || `Failed to ${selectedExperience.id ? 'update' : 'create'} experience`, type: 'error' });
      }
    } catch (error) {
      setMessage({ text: `Error ${selectedExperience.id ? 'updating' : 'creating'} experience`, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete experience
  const handleDelete = async (experienceId: number) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/experience/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        fetchExperiences();
        setMessage({ text: 'Experience deleted successfully', type: 'success' });
        if (selectedExperience && selectedExperience.id === experienceId) {
          setSelectedExperience(null);
          setIsEditing(false);
        }
      } else {
        const data = await response.json();
        setMessage({ text: data.message || 'Failed to delete experience', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error deleting experience', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setSelectedExperience(null);
  };

  return (
    <div className="experience-manager">
      <h2>Manage Experience</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      {!isEditing ? (
        <>
          <div className="filter-controls">
            <button 
              onClick={() => setFilter('all')}
              className={filter === 'all' ? 'active' : ''}
            >
              All
            </button>
            <button 
              onClick={() => setFilter('professional')}
              className={filter === 'professional' ? 'active' : ''}
            >
              Professional
            </button>
            <button 
              onClick={() => setFilter('education')}
              className={filter === 'education' ? 'active' : ''}
            >
              Education
            </button>
            <button 
              onClick={handleAddNew} 
              className="add-new-btn"
            >
              Add New Experience
            </button>
          </div>
          
          <div className="experiences-list">
            {experiences.length === 0 ? (
              <p>No experiences found. Add your first experience!</p>
            ) : (
              experiences.map(experience => (
                <div key={experience.id} className={`experience-item ${experience.type}`}>
                  <div className="experience-header">
                    <h3>{experience.title}</h3>
                    <span className="experience-company">{experience.company}</span>
                  </div>
                  <div className="experience-details">
                    <span className="experience-date">
                      {new Date(experience.start_date).toLocaleDateString()} - 
                      {experience.end_date ? new Date(experience.end_date).toLocaleDateString() : 'Present'}
                    </span>
                    <span className="experience-location">{experience.location}</span>
                    <span className="experience-type">{experience.type}</span>
                  </div>
                  <div className="experience-actions">
                    <button 
                      onClick={() => handleEdit(experience)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => experience.id && handleDelete(experience.id)}
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
        <form onSubmit={handleSubmit} className="experience-form">
          <div className="form-group">
            <label htmlFor="title">Title/Position</label>
            <input
              type="text"
              id="title"
              name="title"
              value={selectedExperience?.title || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="company">Company/Institution</label>
            <input
              type="text"
              id="company"
              name="company"
              value={selectedExperience?.company || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={selectedExperience?.location || ''}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              name="type"
              value={selectedExperience?.type || 'professional'}
              onChange={handleInputChange}
              required
            >
              <option value="professional">Professional</option>
              <option value="education">Education</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="start_date">Start Date</label>
            <input
              type="date"
              id="start_date"
              name="start_date"
              value={selectedExperience?.start_date || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="form-group">
            <div className="current-position-checkbox">
              <input
                type="checkbox"
                id="current_position"
                checked={selectedExperience?.end_date === null}
                onChange={handleCurrentPositionChange}
              />
              <label htmlFor="current_position">Current Position</label>
            </div>
          </div>
          
          {selectedExperience?.end_date !== null && (
            <div className="form-group">
              <label htmlFor="end_date">End Date</label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={selectedExperience?.end_date || ''}
                onChange={handleInputChange}
              />
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={selectedExperience?.description || ''}
              onChange={handleInputChange}
              rows={5}
            />
          </div>
          
          <div className="form-actions">
            <button 
              type="submit" 
              className="save-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Experience'}
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

export default ExperienceManager;