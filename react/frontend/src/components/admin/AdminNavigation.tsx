import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminNavigation: React.FC = () => {
  const navItems = [
    { id: 'about', label: 'About Me', path: '/admin/about' },
    { id: 'projects', label: 'Projects', path: '/admin/projects' },
    { id: 'experience', label: 'Experience', path: '/admin/experience' },
    { id: 'contact', label: 'Contact', path: '/admin/contact' }
  ];

  return (
    <div className="admin-navigation">
      <ul>
        {navItems.map(item => (
          <li key={item.id}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => isActive ? 'active' : ''}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};


export default AdminNavigation;