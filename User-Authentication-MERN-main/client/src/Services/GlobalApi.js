import axios from "axios";
import { API_KEY } from "@/config/config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL + "api/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

const createNewResume = async (data) => {
  try {
    const response = await axiosInstance.post("/resume-builder-collections", data);
    return response.data;
  } catch (error) {
    console.error("Error creating new resume:", error);
    throw error;  // so caller knows something went wrong
  }
};

const getResumes = async (user_email) => {
  try {
    const response = await axiosInstance.get(
      `/resume-builder-collections?filters[user_email][$eq]=${encodeURIComponent(user_email)}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting resumes:", error);
    throw error;
  }
};

const updateResumeData = async (id, data) => {
  try {
    const response = await axiosInstance.put(`/resume-builder-collections/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating resume data:", error);
    throw error;
  }
};

const getResumeInfo = async (id) => {
  try {
    const response = await axiosInstance.get(`/resume-builder-collections/${id}?populate=*`);
    return response.data;
  } catch (error) {
    console.error("Error getting resume data:", error);
    throw error;
  }
};

const deleteResume = async (id) => {
  try {
    const response = await axiosInstance.delete(`/resume-builder-collections/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting resume:", error);
    throw error;
  }
};

export {
  createNewResume,
  getResumes,
  updateResumeData,
  getResumeInfo,
  deleteResume,
};
