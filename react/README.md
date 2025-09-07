# Full-Stack Portfolio Application

This project is a full-stack portfolio application with a React frontend and Express.js/PostgreSQL backend. The backend includes an admin dashboard for managing portfolio content.

## Project Structure

```
portfolio/
├── frontend/            # React frontend application
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── backend/             # Express.js backend
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

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database

### Step 1: Move Current React App to Frontend Directory

1. Copy all files from the root directory to the `frontend` directory
2. Update any necessary paths in the frontend code

### Step 2: Set Up Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Initialize a new Node.js project:
   ```
   npm init -y
   ```

3. Install required dependencies:
   ```
   npm install express pg pg-hstore sequelize cors dotenv bcrypt jsonwebtoken multer
   npm install --save-dev nodemon
   ```

4. Create the backend directory structure:
   ```
   mkdir -p src/controllers src/models src/routes src/middleware src/utils src/config
   ```

5. Create a `.env` file in the backend directory with your PostgreSQL connection details:
   ```
   DB_HOST=localhost
   DB_USER=your_username
   DB_PASS=your_password
   DB_NAME=portfolio
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

6. Create the database in PostgreSQL:
   ```sql
   CREATE DATABASE portfolio;
   ```

### Step 3: Set Up Database Models and Migrations

Follow the database schema outlined in the implementation plan to create your models and migrations.

### Step 4: Implement API Endpoints

Implement the API endpoints as described in the implementation plan.

### Step 5: Create Admin Dashboard

Implement the admin dashboard in the frontend to manage portfolio content.

## Running the Application

### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. The frontend will be available at http://localhost:5173

### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Start the development server:
   ```
   npm run dev
   ```

3. The backend API will be available at http://localhost:5000

## Backend Implementation Details

### Database Schema

- **users**: Admin user accounts for the dashboard
- **about**: Personal information displayed in the About section
- **projects**: Portfolio projects with details and links
- **project_images**: Images associated with projects
- **experience**: Professional and educational experience
- **contact**: Contact information

### API Endpoints

- Authentication: `/api/auth/login`, `/api/auth/logout`
- About: `/api/about`
- Projects: `/api/projects`
- Experience: `/api/experience`
- Contact: `/api/contact`

## Admin Dashboard

The admin dashboard allows you to:

- Manage personal information
- Add, edit, and delete projects
- Manage professional and educational experience
- Update contact information
- Upload images and files

## Next Steps

Follow the implementation plan to complete the full-stack application setup.