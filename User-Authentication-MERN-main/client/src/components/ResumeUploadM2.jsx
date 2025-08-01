import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ResumeUploadM2() {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [expandedJobIndex, setExpandedJobIndex] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 50; i++) {
      particleArray.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    setParticles(particleArray);

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX + 100) % 100,
        y: (particle.y + particle.speedY + 100) % 100,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : "No file selected");
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/resume/upload",
        formData
      );
      setResult(response.data);
    } catch (error) {
      alert("Upload failed: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const toggleJobExpand = (index) => {
    setExpandedJobIndex(expandedJobIndex === index ? null : index);
  };

  // Separate top 3 matches from other matches
  const topMatches = result?.top_3_matched_jobs || [];
  const otherMatches = result?.all_matched_jobs?.slice(3) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-purple-900/10"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/5 to-transparent"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
                AI-Powered Resume
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-text-shimmer">
                  Career Intelligence
                </span>
              </h1>
              <p className="text-2xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                Transform your career trajectory with intelligent resume analysis. 
                Get personalized job recommendations, skill gap analysis, and career insights 
                powered by advanced AI algorithms.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <div className="text-center backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-400/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-cyan-400/20">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Smart Analysis</h3>
                  <p className="text-gray-400">Advanced AI extracts and analyzes your skills, experience, and qualifications</p>
                </div>
                <div className="text-center backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-purple-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-400/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-400/20">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Instant Matching</h3>
                  <p className="text-gray-400">Real-time job matching with percentage compatibility scores</p>
                </div>
                <div className="text-center backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 hover:border-emerald-400/30 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-400/10">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-400/20">
                    <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Career Growth</h3>
                  <p className="text-gray-400">Personalized recommendations to accelerate your professional development</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Upload Section */}
          <div className="backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-12 mb-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-30"></div>
            <div className="relative z-10 max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4">
                Upload Your Resume
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Upload your resume to discover perfect career opportunities tailored to your expertise
              </p>

              <div className="space-y-8">
                <div className="border-2 border-dashed border-white/20 rounded-2xl p-12 text-center hover:border-cyan-400 hover:bg-cyan-500/10 transition-all duration-300 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="mx-auto w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mb-6 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-all duration-300 border border-cyan-400/30">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 text-cyan-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <span className="text-cyan-400 font-semibold text-lg">
                        Click to upload your resume
                      </span>{" "}
                      <span className="text-gray-400 text-lg">or drag and drop</span>
                    </label>
                    <p className="text-gray-400 mt-4 text-lg">
                      PDF files only • Maximum size 5MB
                    </p>
                    {fileName !== "No file selected" && (
                      <div className="mt-6 p-4 bg-emerald-500/10 border border-emerald-400/30 rounded-xl backdrop-blur-sm">
                        <p className="text-emerald-400 font-medium text-lg">
                          ✓ Selected: {fileName}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={loading || !file}
                  className={`w-full py-5 rounded-2xl font-bold text-xl transition-all duration-300 relative overflow-hidden ${
                    loading || !file
                      ? "bg-gray-700/50 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:-translate-y-1"
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/30 to-blue-700/30 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-4 h-6 w-6 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Analyzing Your Resume...
                      </span>
                    ) : (
                      "Analyze My Resume"
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {result && (
            <div className="space-y-12">
              {/* Personal Profile */}
              <div className="backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mr-6 border border-blue-400/30">
                      <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold">Your Professional Profile</h2>
                      <p className="text-xl text-gray-300 mt-2">Key information extracted from your resume</p>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-blue-400/30 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mr-3 border border-blue-400/20">
                          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                      </div>
                      <p className="text-2xl font-bold">{result.name}</p>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-emerald-400/30 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center mr-3 border border-emerald-400/20">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                      </div>
                      <p className="text-2xl font-bold">{result.email}</p>
                    </div>
                    
                    <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mr-3 border border-purple-400/20">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Education</p>
                      </div>
                      <p className="text-2xl font-bold">{result.education.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-20"></div>
                <div className="relative z-10">
                  <div className="flex items-center mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mr-6 border border-emerald-400/30">
                      <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-4xl font-bold">Professional Skills</h2>
                      <p className="text-xl text-gray-300 mt-2">Technical and professional competencies identified</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {result.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-6 py-3 rounded-2xl text-lg font-semibold backdrop-blur-sm bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-300 border border-blue-400/20 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-400/40 hover:text-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Top Matches */}
              {topMatches.length > 0 && (
                <div className="backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-20"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-2xl flex items-center justify-center mr-6 border border-amber-400/30">
                          <svg className="w-8 h-8 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-4xl font-bold">Premium Job Matches</h2>
                          <p className="text-xl text-gray-300 mt-2">Top opportunities perfectly aligned with your profile</p>
                        </div>
                      </div>
                      <div className="backdrop-blur-sm bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 px-6 py-3 rounded-full font-bold text-lg border border-amber-400/30">
                        {topMatches.length} Perfect Matches
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                      {topMatches.map((job, idx) => (
                        <div
                          key={idx}
                          className={`relative group rounded-3xl p-8 transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm ${
                            idx === 0
                              ? "bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-2 border-amber-400/30 shadow-2xl"
                              : "bg-white/5 border-2 border-white/10 shadow-xl hover:shadow-2xl"
                          }`}
                        >
                          {idx === 0 && (
                            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                              🏆 Best Match
                            </div>
                          )}
                          
                          <div className="flex justify-between items-start mb-6">
                            <h3 className="text-2xl font-bold leading-tight">
                              {job.job_title || "N/A"}
                            </h3>
                            <span
                              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                                job.match_score > 80
                                  ? "bg-emerald-500/90 text-white"
                                  : job.match_score > 60
                                  ? "bg-blue-500/90 text-white"
                                  : "bg-amber-500/90 text-white"
                              }`}
                            >
                              {job.match_score}% Match
                            </span>
                          </div>
                          
                          <p className="text-xl text-gray-300 mb-6 font-medium">{job.company_name}</p>

                          <div className="space-y-6">
                            <div>
                              <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                Your Matched Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.matched_skills.slice(0, 5).map((skill, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                Required Skills
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {job.required_skills
                                  ?.split(",")
                                  .slice(0, 5)
                                  .map((skill, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/10"
                                    >
                                      {skill.trim()}
                                    </span>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Other Matches */}
              {otherMatches.length > 0 && (
                <div className="backdrop-blur-lg bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-10 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-20"></div>
                  <div className="relative z-10">
                    <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center mr-6 border border-purple-400/30">
                          <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v6a2 2 0 002 2h4a2 2 0 002-2V8M8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" />
                          </svg>
                        </div>
                        <div>
                          <h2 className="text-4xl font-bold">Additional Opportunities</h2>
                          <p className="text-xl text-gray-300 mt-2">More career opportunities worth exploring</p>
                        </div>
                      </div>
                      <div className="text-gray-400 font-semibold text-lg">
                        {otherMatches.length} opportunities
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {otherMatches.map((job, idx) => (
                        <div
                          key={idx}
                          className="backdrop-blur-sm bg-white/5 border-2 border-white/10 rounded-3xl p-8 hover:border-purple-400/30 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-blue-500/10 opacity-10 hover:opacity-20 transition-opacity duration-300"></div>
                          <div className="relative z-10">
                            <div className="flex justify-between items-start mb-6">
                              <div>
                                <h3 className="text-2xl font-bold mb-2">
                                  {job.job_title}
                                </h3>
                                <p className="text-xl text-gray-300 font-medium">{job.company_name}</p>
                              </div>
                              <span
                                className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                                  job.match_score > 70
                                    ? "bg-emerald-500/90 text-white"
                                    : job.match_score > 50
                                    ? "bg-blue-500/90 text-white"
                                    : "bg-amber-500/90 text-white"
                                }`}
                              >
                                {job.match_score}% Match
                              </span>
                            </div>

                            <div className="space-y-6">
                              <div>
                                <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                  Matched Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {job.matched_skills.slice(0, 4).map((skill, i) => (
                                    <span
                                      key={i}
                                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-400/30"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                  {job.matched_skills.length > 4 && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/10">
                                      +{job.matched_skills.length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-bold text-gray-400 mb-3 uppercase tracking-wider">
                                  Required Skills
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                  {job.required_skills
                                    ?.split(",")
                                    .slice(0, 4)
                                    .map((skill, i) => (
                                      <span
                                        key={i}
                                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/10"
                                      >
                                        {skill.trim()}
                                      </span>
                                    ))}
                                  {job.required_skills?.split(",").length > 4 && (
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/10">
                                      +{job.required_skills.split(",").length - 4} more
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>

                            {expandedJobIndex === idx && (
                              <div className="mt-8 pt-8 border-t-2 border-white/10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                  <div>
                                    <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                                      All Your Matched Skills
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {job.matched_skills.map((skill, i) => (
                                        <span
                                          key={i}
                                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-500/20 text-purple-300 border border-purple-400/30"
                                        >
                                          {skill}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                                      All Required Skills
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                      {job.required_skills?.split(",").map((skill, i) => (
                                        <span
                                          key={i}
                                          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-white/10 text-gray-300 border border-white/10"
                                        >
                                          {skill.trim()}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            <button
                              onClick={() => toggleJobExpand(idx)}
                              className="mt-6 text-purple-400 hover:text-purple-300 font-medium flex items-center transition-colors duration-300"
                            >
                              {expandedJobIndex === idx ? "Show Less" : "Show More Details"}
                              <svg
                                className={`ml-2 h-5 w-5 transform transition-transform duration-300 ${
                                  expandedJobIndex === idx ? "rotate-180" : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}