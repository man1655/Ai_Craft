import Session from '../models/session.js';
import Question from '../models/Question.js';

// Create a new session with optional questions
export const createSession = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;

    const session = new Session({
      role,
      experience,
      topicsToFocus,
      description,
    });

    await session.save();

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = new Question({
          session: session._id,
          question: q.question,
          answer: q.answer,
          note: q.note || '',
        });
        await question.save();
        return question._id;
      })
    );

    session.questions = questionDocs;
    await session.save();

    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error creating session', error: err.message });
  }
};

// Get all sessions with populated questions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate('questions');
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sessions', error: err.message });
  }
};

// Get a session by ID
export const getSessionById = async (req, res) => {
  try {
    const sessionId = req.params.id;

    const session = await Session.findById(sessionId).populate('questions');

    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json(session);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching session', error: err.message });
  }
};

// Delete a session by ID
export const deleteSession = async (req, res) => {
  try {
    const sessionId = req.params.id;

    const deletedSession = await Session.findByIdAndDelete(sessionId);

    if (!deletedSession) {
      return res.status(404).json({ message: 'Session not found' });
    }

    res.json({ message: 'Session deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting session', error: err.message });
  }
};
