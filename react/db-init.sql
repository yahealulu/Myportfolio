-- Portfolio Database Initialization Script

-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS portfolio;
USE portfolio;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create about table
CREATE TABLE IF NOT EXISTS about (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  passion TEXT,
  cv_file_path VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create skills table
CREATE TABLE IF NOT EXISTS skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  about_id INT,
  FOREIGN KEY (about_id) REFERENCES about(id) ON DELETE CASCADE
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  framework ENUM('react', 'nextjs') DEFAULT 'react',
  github_url VARCHAR(255),
  demo_url VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create project_features table
CREATE TABLE IF NOT EXISTS project_features (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  feature TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create project_technologies table
CREATE TABLE IF NOT EXISTS project_technologies (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  technology VARCHAR(100) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create project_images table
CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  image_path VARCHAR(255) NOT NULL,
  display_order INT DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Create experience table
CREATE TABLE IF NOT EXISTS experience (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  type ENUM('professional', 'education') DEFAULT 'professional',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create contact table
CREATE TABLE IF NOT EXISTS contact (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255),
  phone VARCHAR(50),
  linkedin VARCHAR(255),
  github VARCHAR(255),
  twitter VARCHAR(255),
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin user
-- Note: In production, use a properly hashed password
INSERT INTO users (username, email, password) VALUES ('admin', 'admin@example.com', '$2b$10$mLZGHJt6X9t4YrcEHci1FeXMxgZHlGvGcEb.hBkRKKTRVzjh0XiYy');
-- Default password is 'admin123' (hashed with bcrypt)

-- Insert default about data
INSERT INTO about (name, passion) VALUES ('Your Name', 'Your passion or bio goes here');

-- Insert default contact information
INSERT INTO contact (email, phone, linkedin, github, twitter) 
VALUES ('your.email@example.com', '+1234567890', 'https://linkedin.com/in/yourprofile', 'https://github.com/yourusername', 'https://twitter.com/yourusername');

-- Create directories for uploads if they don't exist
-- Note: This needs to be run as a separate command in your backend initialization script
-- mkdir -p ./uploads/cv ./uploads/projects