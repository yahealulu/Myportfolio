import React, { useState, useEffect } from 'react';

interface ContactManagerProps {
  token: string;
}

interface ContactData {
  id?: number;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
  twitter: string;
}

const ContactManager: React.FC<ContactManagerProps> = ({ token }) => {
  const [contactData, setContactData] = useState<ContactData>({
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    twitter: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch contact data
  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/contact');
        if (response.ok) {
          const data = await response.json();
          setContactData(data);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
      }
    };

    fetchContactData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContactData(prev => ({ ...prev, [name]: value }));
  };

  // Save contact data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contactData)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Contact information updated successfully', type: 'success' });
      } else {
        setMessage({ text: data.message || 'Failed to update contact information', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Error updating contact information', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-manager">
      <h2>Manage Contact Information</h2>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={contactData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={contactData.phone}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn URL</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={contactData.linkedin}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="github">GitHub URL</label>
          <input
            type="url"
            id="github"
            name="github"
            value={contactData.github}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="twitter">Twitter URL</label>
          <input
            type="url"
            id="twitter"
            name="twitter"
            value={contactData.twitter}
            onChange={handleInputChange}
          />
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

export default ContactManager;