import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

let model;

try {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('Missing GEMINI_API_KEY in environment variables');
  }
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} catch (e) {
  console.error('❌ Failed to initialize Gemini model:', e);
  throw e; // Re-throw to prevent further execution
}

function cleanAndParseJSON(text) {
  try {
    // Remove all markdown code blocks if present
    let cleaned = text.replace(/```(?:json)?/g, '').trim();
    
    // Handle cases where Gemini adds extra text before/after JSON
    const jsonStart = cleaned.indexOf('{');
    const jsonEnd = cleaned.lastIndexOf('}') + 1;
    
    if (jsonStart >= 0 && jsonEnd > 0) {
      cleaned = cleaned.substring(jsonStart, jsonEnd);
    }
    
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse JSON:', e);
    console.error('Original text:', text);
    throw new Error('Invalid JSON response from Gemini');
  }
}

export async function generateMCQs(topic, count = 10) {
  if (!model) {
    throw new Error('Gemini model not initialized');
  }

  const prompt = `
Generate ${count} multiple-choice questions about "${topic}".
Format your response as STRICT JSON with this structure:
{
  "questions": [
    {
      "id": "q1",
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"]
    }
  ],
  "answers": {
    "q1": 0 // Index of correct option (0-3)
  }
}

IMPORTANT:
- Only return valid JSON
- Do not include any markdown formatting
- Do not add any explanatory text
- Ensure all property names are double-quoted
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw Gemini response:', text); // For debugging
    
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error generating MCQs:', error);
    throw new Error(`MCQ generation failed: ${error.message}`);
  }
}

export async function explainWrong(wrongQuestions) {
  if (!model) {
    throw new Error('Gemini model not initialized');
  }

  if (!wrongQuestions?.length) return [];

  const prompt = `
Explain why the user's answers are incorrect for these questions.
Return ONLY raw JSON in this format:
[
  {
    "id": "q1",
    "explanation": "Explanation text here",
    "correctAnswer": 2 // Index of correct option
  }
]

Questions:
${JSON.stringify(wrongQuestions, null, 2)}

IMPORTANT:
- Do not include any markdown formatting
- Do not add any text outside the JSON structure
- Ensure all property names are double-quoted
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('Raw explanation response:', text);
    
    return cleanAndParseJSON(text);
  } catch (error) {
    console.error('Error generating explanations:', error);
    return wrongQuestions.map(q => ({
      id: q.id,
      explanation: `Failed to generate explanation: ${error.message}`,
      correctAnswer: q.correctAnswer
    }));
  }
}