// Backend Initialization Script

const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const mysql = require('mysql2/promise');
require('dotenv').config();

// Create upload directories
const createUploadDirectories = () => {
  const dirs = ['uploads', 'uploads/cv', 'uploads/projects'];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', 'backend', dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  });
};

// Initialize database
const initializeDatabase = async () => {
  try {
    // Read SQL file
    const sqlScript = fs.readFileSync(path.join(__dirname, 'db-init.sql'), 'utf8');
    
    // Connect to MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      multipleStatements: true
    });
    
    // Execute SQL script
    await connection.query(sqlScript);
    console.log('Database initialized successfully');
    
    // Close connection
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
};

// Main function
const init = async () => {
  console.log('Starting backend initialization...');
  
  // Create upload directories
  createUploadDirectories();
  
  // Initialize database
  await initializeDatabase();
  
  console.log('Backend initialization completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Start the backend server: npm start');
  console.log('2. Access the admin dashboard at: http://localhost:5173/admin');
  console.log('3. Login with: admin@example.com / admin123');
};

// Run initialization
init();