import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import RoleInfoHeader from "./components/RoleInfoHeader";
import { useState } from "react"; 
import axios from "axios";
import { toast } from "react-hot-toast";
import { API_PATH } from "../../utils/apiPaths";
import axiosInstance1 from "../../utils/axiosInstance";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import AiResponsePreview from "./components/AiResponsePreview";

const InterviewPrep = () => {
  const { sessionId } = useParams();

  // Add custom styles for answer font family
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .answer-content {
        font-family: 'Georgia', 'Times New Roman', serif !important;
        font-size: 1.125rem !important;
        line-height: 1.75 !important;
        color: #374151 !important;
      }
      .answer-content p {
        margin-bottom: 1rem !important;
      }
      .answer-content h1, .answer-content h2, .answer-content h3 {
        font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif !important;
        font-weight: 600 !important;
        margin-bottom: 0.75rem !important;
        margin-top: 1.5rem !important;
      }
      .drawer-large {
        width: 100vw !important;
        max-width: none !important;
      }
      @media (min-width: 768px) {
        .drawer-large {
          width: 60vw !important;
          min-width: 600px !important;
        }
      }
      @media (min-width: 1024px) {
        .drawer-large {
          width: 50vw !important;
          min-width: 800px !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLearnMoreDrawer, setOpenLearnMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);

  // Fetch session data by session id
  const fetchSessionDetailsById = async () => {
    try {
      setIsLoading(true);
      setErrorMsg("");

      const response = await axiosInstance1.get(API_PATH.SESSIONS.GET_BY_ID(sessionId));

      if (response.status === 200) {
        setSessionData(response.data);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      setErrorMsg("Failed to load session details.");
      toast.error(
        error?.response?.data?.message || "Something went wrong while fetching session"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Generate Concept Explanation
  const generateConceptExplanation = async (question) => {
    try{
      setErrorMsg("")
      setExplanation(null)

      setIsLoading(true)
      setOpenLearnMoreDrawer(true);

      const response=await axiosInstance1.post(
        API_PATH.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      )
      if(response.data){
          setExplanation(response.data)
      }
    }catch(error){
      setExplanation('null')
      setErrorMsg('failed to generate explanation, Try again later')
      console.log('err',error)
    }
    finally{
      setIsLoading(false)
    }
  };

  const toggleQuestionsPinsStatus = async (questionId) => {
    try {
      setIsUpdateLoader(true);

      const response = await axiosInstance1.patch(API_PATH.QUESTIONS.TOGGLE_PIN(questionId));

      if (response.data && typeof response.data.pinned === 'boolean') {
        setSessionData((prevData) => {
          const updatedQuestions = prevData.questions.map((q) =>
            q._id === questionId ? { ...q, isPinned: response.data.pinned } : q
          );

          return { ...prevData, questions: updatedQuestions };
        });
      } else {
        toast.error("Failed to toggle pin status: unexpected response");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error toggling pin status. Please try again."
      );
    } finally {
      setIsUpdateLoader(false);
    }
  };

  const uploadMoreQuestions = async () => {
    if (!sessionData?._id) {
      toast.error("Session ID not found.");
      return;
    }

    try {
      setIsUpdateLoader(true);

      // Step 1: Call AI to generate questions
      const aiResponse = await axiosInstance1.post(API_PATH.AI.GENERATE_QUESTIONS, {
        role: sessionData.role,
        experience: sessionData.experience,
        topicsToFocus: sessionData.topicsToFocus,
      });
      console.log((aiResponse))
      let generatedQuestions = aiResponse?.data?.questions;

      // 🛡️ Ensure it's an array
      if (!Array.isArray(generatedQuestions)) {
        generatedQuestions = [generatedQuestions]; // wrap in array if it's a single object
      }

      if (!generatedQuestions || generatedQuestions.length === 0) {
        toast.error("No questions generated.");
        return;
      }

      // Step 2: Add questions to session
      try {
        const addResponse = await axiosInstance1.post(API_PATH.QUESTIONS.ADD, {
          sessionId,
          questions: generatedQuestions,
        });

        console.log("Add Questions Response:", addResponse);

        // Check response status (accept 200 or 201) or success flag
        const isSuccess =
          (addResponse.status >= 200 && addResponse.status < 300) ||
          addResponse.data?.success;

        if (isSuccess) {
          toast.success("Questions successfully added to session.");
          await fetchSessionDetailsById(); // Refresh UI
        } else {
          toast.error("Failed to add questions to session.");
        }
      } catch (error) {
        console.error("Upload error:", error);
        toast.error(
          error?.response?.data?.message || "Failed to upload and add questions."
        );
      }

    } catch (error) {
      console.error("Upload error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to upload and add questions."
      );
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      {/* Header Section */}
      <div className="bg-white/70 backdrop-blur-sm border-b border-indigo-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <RoleInfoHeader
            role={sessionData?.role || ""}
            topicsToFocus={sessionData?.topicsToFocus || ""}
            experience={sessionData?.experience || "-"}
            questions={sessionData?.questions?.length || "-"}
            description={sessionData?.description || ""}
            lastUpdated={
              sessionData?.updatedAt
                ? moment(sessionData.updatedAt).format("Do MMM YYYY")
                : ""
            }
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Section Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Interview Q & A
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></div>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-12 gap-8">
          <div
            className={`col-span-12 ${
              openLearnMoreDrawer ? "lg:col-span-7" : "lg:col-span-8"
            } transition-all duration-300 ease-in-out`}
          >
            <div className="space-y-6">
              <AnimatePresence>
                {sessionData?.questions?.map((data, index) => {
                  return (
                    <motion.div
                      key={data._id || index}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95, y: -20 }}
                      transition={{
                        duration: 0.5,
                        type: "spring",
                        stiffness: 120,
                        delay: index * 0.1,
                        damping: 20,
                      }}
                      layout
                      layoutId={`question-${data._id || index}`}
                      className="transform hover:scale-[1.02] transition-transform duration-200"
                    >
                      <div className="bg-white/80  backdrop-blur-sm rounded-2xl shadow-lg border border-indigo-100 hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <QuestionCard
                          question={data?.question}
                          answer={data?.answer}
                          onLearnMore={() => {
                            generateConceptExplanation(data.question)
                          }}
                          isPinned={data.isPinned}
                          onTogglePin={() => {
                            toggleQuestionsPinsStatus(data._id)
                          }}
                        />
                      </div>

                      {/* Load More Button */}
                      {!isLoading && sessionData?.questions?.length === index + 1 && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="flex items-center justify-center mt-8 pt-6"
                        >
                          <button
                            className="group flex items-center gap-3 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            disabled={isLoading || isUpdateLoader}
                            onClick={uploadMoreQuestions}
                          >
                            {isUpdateLoader ? (
                              <SpinnerLoader />
                            ) : (
                              <LuListCollapse className="text-lg group-hover:rotate-180 transition-transform duration-300" />
                            )}
                            <span>Load More Questions</span>
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {/* Empty State */}
              {!isLoading && (!sessionData?.questions || sessionData.questions.length === 0) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-12 border border-indigo-100 shadow-lg">
                    <div className="text-indigo-300 mb-4">
                      <LuCircleAlert className="w-16 h-16 mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      No questions available
                    </h3>
                    <p className="text-gray-500">
                      Generate some questions to get started with your interview preparation.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Loading State */}
              {isLoading && !sessionData?.questions && (
                <div className="flex justify-center py-16">
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-indigo-100 shadow-lg">
                    <SpinnerLoader />
                    <p className="text-gray-600 mt-4 text-center">Loading questions...</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Drawer - Bigger Modal */}
      <Drawer
        isOpen={openLearnMoreDrawer}
        onClose={() => { setOpenLearnMoreDrawer(false) }}
        title={!isLoading && explanation?.title}
        className="bg-white/95 backdrop-blur-md border-l border-indigo-100 w-full max-w-4xl"
        size="large"
      >
        <div className="p-8 max-w-none">
          {errorMsg && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-base text-amber-600 font-medium bg-amber-50 p-6 rounded-xl border border-amber-200 mb-6"
            >
              <LuCircleAlert className="w-6 h-6 flex-shrink-0" />
              <span className="font-['Inter',_'SF_Pro_Display',_system-ui,_sans-serif]">{errorMsg}</span>
            </motion.div>
          )}
          
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <SpinnerLoader />
              <p className="text-gray-600 mt-6 text-lg font-['Inter',_'SF_Pro_Display',_system-ui,_sans-serif]">Generating explanation...</p>
            </div>
          )}
          
          {!isLoading && explanation && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-indigo-50 to-white p-8 rounded-2xl border border-indigo-100 min-h-[400px]"
            >
              <div className="font-['Georgia',_'Times_New_Roman',_serif] text-lg leading-relaxed text-gray-800">
                <AiResponsePreview content={explanation?.explanation} />
              </div>
            </motion.div>
          )}
        </div>
      </Drawer>
    </div>
  );
};

export default InterviewPrep;