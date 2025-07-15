// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Test from "./pages/Test.jsx";
  
// import Home3 from './pages/Home';
// import Test from './pages/Test';
import Reasult from './pages/Reasult';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/features/ai-resume-builder' element={<HomePage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dashboard/edit-resume/:resume_id' element={<EditResume />} />
        <Route path='/dashboard/view-resume/:resume_id' element={<ViewResume />} />
        <Route path='/login' element={<Login />} />
        <Route path='/email-verify' element={<EmailVerify />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/Companyregister' element={<CompanyRegister />} />
        <Route path='/Companylogin' element={<CompanyLogin />} />
        <Route path='/features/Interview-prep' element={<Landingpage />} />
        <Route path='/Interview-prep/dashboard' element={<Dashboard1 />} />
        <Route path='/interview-prep/:sessionId' element={<Interviewprep />} />
        <Route path="/features/ResumeModal" element={<ResumeUploadM/>}/>
        <Route path="/features/CompanyPortal" element={<ResumeUploadM2/>}></Route>
        <Route path="/features/EmailGenerator" element={<EmailForm/>}></Route>
        <Route path="/features/AiPath" element={<ResumeAnalyzer/>}></Route>

        <Route path="/features/interview" element={<Home3/>}></Route>
        <Route path="features/interview/test" element={<Test/>}></Route>
        <Route path="features/interview/reasult" element={<Reasult/>}></Route>
        
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
