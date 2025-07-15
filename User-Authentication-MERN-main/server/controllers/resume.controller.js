import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Resume from "../models/resume.model.js";

// Start Route
const start = async (req, res) => {
  return res.status(200).json(new ApiResponse(200, null, "Welcome to Resume Builder API"));
};

// Create Resume
const createResume = async (req, res) => {
  const { title, themeColor } = req.body;

  // Validate that the title and themeColor are provided
  if (!title || !themeColor) {
    return res
      .status(400)
      .json(new ApiError(400, "Title and themeColor are required."));
  }

  try {
    // Check if user is provided in the request (if you're using authentication)
    const user = req.user ? req.user._id : null;  // If req.user is undefined, set it to null

    // Create a new resume
    const resume = await Resume.create({
      title,
      themeColor,
      user,  // If no user, it will be null (or no user is set)
      firstName: "",
      lastName: "",
      email: "",
      summary: "",
      jobTitle: "",
      phone: "",
      address: "",
      experience: [],
      education: [],
      skills: [],
      projects: [],
    });

    return res
      .status(201)
      .json(new ApiResponse(201, { resume }, "Resume created successfully"));
  } catch (error) {
    console.error("Error creating resume:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error", [error.message], error.stack)
      );
  }
};



// Get All Resumes
const getALLResume = async (req, res) => {
  try {
    // Get all resumes without checking for user authentication
    const resumes = await Resume.find({});
    return res
      .status(200)
      .json(new ApiResponse(200, resumes, "Resumes fetched successfully"));
  } catch (error) {
    console.error("Error fetching resumes:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Get Single Resume
const getResume = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json(new ApiError(400, "Resume ID is required."));
    }

    // Find the resume by ID
    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json(new ApiError(404, "Resume not found."));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, resume, "Resume fetched successfully"));
  } catch (error) {
    console.error("Error fetching resume:", error);
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", [], error.stack));
  }
};

// Update Resume
const updateResume = async (req, res) => {
  console.log("Resume update request received:");
  const id = req.query.id;

  try {
    // Find and update the resume with the provided ID
    console.log("Database update request started");
    const updatedResume = await Resume.findOneAndUpdate(
      { _id: id },
      { $set: req.body, $currentDate: { updatedAt: true } }, // Set updatedAt to current date
      { new: true } // Return the modified document
    );

    if (!updatedResume) {
      console.log("Resume not found");
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Resume not found"));
    }

    console.log("Resume updated successfully:");

    return res
      .status(200)
      .json(new ApiResponse(200, updatedResume, "Resume updated successfully"));
  } catch (error) {
    console.error("Error updating resume:", error);
    return res
      .status(500)
      .json(
        new ApiError(500, "Internal Server Error", [error.message], error.stack)
      );
  }
};

// Remove Resume
const removeResume = async (req, res) => {
  const id = req.query.id;

  try {
    // Check if the resume exists
    const resume = await Resume.findByIdAndDelete(id);

    if (!resume) {
      return res
        .status(404)
        .json(new ApiResponse(404, null, "Resume not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, null, "Resume deleted successfully"));
  } catch (error) {
    console.error("Error while deleting resume:", error);
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Internal Server Error"));
  }
};

export {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
};
