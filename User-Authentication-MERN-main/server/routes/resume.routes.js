import { Router } from "express";
import {
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
} from "../controllers/resume.controller.js";

const router = Router();

// Route to create a new resume
router.post("/createResume", createResume);

// Route to get all resumes
router.get("/getAllResume", getALLResume);

// Route to get a single resume by ID
router.get("/getResume", getResume);

// Route to update an existing resume
router.put("/updateResume", updateResume);

// Route to delete a resume
router.delete("/removeResume", removeResume);

export default router;
