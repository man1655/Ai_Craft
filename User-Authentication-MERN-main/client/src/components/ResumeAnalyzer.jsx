import React, { useState ,useEffect} from "react";
import { Upload, FileText, Target, BookOpen, TrendingUp, CheckCircle, AlertCircle, Lightbulb, Users, Award, Clock, Brain, Zap, Shield, Sparkles, ArrowRight, Star } from "lucide-react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [particles, setParticles] = useState([]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  useEffect(() => {
      const particleArray = [];
      for (let i = 0; i < 200; i++) {
        particleArray.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.5 + 0.2,
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
  
      const interval = setInterval(animateParticles, 100);
      return () => clearInterval(interval);
    }, []);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a PDF resume first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://localhost:4000/api/resume/predict", {
        method: "POST",
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setResult(data);
    } catch (error) {
      alert("Error: " + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/10 to-transparent"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-3xl shadow-2xl transform hover:scale-110 transition-all duration-300">
                  <FileText className="w-14 h-14 text-white" />
                </div>
                <div className="absolute -top-3 -right-3">
                  <Sparkles className="w-7 h-7 text-cyan-400 animate-pulse" />
                </div>
              </div>
            </div>
            <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-white via-cyan-100 to-purple-100 bg-clip-text text-transparent">
              AI Career Roadmap
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12">
              Transform your career with <span className="text-cyan-400 font-semibold">intelligent resume analysis</span>. 
              Get personalized insights, skill recommendations, and a tailored learning roadmap to achieve your dream job.
            </p>
            <div className="flex justify-center items-center gap-12 text-gray-300">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <span className="text-lg">AI Powered</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
                <span className="text-lg">Instant Analysis</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
                <span className="text-lg">Career Matching</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 h-full transform hover:scale-105">
              <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Smart Analysis</h3>
              <p className="text-gray-300 leading-relaxed">Advanced AI algorithms extract and analyze your skills, experience, and qualifications with precision.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 hover:border-purple-600/50 transition-all duration-300 h-full transform hover:scale-105">
              <div className="bg-gradient-to-r from-purple-500 to-purple-700 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Career Matching</h3>
              <p className="text-gray-300 leading-relaxed">Get matched with the best-fit roles based on your skills and receive detailed compatibility scores.</p>
            </div>
          </div>
          
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition-all duration-300"></div>
            <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 h-full transform hover:scale-105">
              <div className="bg-gradient-to-r from-cyan-400 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-cyan-400/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white">Learning Roadmap</h3>
              <p className="text-gray-300 leading-relaxed">Receive a personalized learning path with resources, timelines, and project ideas to bridge skill gaps.</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="relative group mb-20">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-400 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-black/30 backdrop-blur-2xl rounded-3xl p-16 border border-gray-800">
            <div className="text-center">
              <div className="mb-12">
                <div className="relative inline-flex items-center justify-center mb-8">
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-400 rounded-full blur-lg animate-pulse opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-400 w-28 h-28 rounded-full flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                    <Upload className="w-14 h-14 text-white" />
                  </div>
                </div>
                <h2 className="text-5xl font-bold text-white mb-6">Upload Your Resume</h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Drop your PDF resume below and let our AI create a personalized career roadmap just for you
                </p>
              </div>
              
              <div className="flex flex-col items-center gap-12">
                <div className="relative w-full max-w-3xl">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                    id="resume-upload"
                  />
                  <label 
                    htmlFor="resume-upload"
                    className="block border-2 border-dashed border-gray-700 rounded-3xl p-20 hover:border-cyan-400 hover:bg-black/20 transition-all duration-300 cursor-pointer group backdrop-blur-sm"
                  >
                    <div className="text-center">
                      <div className="bg-gray-800/50 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:bg-gray-700/50 transition-colors backdrop-blur-sm">
                        <FileText className="w-12 h-12 text-gray-300 group-hover:text-cyan-400 transition-colors" />
                      </div>
                      {file ? (
                        <div>
                          <p className="text-3xl font-bold text-cyan-400 mb-4">✓ {file.name}</p>
                          <p className="text-gray-300">Click to change file</p>
                        </div>
                      ) : (
                        <div>
                          <p className="text-3xl font-bold text-white mb-4">
                            Drag & drop your resume here
                          </p>
                          <p className="text-gray-300 mb-4 text-lg">or click to browse</p>
                          <p className="text-gray-400">PDF files only • Max 10MB</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
                
                <button
                  onClick={handleAnalyze}
                  disabled={loading || !file}
                  className={`group relative flex items-center gap-6 px-20 py-8 rounded-2xl font-bold text-2xl transition-all duration-300 transform ${
                    loading || !file
                      ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-400 text-white hover:from-cyan-400 hover:via-purple-500 hover:to-cyan-300 hover:scale-105 shadow-2xl hover:shadow-cyan-500/30"
                  }`}
                >
                  {!loading && !file && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-600 to-cyan-400 rounded-2xl blur opacity-0 group-hover:opacity-30 transition-opacity"></div>
                  )}
                  <div className="relative flex items-center gap-6">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-10 w-10 border-4 border-white border-t-transparent"></div>
                        <span>Analyzing Your Resume...</span>
                      </>
                    ) : (
                      <>
                        <Zap className="w-10 h-10" />
                        <span>Generate Career Roadmap</span>
                        <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
                
                {!file && (
                  <div className="flex items-center gap-12 text-gray-300">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/30">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg">100% Secure</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
                        <Brain className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg">AI Powered</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-400/30">
                        <Clock className="w-5 h-5 text-white" />
                      </div>
                      <span className="text-lg">Instant Analysis</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-16">
            {/* Extracted Skills */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300">
                <div className="flex items-center gap-6 mb-10">
                  <div className="bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl shadow-lg shadow-cyan-500/30">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white">Extracted Skills</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  {result.extracted_skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-cyan-300 px-8 py-4 rounded-full font-medium border border-cyan-400/30 backdrop-blur-sm hover:border-cyan-400/60 hover:bg-cyan-400/10 transition-all duration-300 text-lg"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Career Prediction */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity"></div>
              <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                <div className="flex items-center gap-6 mb-10">
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-400 p-4 rounded-2xl shadow-lg shadow-purple-500/30">
                    <Target className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl font-bold text-white">Career Prediction</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-25"></div>
                      <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-2xl border border-cyan-400/30 hover:border-cyan-400/60 transition-all duration-300">
                        <h3 className="font-semibold text-cyan-300 mb-4 text-lg">Best Fit Role</h3>
                        <p className="text-4xl font-bold text-white">{result.career_prediction.best_fit_role}</p>
                      </div>
                    </div>
                    
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-2xl blur opacity-25"></div>
                      <div className="relative bg-black/50 backdrop-blur-xl p-8 rounded-2xl border border-purple-500/30 hover:border-purple-500/60 transition-all duration-300">
                        <h3 className="font-semibold text-purple-300 mb-6 text-lg">Match Percentage</h3>
                        <div className="flex items-center gap-6">
                          <div className="flex-1 bg-gray-800 rounded-full h-6 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-cyan-500 to-purple-600 h-6 rounded-full transition-all duration-1000 shadow-lg shadow-cyan-500/50"
                              style={{ width: `${result.career_prediction.match_percent}%` }}
                            ></div>
                          </div>
                          <span className="text-4xl font-bold text-white">{result.career_prediction.match_percent}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-8">
                    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <CheckCircle className="w-8 h-8 text-cyan-400" />
                        <h3 className="font-bold text-cyan-300 text-xl">Matched Skills</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {result.career_prediction.matched_skills.map((skill, idx) => (
                          <span key={idx} className="bg-cyan-500/20 text-cyan-300 px-5 py-3 rounded-full font-medium border border-cyan-500/30 backdrop-blur-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-black/30 backdrop-blur-xl rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-6">
                        <AlertCircle className="w-8 h-8 text-purple-400" />
                        <h3 className="font-bold text-purple-300 text-xl">Missing Skills</h3>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {result.career_prediction.missing_skills.map((skill, idx) => (
                          <span key={idx} className="bg-purple-500/20 text-purple-300 px-5 py-3 rounded-full font-medium border border-purple-500/30 backdrop-blur-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap for Missing Skills */}
            {result.roadmap_for_missing_skills && (
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-3xl blur opacity-15 group-hover:opacity-25 transition-opacity"></div>
                <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-10 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300">
                  <div className="flex items-center gap-6 mb-16">
                    <div className="bg-gradient-to-r from-cyan-400 to-purple-600 p-4 rounded-2xl shadow-lg shadow-cyan-400/30">
                      <BookOpen className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-white">{result.roadmap_for_missing_skills.roadmap_title}</h2>
                  </div>

                  {/* Skills Roadmap */}
                  <div className="space-y-12 mb-16">
                    {Object.entries(result.roadmap_for_missing_skills.skills).map(([skillName, skillDetails]) => (
                      <div key={skillName} className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl blur opacity-50"></div>
                        <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-10 border border-gray-700 hover:border-cyan-400/50 transition-all duration-300">
                          <div className="flex items-start justify-between mb-8">
                            <h3 className="text-3xl font-bold text-cyan-300">{skillName}</h3>
                            <div className="flex items-center gap-3 bg-purple-500/20 px-6 py-3 rounded-full border border-purple-500/30 backdrop-blur-sm">
                              <Clock className="w-6 h-6 text-purple-400" />
                              <span className="font-medium text-purple-300 text-lg">{skillDetails.estimated_days} days</span>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-10">
                            <div className="space-y-8">
                              <div className="bg-black/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                                  <TrendingUp className="w-6 h-6 text-cyan-400" />
                                  Learning Plan
                                </h4>
                                <p className="text-gray-300 leading-relaxed text-lg">{skillDetails.learning_plan}</p>
                              </div>

                              <div className="bg-black/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                                  <Lightbulb className="w-6 h-6 text-purple-400" />
                                  Tips
                                </h4>
                                <div className="flex flex-wrap gap-3">
                                  {skillDetails.tips.map((tip, idx) => (
                                    <span key={idx} className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm border border-purple-500/30 backdrop-blur-sm">
                                      {tip}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="space-y-8">
                              <div className="bg-black/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300">
                                <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                                  <BookOpen className="w-6 h-6 text-cyan-400" />
                                  Resources
                                </h4>
                                <div className="space-y-4">
                                  {skillDetails.resources.map((res, idx) => (
                                    <a
                                      key={idx}
                                      href={res.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="block bg-gray-800/30 p-6 rounded-xl hover:bg-gray-700/30 transition-colors border border-cyan-400/30 hover:border-cyan-400/60 group backdrop-blur-sm"
                                    >
                                      <span className="text-cyan-300 hover:text-cyan-200 font-medium flex items-center gap-3 text-lg">
                                        {res.title}
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                      </span>
                                    </a>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          {skillDetails.project_ideas?.length > 0 && (
                            <div className="mt-8 bg-black/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300">
                              <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                                <Award className="w-6 h-6 text-purple-400" />
                                Project Ideas
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {skillDetails.project_ideas.map((project, idx) => (
                                  <span key={idx} className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full border border-purple-500/30 backdrop-blur-sm">
                                    {project}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {skillDetails.common_mistakes?.length > 0 && (
                            <div className="mt-8 bg-black/30 rounded-2xl p-8 border border-gray-700 backdrop-blur-sm hover:border-cyan-400/30 transition-all duration-300">
                              <h4 className="font-bold text-white mb-4 flex items-center gap-3 text-xl">
                                <Shield className="w-6 h-6 text-cyan-400" />
                                Common Mistakes to Avoid
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                {skillDetails.common_mistakes.map((mistake, idx) => (
                                  <span key={idx} className="bg-cyan-500/20 text-cyan-300 px-4 py-2 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                                    {mistake}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Overall Learning Path */}
                  {result.roadmap_for_missing_skills.overall_learning_path && (
                    <div className="relative group mb-12">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur opacity-20"></div>
                      <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-10 border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-300">
                        <h3 className="text-3xl font-bold text-cyan-300 mb-8 flex items-center gap-4">
                          <TrendingUp className="w-8 h-8" />
                          Overall Learning Path
                        </h3>
                        <div className="space-y-6">
                          {result.roadmap_for_missing_skills.overall_learning_path.map((step, idx) => (
                            <div key={idx} className="flex items-start gap-6">
                              <div className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 mt-1 shadow-lg shadow-cyan-500/30">
                                {idx + 1}
                              </div>
                              <p className="text-gray-300 font-medium leading-relaxed text-lg">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* General Tips */}
                  {result.roadmap_for_missing_skills.general_tips && (
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-3xl blur opacity-20"></div>
                      <div className="relative bg-black/50 backdrop-blur-xl rounded-3xl p-10 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300">
                        <h3 className="text-3xl font-bold text-purple-300 mb-8 flex items-center gap-4">
                          <Lightbulb className="w-8 h-8" />
                          General Tips for Success
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {result.roadmap_for_missing_skills.general_tips.map((tip, idx) => (
                            <div key={idx} className="flex items-start gap-6 bg-black/30 p-8 rounded-2xl border border-gray-700 backdrop-blur-sm hover:border-purple-400/30 transition-all duration-300">
                              <div className="bg-purple-500/20 p-3 rounded-full flex-shrink-0">
                                <Star className="w-6 h-6 text-purple-400" />
                              </div>
                              <p className="text-gray-300 font-medium leading-relaxed text-lg">{tip}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 bg-black/50 backdrop-blur-xl border-t border-gray-800 py-16 mt-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-cyan-500 to-purple-600 p-4 rounded-2xl shadow-lg">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-xl mb-8">
            © 2024 AI Resume Analyzer. Empowering careers through intelligent analysis.
          </p>
          <div className="flex justify-center items-center gap-12 text-gray-300">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              <span className="text-lg">Powered by AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse shadow-lg shadow-purple-500/50"></div>
              <span className="text-lg">Secure & Private</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
              <span className="text-lg">Always Learning</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}