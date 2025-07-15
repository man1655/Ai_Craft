import express from 'express';
import {
  addQuestionsToSession,
  togglePinQuestion,
  updateQuestionNote,
} from '../controllers/questionController.js';

const router = express.Router();

// Add new questions to a session
router.post('/add', addQuestionsToSession);

// Toggle pinned status of a question
router.patch('/:id/pin', togglePinQuestion);

// Update note of a question
router.patch('/:id/note', updateQuestionNote);

export default router;
