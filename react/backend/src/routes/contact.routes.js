import express from 'express';
import { sendContactEmail, getContactInfo, updateContactInfo } from '../controllers/contact.controller.js';
import { verifyToken, isAdmin } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes
router.post('/', sendContactEmail);
router.get('/', getContactInfo);

// Protected routes (admin only)
router.put('/', verifyToken, isAdmin, updateContactInfo);

export default router;