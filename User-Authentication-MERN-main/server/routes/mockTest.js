import express from 'express';
import { generateMCQs, explainWrong } from '../gemini.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();
const tests = new Map(); // In-memory store for test sessions

// Helper function to validate user answers
const validateAnswers = (questions, userAnswers) => {
  const validated = {};
  for (const q of questions) {
    const answer = userAnswers[q.id];
    validated[q.id] = typeof answer === 'number' && answer >= 0 && answer <= 3 ? answer : null;
  }
  return validated;
};

router.post('/', async (req, res) => {
  const { topic } = req.body;
  
  if (!topic || typeof topic !== 'string') {
    return res.status(400).json({ 
      error: 'Valid topic (string) is required',
      example: { topic: 'JavaScript closures' }
    });
  }

  try {
    const { questions, answers } = await generateMCQs(topic.trim(), 10);
    const testId = uuidv4();
    
    tests.set(testId, { 
      questions, 
      answers,
      createdAt: new Date() 
    });

    // Clean response - don't send answers to client
    const visibleQuestions = questions.map(({ id, question, options }) => ({
      id,
      question,
      options
    }));

    res.json({ 
      success: true,
      testId, 
      questions: visibleQuestions,
      count: visibleQuestions.length
    });

  } catch (error) {
    console.error('MCQ generation error:', error);
    res.status(500).json({ 
      error: 'Failed to generate test',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

router.post('/:testId/submit', async (req, res) => {
  const { testId } = req.params;
  const { answers: rawUserAnswers } = req.body;

  if (!rawUserAnswers || typeof rawUserAnswers !== 'object') {
    return res.status(400).json({ 
      error: 'Answers object is required',
      example: { answers: { q1: 0, q2: 2 } }
    });
  }

  const test = tests.get(testId);
  if (!test) {
    return res.status(404).json({ 
      error: 'Test not found or expired',
      solution: 'Create a new test session'
    });
  }

  try {
    const userAnswers = validateAnswers(test.questions, rawUserAnswers);
    const results = [];
    const wrongAnswers = [];

    // Evaluate answers
    test.questions.forEach(q => {
      const correctIndex = test.answers[q.id];
      const userIndex = userAnswers[q.id];
      const isCorrect = userIndex === correctIndex;
      
      results.push({ 
        id: q.id,
        correct: isCorrect,
        userAnswer: userIndex,
        correctAnswer: correctIndex
      });

      if (!isCorrect) {
        wrongAnswers.push({
          id: q.id,
          question: q.question,
          options: q.options,
          userAnswer: userIndex,
          correctAnswer: correctIndex
        });
      }
    });

    // Get explanations for wrong answers
    const explanations = wrongAnswers.length > 0 
      ? await explainWrong(wrongAnswers) 
      : [];

    // Clean up old tests (optional)
    const now = new Date();
    const oneHourAgo = new Date(now - 3600000);
    tests.forEach((test, id) => {
      if (test.createdAt < oneHourAgo) tests.delete(id);
    });

    res.json({
      success: true,
      score: results.filter(r => r.correct).length,
      total: results.length,
      percentage: Math.round((results.filter(r => r.correct).length / results.length) * 100),
      results,
      explanations
    });

  } catch (error) {
    console.error('Test submission error:', error);
    res.status(500).json({ 
      error: 'Failed to process test results',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;