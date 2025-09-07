import express from 'express';
import { 
  getAllExperiences, 
  getExperienceById, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from '../controllers/experience.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllExperiences);
router.get('/:id', getExperienceById);

// Protected routes (admin only)
router.post('/', verifyToken, isAdmin, createExperience);
router.put('/:id', verifyToken, isAdmin, updateExperience);
router.delete('/:id', verifyToken, isAdmin, deleteExperience);

export default router;