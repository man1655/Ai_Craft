import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

let model;

try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} catch (e) {
  console.error('Failed to initialize Gemini model:', e);
}

export async function generateRoadmap(skills, role) {
  if (!model) {
    console.error('Gemini model not initialized.');
    return null;
  }

  if (!skills || skills.length === 0) {
    return {
      roadmap_title: `No skills provided for ${role}`,
      skills: {},
      overall_learning_path: [],
      general_tips: []
    };
  }

  const prompt = `
You are an expert AI career coach.

The candidate is pursuing the role: "${role}".
They currently lack these skills: ${skills.join(', ')}.

Please create a detailed beginner-friendly learning roadmap. For each skill, include:
- Prerequisites,
- Estimated days to become proficient,
- A multi-phase learning plan,
- Beginner-friendly resources (title + URL),
- Real-world project ideas,
- Tips for learning effectively,
- Common mistakes to avoid.

Then provide:
- A recommended overall learning path (steps),
- General advice for skill mastery.

Return ONLY a JSON object like this:

{
  "roadmap_title": "Career Roadmap for ${role}",
  "skills": {
    "Skill Name": {
      "estimated_days": 15,
      "learning_plan": "...",
      "tips": ["Tip 1", "Tip 2"],
      "resources": [
        { "title": "Resource 1", "url": "https://..." }
      ],
      "project_ideas": ["Project 1", "Project 2"],
      "common_mistakes": ["Mistake 1", "Mistake 2"]
    }
  },
  "overall_learning_path": ["Step 1", "Step 2"],
  "general_tips": ["Tip A", "Tip B"]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const jsonMatch = text.match(/```json([\s\S]*?)```/);
    const cleanText = jsonMatch ? jsonMatch[1].trim() : text;

    return JSON.parse(cleanText);
  } catch (err) {
    console.error('Gemini generation error:', err);
    return null;
  }
}
