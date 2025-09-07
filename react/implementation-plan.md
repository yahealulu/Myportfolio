# Portfolio Project Restructuring Plan

## Overview
This document outlines the plan to transform the current React portfolio project into a full-stack application with a React frontend and Express.js/PostgreSQL backend. The backend will include an admin dashboard for managing portfolio content.

## Project Structure

```
portfolio/
├── frontend/            # Current React application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/             # New Express.js backend
│   ├── src/
│   │   ├── controllers/ # Route handlers
│   │   ├── models/      # Database models
│   │   ├── routes/      # API routes
│   │   ├── middleware/  # Custom middleware
│   │   ├── utils/       # Helper functions
│   │   ├── config/      # Configuration files
│   │   └── app.js       # Express application
│   ├── package.json
│   └── ...
└── README.md            # Project documentation
```

## Database Schema

### Tables

1. **users**
   - id (PK)
   - username
   - password (hashed)
   - email
   - created_at
   - updated_at

2. **about**
   - id (PK)
   - name
   - skills (JSON array)
   - passion
   - cv_file_path
   - created_at
   - updated_at

3. **projects**
   - id (PK)
   - title
   - framework (react, nextjs, etc.)
   - github_url
   - demo_url
   - description
   - features (JSON array)
   - technologies (JSON array)
   - created_at
   - updated_at

4. **project_images**
   - id (PK)
   - project_id (FK)
   - image_path
   - display_order
   - created_at
   - updated_at

5. **experience**
   - id (PK)
   - title
   - company
   - location
   - start_date
   - end_date
   - description
   - type (professional, education)
   - created_at
   - updated_at

6. **contact**
   - id (PK)
   - email
   - github
   - linkedin
   - whatsapp
   - created_at
   - updated_at

## API Endpoints

### Authentication
- POST /api/auth/login
- POST /api/auth/logout

### About
- GET /api/about
- PUT /api/about (protected)
- POST /api/about/cv (protected, file upload)

### Projects
- GET /api/projects
- GET /api/projects/:id
- POST /api/projects (protected)
- PUT /api/projects/:id (protected)
- DELETE /api/projects/:id (protected)
- POST /api/projects/:id/images (protected, file upload)
- DELETE /api/projects/:id/images/:imageId (protected)

### Experience
- GET /api/experience
- POST /api/experience (protected)
- PUT /api/experience/:id (protected)
- DELETE /api/experience/:id (protected)

### Contact
- GET /api/contact
- PUT /api/contact (protected)

## Implementation Steps

### Phase 1: Project Restructuring
1. Create new directory structure
2. Move current React app to frontend directory
3. Update paths and imports in frontend code
4. Create backend directory with initial structure

### Phase 2: Backend Setup
1. Initialize Node.js project in backend directory
2. Install dependencies (Express, PostgreSQL client, etc.)
3. Set up Express application with middleware
4. Configure PostgreSQL connection
5. Create database schema

### Phase 3: API Development
1. Implement authentication system
2. Create models for database tables
3. Develop API endpoints for each resource
4. Implement file upload functionality for images and CV
5. Add validation and error handling

### Phase 4: Admin Dashboard
1. Create admin login page
2. Develop dashboard layout and navigation
3. Implement forms for managing content:
   - About information
   - Projects management
   - Experience entries
   - Contact details
4. Add image upload and preview functionality

### Phase 5: Frontend Integration
1. Update frontend to fetch data from API
2. Replace hardcoded data with API calls
3. Implement loading states and error handling
4. Update file paths for images and CV

### Phase 6: Testing and Deployment
1. Test all API endpoints
2. Test admin dashboard functionality
3. Test frontend integration
4. Prepare deployment configuration
5. Document setup and usage instructions

## Technologies

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)
- JSON Web Tokens (JWT) for authentication
- Multer for file uploads
- bcrypt for password hashing

### Admin Dashboard
- React
- React Router
- React Hook Form
- Tailwind CSS
- Axios for API requests

## Next Steps
Follow the implementation steps outlined above, starting with restructuring the project and setting up the backend infrastructure.