import express from 'express';
import Email from '../models/Email.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Initialize Gemini
let model;
try {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
} catch (e) {
  console.error('Failed to initialize Gemini model:', e);
}

// Optional position-based guidance
const POSITION_TEMPLATES = {
  'Software Engineer': 'Highlight technical skills, hands-on experience with software development, knowledge of relevant programming languages, and problem-solving abilities.',
  'Marketing Manager': 'Focus on campaign management, leadership, ROI-driven strategies, communication skills, and success metrics.',
  'Data Analyst': 'Emphasize proficiency in SQL, Excel, BI tools, statistical analysis, data interpretation, and clear reporting.',
  'Graphic Designer': 'Showcase creativity, branding, visual communication, experience with Adobe tools, and a strong design portfolio.',
  'Project Manager': 'Demonstrate leadership, planning, cross-functional collaboration, Agile or Scrum experience, and on-time delivery of projects.'
};

// ========== EMAIL GENERATION ========== //
router.post('/generate', async (req, res) => {
  const { recipient, subject, applicationType, position, jobDescription } = req.body;

  const positionNote = POSITION_TEMPLATES[position] || '';

  const prompt = `
You are an expert career assistant helping a candidate draft a highly professional and concise email.

Write a complete, polished **${applicationType}** email addressed to "${recipient}" for the **${position}** position. 

The email should include:
- A polite and direct greeting
- A strong opening that references the purpose of the email
- Content that reflects the job role and applicant's enthusiasm or intent
- Incorporation of details from this job description: "${jobDescription || 'N/A'}"
- Emphasis on the following for the role: ${positionNote}
- A professional and polite closing (e.g., "Sincerely", "Best regards")

Keep the tone **professional**, **engaging**, and **tailored** to the role. Format the response like a real email.

Do not include explanations or preambles—just return the full email text.
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const response = await result.response;
    const content = response.text();

    const email = new Email({
      recipient,
      subject,
      applicationType,
      position,
      jobDescription,
      content
    });

    await email.save();
    res.json({ email });
  } catch (err) {
    console.error('Gemini error:', err.message);
    res.status(500).send('Error generating email');
  }
});

// ========== JOB DESCRIPTION GENERATION ========== //
router.post('/job-description/generate', async (req, res) => {
  const { position, company = 'your company' } = req.body;

  if (!position) {
    return res.status(400).json({ error: 'Position is required' });
  }

  const positionHint = POSITION_TEMPLATES[position] || '';

  const prompt = `
You are helping a job seeker write a brief and professional paragraph that describes their interest in a **${position}** role at **${company}**.

The paragraph should:
- Highlight what excites the applicant about the company or role
- Mention key aspects of the position
- Reflect the applicant's enthusiasm and alignment with the job
- Be professional and conversational in tone
- Be suitable for including in a job application email

${positionHint ? `Here is guidance on what the role involves: ${positionHint}` : ''}

Only return the paragraph (no titles, no bullet points, no preambles).
`;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }]
    });

    const response = await result.response;
    const description = response.text();

    res.json({ description: description.trim() });
  } catch (err) {
    console.error('Error generating user-style job description:', err.message);
    res.status(500).json({ error: 'Failed to generate description' });
  }
});



export default router;
