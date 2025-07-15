import Question from '../models/Question.js';
import Session from '../models/session.js';

// Add new questions to an existing session
export const addQuestionsToSession = async (req, res) => {
  try {
    const { sessionId, questions } = req.body;

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    const questionDocs = await Promise.all(
      questions.map(async (q) => {
        const question = new Question({
          session: sessionId,
          question: q.question,
          answer: q.answer,
          note: q.note || ''
        });
        await question.save();
        return question._id;
      })
    );

    session.questions.push(...questionDocs);
    await session.save();

    res.status(201).json({ message: 'Questions added successfully', questions: questionDocs });
  } catch (err) {
    res.status(500).json({ message: 'Error adding questions', error: err.message });
  }
};

// Toggle pinned field on a question
export const togglePinQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.pinned = !question.pinned;
    await question.save();

    res.json({ message: 'Pinned status updated', pinned: question.pinned });
  } catch (err) {
    res.status(500).json({ message: 'Error toggling pinned status', error: err.message });
  }
};

// Update note field of a question
export const updateQuestionNote = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { note } = req.body;

    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    question.note = note;
    await question.save();

    res.json({ message: 'Note updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating note', error: err.message });
  }
};
