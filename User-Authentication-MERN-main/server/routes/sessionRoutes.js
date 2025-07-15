import express from 'express';
import {
  createSession,
  getAllSessions,
  getSessionById,
  deleteSession
} from '../controllers/sessionController.js';

const router = express.Router();

// Routes
router.post('/create', createSession);
router.get('/my-sessions', getAllSessions);
router.get('/:id', getSessionById);
router.delete('/deletesession/:id', deleteSession);

export default router;
