import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import db from './config/database.js';
import { initializeDatabase } from './config/init-db.js';

// Import routes
import authRoutes from './routes/auth.routes.js';
import aboutRoutes from './routes/about.routes.js';
import projectRoutes from './routes/project.routes.js';
import experienceRoutes from './routes/experience.routes.js';
import contactRoutes from './routes/contact.routes.js';
import uploadRoutes from './routes/upload.routes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up static files directory for uploads
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use('/uploads', express.static(join(__dirname, '../uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Test database connection
db.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Sync database models
db.sync({ alter: true })
  .then(() => {
    console.log('Database synced');
    // Initialize database with default data
    initializeDatabase();
  })
  .catch(err => console.error('Error syncing database:', err));

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Portfolio API' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;