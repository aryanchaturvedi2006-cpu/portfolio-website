import express from 'express';
import { downloadPdfResume, downloadDocxResume } from '../controllers/resumeController.js';

const router = express.Router();

router.get('/pdf', downloadPdfResume);
router.get('/docx', downloadDocxResume);

export default router;
