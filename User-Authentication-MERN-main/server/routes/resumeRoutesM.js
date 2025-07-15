import express from 'express';
import multer from 'multer';
import { analyzeResume, uploadResume } from '../controllers/resumeControllerM.js';

const upload = multer({ dest: 'uploads/' });
const router = express.Router();

router.post('/analyze', analyzeResume);
router.post('/upload', upload.single('resume'), uploadResume);

export default router;
