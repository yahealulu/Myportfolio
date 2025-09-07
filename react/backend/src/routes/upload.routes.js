import express from 'express';
import path from 'path';
import { uploadProjectImage, uploadCV, handleUploadErrors } from '../middleware/upload.middleware.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Upload project image
router.post('/project-image', verifyToken, isAdmin, (req, res) => {
  uploadProjectImage(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload an image file' });
    }
    
    // Return the file path to be stored in the database
    const filePath = `/uploads/projects/${path.basename(req.file.path)}`;
    res.status(200).json({
      message: 'Image uploaded successfully',
      filePath
    });
  });
});

// Upload CV file
router.post('/cv', verifyToken, isAdmin, (req, res) => {
  uploadCV(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: `Upload error: ${err.message}` });
    }
    
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a PDF file' });
    }
    
    // Return the file path to be stored in the database
    const filePath = `/uploads/cv/${path.basename(req.file.path)}`;
    res.status(200).json({
      message: 'CV uploaded successfully',
      filePath
    });
  });
});

export default router;