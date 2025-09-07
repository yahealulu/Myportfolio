import React, { useState, useEffect } from 'react';

interface AboutManagerProps {
  token: string;
}

interface AboutData {
  id?: number;
  name: string;
  skills: string[];
  passion: string;
  cv_file_path: string | null;
}

const AboutManager: React.FC<AboutManagerProps> = ({ token }) => {
  const [aboutData, setAboutData] = useState<AboutData>({
    name: '',
    skills: [],
    passion: '',
    cv_file_path: null
  });
  const [newSkill, setNewSkill] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch about data
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/about');
        if (response.ok) {
          const data = await response.json();
          setAboutData(data);
        }
      } catch (error) {
        console.error('Error fetching about data:', error);
      }
    };

    fetchAboutData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutData(prev => ({ ...prev, [name]: value }));
  };

  // Add a new skill
  const handleAddSkill = () => {
    if (newSkill.trim() && !aboutData.skills.includes(newSkill.trim())) {
      setAboutData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  // Remove a skill
  const handleRemoveSkill = (skillToRemove: string) => {
    setAboutData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  // Handle CV file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  // Upload CV file
  const handleCvUpload = async () => {
    if (!cvFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', cvFile);

    try {
      const response = await fetch('http://localhost:5000/api/upload/cv', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setAboutData(prev => ({ ...prev, cv_file_path: data.filePath }));
        setMessage({ text: 'CV uploaded successfully', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to upload CV', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error uploading CV', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Delete CV file
  const handleDeleteCv = async () => {
    if (!aboutData.cv_file_path) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/about/cv', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setAboutData(prev => ({ ...prev, cv_file_path: null }));
        setMessage({ text: 'CV deleted successfully', type: 'success' });
      } else {
        const data = await response.json();
        setMessage({ text: data.message || 'Failed to delete CV', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error deleting CV', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  // Save about data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(aboutData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'About information updated successfully', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to update about information', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error updating about information', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="about-manager">
      <h2>Manage About Information</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={aboutData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Skills</label>
          <div className="skills-container">
            {aboutData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button 
                  type="button" 
                  onClick={() => handleRemoveSkill(skill)}
                  className="remove-skill"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          
          <div className="add-skill-container">
            <input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              placeholder="Add a skill"
            />
            <button 
              type="button" 
              onClick={handleAddSkill}
              className="add-skill-btn"
            >
              Add
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="passion">Passion/Bio</label>
          <textarea
            id="passion"
            name="passion"
            value={aboutData.passion}
            onChange={handleInputChange}
            rows={5}
          />
        </div>
        
        <div className="form-group">
          <label>CV/Resume</label>
          {aboutData.cv_file_path ? (
            <div className="cv-container">
              <a 
                href={`http://localhost:5000${aboutData.cv_file_path}`} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                View Current CV
              </a>
              <button 
                type="button" 
                onClick={handleDeleteCv}
                className="delete-cv-btn"
                disabled={isLoading}
              >
                Delete CV
              </button>
            </div>
          ) : (
            <div className="cv-upload">
              <input 
                type="file" 
                accept=".pdf,.doc,.docx" 
                onChange={handleFileChange} 
              />
              <button 
                type="button" 
                onClick={handleCvUpload}
                disabled={!cvFile || isLoading}
              >
                Upload CV
              </button>
            </div>
          )}
        </div>
        
        <button 
          type="submit" 
          className="save-btn"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default AboutManager;