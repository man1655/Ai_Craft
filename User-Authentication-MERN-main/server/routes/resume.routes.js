import { Router } from "express";
import {
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
} from "../controllers/resume.controller.js";
import userAuth from "../middlewares/userAuth.js";

const router = Router();

// Route to create a new resume
router.post("/createResume",userAuth,createResume);

// Route to get all resumes
router.get("/getAllResume",userAuth, getALLResume);

// Route to get a single resume by ID
router.get("/getResume", getResume);

// Route to update an existing resume
router.put("/updateResume",userAuth, updateResume);

// Route to delete a resume
router.delete("/removeResume",userAuth, removeResume);

export default router;
