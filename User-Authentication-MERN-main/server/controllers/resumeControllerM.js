import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const analyzeResume = (req, res) => {
  const { resumeText, jobDescription } = req.body;

  const pythonProcess = spawn('python', [
    path.join(__dirname, '../../analyzer.py'),
    resumeText,
    jobDescription,
  ]);

  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', () => {
    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
    } catch (err) {
      res.status(500).json({ error: 'Error parsing Python output.' });
    }
  });
};

export const uploadResume = (req, res) => {
  const jobDescription = req.body.jobDescription;
  const resumePath = req.file.path;

  const pythonProcess = spawn('python', [
    path.join(__dirname, '../../analyzer.py'),
    resumePath,
    jobDescription,
  ]);

  let result = '';
  pythonProcess.stdout.on('data', (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  pythonProcess.on('close', () => {
    fs.unlinkSync(resumePath); // delete file after processing
    try {
      const parsed = JSON.parse(result);
      res.json(parsed);
    } catch (err) {
      res.status(500).json({ error: 'Failed to parse Python output.' });
    }
  });
};
