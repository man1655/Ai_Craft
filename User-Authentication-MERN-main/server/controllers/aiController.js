import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { questionAnswerPrompt, conceptExplainPrompt } from '../utils/promts.js';  // fix typo here

dotenv.config();

function extractJSON(text) {
  const jsonMatch = text.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in AI response');
  }
  return jsonMatch[0].trim();
}

let model;
try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} catch (e) {
  console.error('Failed to initialize Gemini model:', e);
}

export const generateInterviewQuestions = async (req, res) => {
  try {
    if (!model) throw new Error('Gemini model not initialized');

    const { role, experience, topicsToFocus, numberOfQuestions = 5 } = req.body;
    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const result = await model.generateContent([prompt]);
    const rawText = await result.response.text();
    const jsonText = extractJSON(rawText);
    const parsed = JSON.parse(jsonText);

    res.status(200).json({ questions: parsed });
  } catch (err) {
    console.error('generateInterviewQuestions error:', err.message);
    res.status(500).json({
      message: 'Failed to generate interview questions',
      error: err.message,
    });
  }
};

export const generateConceptExplanation = async (req, res) => {
  try {
    if (!model) throw new Error('Gemini model not initialized');

    const { question } = req.body;
    if (!question) return res.status(400).json({ message: 'Question is required' });

    const prompt = conceptExplainPrompt(question);
    const result = await model.generateContent([prompt]);
    const rawText = await result.response.text();

    const jsonText = extractJSON(rawText);
    const parsed = JSON.parse(jsonText);

    res.status(200).json(parsed);
  } catch (err) {
    console.error('generateConceptExplanation error:', err.message);
    res.status(500).json({
      message: 'Failed to generate explanation',
      error: err.message,
    });
  }
};
