import About from '../models/About.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uploadsDir = path.join(__dirname, '../../uploads/cv');

// Ensure uploads directory exists
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Get about information
export const getAboutInfo = async (req, res) => {
  try {
    // Since there should only be one about record, get the first one
    const aboutInfo = await About.findOne();
    
    if (!aboutInfo) {
      return res.status(404).json({ message: 'About information not found' });
    }
    
    res.status(200).json(aboutInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create or update about information
export const updateAboutInfo = async (req, res) => {
  try {
    const { name, skills, passion, cv_file_path } = req.body;
    
    // Check if about info already exists
    const existingAbout = await About.findOne();
    
    if (existingAbout) {
      // Update existing record
      await existingAbout.update({
        name,
        skills: Array.isArray(skills) ? skills : JSON.parse(skills || '[]'),
        passion,
        cv_file_path
      });
      
      res.status(200).json({
        message: 'About information updated successfully',
        about: existingAbout
      });
    } else {
      // Create new record
      const newAbout = await About.create({
        name,
        skills: Array.isArray(skills) ? skills : JSON.parse(skills || '[]'),
        passion,
        cv_file_path
      });
      
      res.status(201).json({
        message: 'About information created successfully',
        about: newAbout
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete CV file
export const deleteCV = async (req, res) => {
  try {
    const aboutInfo = await About.findOne();
    
    if (!aboutInfo || !aboutInfo.cv_file_path) {
      return res.status(404).json({ message: 'CV file not found' });
    }
    
    // Delete file from filesystem
    const cvPath = path.join(uploadsDir, path.basename(aboutInfo.cv_file_path));
    if (fs.existsSync(cvPath)) {
      fs.unlinkSync(cvPath);
    }
    
    // Update the record to remove the file path
    await aboutInfo.update({ cv_file_path: null });
    
    res.status(200).json({ message: 'CV file deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};