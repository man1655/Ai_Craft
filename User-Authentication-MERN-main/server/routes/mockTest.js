import express from 'express';
import { generateMCQs, explainWrong } from '../gemini.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const tests = new Map(); // memory store for test sessions

router.post('/', async (req, res) => {
  const { topic } = req.body;
  if (!topic) return res.status(400).json({ error: 'Topic is required' });

  try {
    const { questions, answers } = await generateMCQs(topic, 10);
    const testId = uuidv4();
    tests.set(testId, { questions, answers });

    const visibleQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      options: q.options
    }));

    res.json({ testId, questions: visibleQuestions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:testId/submit', async (req, res) => {
  const { testId } = req.params;
  const { answers: userAnswers } = req.body;

  const test = tests.get(testId);
  if (!test) return res.status(404).json({ error: 'Test not found' });

  const results = [];
  const wrong = [];

  for (const q of test.questions) {
    const correctIndex = test.answers[q.id];
    const userIndex = userAnswers[q.id];

    const isCorrect = userIndex === correctIndex;
    results.push({ id: q.id, correct: isCorrect });

    if (!isCorrect) {
      wrong.push({
        id: q.id,
        question: q.question,
        options: q.options,
        userAnswer: userIndex,
        correctAnswer: correctIndex
      });
    }
  }

  const explanations = await explainWrong(wrong);

  res.json({
    score: results.filter(r => r.correct).length,
    total: results.length,
    results,
    explanations
  });
});

export default router;
