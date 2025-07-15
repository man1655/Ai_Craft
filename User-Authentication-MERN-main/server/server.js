import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";
import cookieParser from "cookie-parser";
import { execFile } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import bodyParser from "body-parser";
import mockTestRouter from "./routes/mockTest.js";

import connectDB from "./config/mongodb.js";

// Import routes
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import resumeRouter from "./routes/resume.routes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import emailRoutes from "./routes/email.js";
import { generateRoadmap } from "./routes/gemini.js"; 

// Handle __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const upload = multer({ dest: "uploads/" });

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/resumes", resumeRouter);
app.use("/api/sessions", sessionRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/email", emailRoutes);
app.use(bodyParser.json());
app.use("/api/mock-test", mockTestRouter);

// === Resume Analyzer Upload (analyzer.py) ===
const pythonPath =
  "C:\\Users\\Man Patel\\AppData\\Local\\Microsoft\\WindowsApps\\python.exe";
const analyzerPath = path.resolve(__dirname, "..", "analyzer.py");

app.post("/api/resume/upload", upload.single("resume"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const resumePath = req.file.path;
  const jobDescription = req.body.jobDescription;

  execFile(
    pythonPath,
    [analyzerPath, resumePath, jobDescription],
    (error, stdout, stderr) => {
      if (error) {
        console.error("execFile error:", error);
        return res
          .status(500)
          .json({ error: "Python script failed", details: error.message });
      }

      try {
        const result = JSON.parse(stdout);
        res.json(result);
      } catch (parseErr) {
        console.error("JSON parse error:", parseErr);
        res.status(500).json({ error: "Invalid JSON from analyzer.py" });
      }
    }
  );
});

// === Career Predictor (career_predictor.py with Gemini) ===
const predictorPath = path.resolve(__dirname, "../career_predictor.py");

app.post("/api/resume/predict", upload.single("resume"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const resumePath = req.file.path;

  execFile(
    pythonPath,
    [predictorPath, resumePath],
    async (error, stdout, stderr) => {
      if (error) {
        console.error("Python execution failed:", stderr);
        return res
          .status(500)
          .json({ error: "Python execution failed", details: stderr });
      }

      try {
        const parsed = JSON.parse(stdout);
        const { extracted_skills, career_prediction } = parsed;

        const roadmap = await generateRoadmap(
          career_prediction.missing_skills,
          career_prediction.best_fit_role
        );

        res.json({
          extracted_skills,
          career_prediction,
          roadmap_for_missing_skills: roadmap,
        });
      } catch (err) {
        console.error("Failed to parse or generate roadmap:", err);
        res
          .status(500)
          .json({ error: "Error parsing Python output or Gemini response" });
      }
    }
  );
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running at http://localhost:${port}`);
});
