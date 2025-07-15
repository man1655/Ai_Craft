import express from 'express';
import {
  generateInterviewQuestions,
  generateConceptExplanation
} from '../controllers/aiController.js';

const router = express.Router();

router.post('/generate-interview-questions', generateInterviewQuestions);
router.post('/generate-explanation', generateConceptExplanation);

export default router;
