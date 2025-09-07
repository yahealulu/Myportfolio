import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';
import AdminNavigation from './AdminNavigation';
import AboutManager from './AboutManager';
import ProjectsManager from './ProjectsManager';
import ExperienceManager from './ExperienceManager';
import ContactManager from './ContactManager';
import './AdminStyles.css';

const AdminDashboard: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');

  const handleLogin = (authToken: string) => {
    setToken(authToken);
    setIsLoggedIn(true);
    localStorage.setItem('portfolio_admin_token', authToken);
  };

  const handleLogout = () => {
    setToken('');
    setIsLoggedIn(false);
    localStorage.removeItem('portfolio_admin_token');
  };

  // Check for existing token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('portfolio_admin_token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  if (!isLoggedIn) {
    return <AdminLogin onLogin={handleLogin} />;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Portfolio Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="admin-content">
        <AdminNavigation />
        <div className="admin-section-content">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/about" replace />} />
            <Route path="/about" element={<AboutManager token={token} />} />
            <Route path="/projects" element={<ProjectsManager token={token} />} />
            <Route path="/experience" element={<ExperienceManager token={token} />} />
            <Route path="/contact" element={<ContactManager token={token} />} />
            <Route path="*" element={<Navigate to="/admin/about" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );

};

export default AdminDashboard;