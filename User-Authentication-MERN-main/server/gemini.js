import dotenv from 'dotenv';
dotenv.config();

import { GoogleGenerativeAI } from '@google/generative-ai';

let model;

try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} catch (e) {
  console.error('❌ Failed to initialize Gemini model:', e);
}

function cleanJSON(text) {
  return text.replace(/```(?:json)?/g, '').trim();
}

export async function generateMCQs(topic, count = 10) {
  const prompt = `
Generate ${count} MCQs on the topic "${topic}". Each question should:
- Have an ID like "q1"
- Have 4 options
- Only one correct answer
- Return strictly valid JSON like:
{
  "questions": [
    {
      "id": "q1",
      "question": "What is ...?",
      "options": ["Option A", "Option B", "Option C", "Option D"]
    }
  ],
  "answers": {
    "q1": 2
  }
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = cleanJSON(response.text());
    return JSON.parse(text);
  } catch (error) {
    console.error('Error generating MCQs:', error);
    throw new Error('Gemini MCQ generation failed.');
  }
}

export async function explainWrong(wrongQuestions) {
  if (!wrongQuestions.length) return [];

  const prompt = `
Given these incorrect answers, explain why each user answer is incorrect and what the correct one is.
Respond ONLY in raw JSON. Do NOT wrap with markdown.

Input:
[
  {
    "id": "q1",
    "question": "What is a closure?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "userAnswer": 0,
    "correctAnswer": 2
  },
  ...
]

Output:
[
  {
    "id": "q1",
    "explanation": "Option A is incorrect because... The correct answer is Option C."
  }
]

Questions:
${JSON.stringify(wrongQuestions, null, 2)}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    // 🧠 Print Gemini's full response
    console.log("🧠 Gemini explanation raw output:\n", text);

    // ✅ Strip any markdown code fences like ```json or ```
    if (text.startsWith('```')) {
      text = text.replace(/```(?:json)?/g, '').replace(/```/g, '').trim();
    }

    // 🛠 Try parsing it
    const parsed = JSON.parse(text);

    // ✅ Log parsed data
    console.log("✅ Parsed explanations:", parsed);

    return parsed;
  } catch (error) {
    console.error('❌ Error generating explanations:', error.message);
    return [{
      id: 'error',
      explanation: 'Could not fetch explanations. Error parsing Gemini response.'
    }];
  }
}
