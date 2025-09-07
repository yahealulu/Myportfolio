import express from 'express';
import { getAboutInfo, updateAboutInfo, deleteCV } from '../controllers/about.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.get('/', getAboutInfo);

// Protected routes (admin only)
router.put('/', verifyToken, isAdmin, updateAboutInfo);
router.delete('/cv', verifyToken, isAdmin, deleteCV);

export default router;