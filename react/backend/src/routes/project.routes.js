import express from 'express';
import { 
  getAllProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject,
  addProjectImage,
  deleteProjectImage,
  updateProjectImageOrder
} from '../controllers/project.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (admin only)
router.post('/', verifyToken, isAdmin, createProject);
router.put('/:id', verifyToken, isAdmin, updateProject);
router.delete('/:id', verifyToken, isAdmin, deleteProject);

// Project images routes
router.post('/images', verifyToken, isAdmin, addProjectImage);
router.delete('/images/:id', verifyToken, isAdmin, deleteProjectImage);
router.put('/images/order', verifyToken, isAdmin, updateProjectImageOrder);

export default router;