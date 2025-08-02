// src/App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AICraftLoader from './components/common/AICraftLoader';

import Home from "./pages/Home.jsx";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import EditResume from "./pages/dashboard/edit-resume/[resume_id]/EditResume.jsx";
import ViewResume from "./pages/dashboard/view-resume/[resume_id]/ViewResume.jsx";

import Login from "./pages/Login.jsx";
import EmailVerify from "./pages/EmailVerfiy.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import CompanyRegister from "./pages/CompanyRegister.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import CompanyLogin from "./pages/CompanyLogin.jsx";
import Landingpage from './pages/Landingpage';
import Dashboard1 from './pages/home/Dashboard1.jsx';
import Interviewprep from './pages/interviewprep/Interviewprep';
import { Toaster } from 'react-hot-toast';
import ResumeUploadM from './components/ResumeUploadM.jsx';
import ResumeUploadM2 from "./components/ResumeUploadM2.jsx";
import EmailForm from "./EmailForm.jsx";
import ResumeAnalyzer from "./components/ResumeAnalyzer.jsx";
import Home3 from "./pages/Home3.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";
import Test from "./pages/Test.jsx";
import ProtectedRoute from "./components/Protected/ProtectedRoute.js";
  
// import Home3 from './pages/Home';
// import Test from './pages/Test';
import Reasult from './pages/Reasult';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    // Simulate app initialization
    const initializeApp = async () => {
      try {
        // Add any initialization logic here:
        // - Check authentication
        // - Load user preferences
        // - Initialize services
        // - Preload critical data
        
        // Simulate loading time (remove in production or make conditional)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setIsAppReady(true);
      } catch (error) {
        console.error('App initialization failed:', error);
        setIsAppReady(true); // Still show app even if initialization fails
      }
    };

    initializeApp();
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Show loader until both app is ready and loading animation is complete
  if (isLoading || !isAppReady) {
    return <AICraftLoader onLoadingComplete={handleLoadingComplete} />;
  }
  return (
    <>
     <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />} />
      <Route path="/email-verify" element={<EmailVerify />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/Companyregister" element={<CompanyRegister />} />
      <Route path="/Companylogin" element={<CompanyLogin />} />

      {/* Protected Routes */}
      <Route
        path="/features/ai-resume-builder"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/dashboard/edit-resume/:resume_id"
        element={
          <ProtectedRoute>
            <EditResume />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/view-resume/:resume_id"
        element={
          <ProtectedRoute>
            <ViewResume />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/Interview-prep"
        element={
          <ProtectedRoute>
            <Landingpage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Interview-prep/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard1 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/interview-prep/:sessionId"
        element={
          <ProtectedRoute>
            <Interviewprep />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/ResumeModal"
        element={
          <ProtectedRoute>
            <ResumeUploadM />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/CompanyPortal"
        element={
          <ProtectedRoute>
            <ResumeUploadM2 />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/EmailGenerator"
        element={
          <ProtectedRoute>
            <EmailForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/AiPath"
        element={
          <ProtectedRoute>
            <ResumeAnalyzer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/interview"
        element={
          <ProtectedRoute>
            <Home3/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/interview/test"
        element={
          <ProtectedRoute>
            <Test />
          </ProtectedRoute>
        }
      />
      <Route
        path="/features/interview/reasult"
        element={
          <ProtectedRoute>
            <Reasult />
          </ProtectedRoute>
        }
      />
      </Routes>
      <Toaster
        position="top-right"
        toastOptions={{
          className: '',
          style: { fontSize: '12px' },
        }}
      />
      <ToastContainer />
    </>
  );
};

export default App;
