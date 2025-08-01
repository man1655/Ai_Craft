import express from 'express';
import {
  createSession,
  getAllSessions,
  getSessionById,
  deleteSession
} from '../controllers/sessionController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

// Routes
router.post('/create',userAuth, createSession);
router.get('/my-sessions',userAuth, getAllSessions);
router.get('/:id',userAuth, getSessionById);
router.delete('/deletesession/:id',userAuth, deleteSession);

export default router;
