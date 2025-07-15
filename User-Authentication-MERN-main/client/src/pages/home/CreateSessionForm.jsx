import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import axiosInstance1 from '@/utils/axiosInstance1';
import { API_PATH } from "../../utils/apiPaths";

function CreateSessionForm() {
  const [formData, setFormData] = useState({
    role: '',
    experience: '',
    topicsToFocus: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError('Role, Experience, and Topics to Focus are required.');
      toast.error('Please fill all required fields.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      // 1. Generate questions
      const aiResponse = await axiosInstance1.post(
        API_PATH.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      // Extract questions array based on your backend response shape:
      const generatedQuestions = aiResponse.data.questions;

      if (!generatedQuestions || !Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
        throw new Error('Failed to generate questions. Please try again.');
      }

      // 2. Create session with explanation and questions
      const sessionResponse = await axiosInstance1.post(
        API_PATH.SESSIONS.CREATE,
        {
          ...formData,
          questions: generatedQuestions,
        }
      );

      console.log('Session creation response data:', sessionResponse.data);

      // Use sessionResponse.data._id based on your backend response
      if (sessionResponse.data?._id) {
        toast.success('Session created successfully!');
        setFormData({
          role: '',
          experience: '',
          topicsToFocus: '',
          description: '',
        });
        navigate(`/interview-prep/${sessionResponse.data._id}`);
      } else {
        throw new Error('Session creation failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      const msg = error.response?.data?.message || error.message || 'Something went wrong.';
      setError(msg);
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center max-w-md mx-auto p-4">
      <h3 className="text-lg font-semibold text-black">Start a New Interview Journey</h3>
      <p className="text-xs text-slate-700 mt-1 mb-3">
        Fill out a few quick details and unlock your personalized set of interview questions!
      </p>

      <form onSubmit={handleCreateSession} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Target Role*</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1 font-sans"
            placeholder="e.g., Frontend Developer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Experience (years)*</label>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="e.g., 2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Topics to Focus*</label>
          <input
            type="text"
            name="topicsToFocus"
            value={formData.topicsToFocus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="e.g., React, Data Structures"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            placeholder="Any specific goals or notes for this session"
          />
        </div>

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center gap-2 bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
        >
          {isLoading ? <SpinnerLoader /> : 'Create Session'}
        </button>
      </form>
    </div>
  );
}

export default CreateSessionForm;
