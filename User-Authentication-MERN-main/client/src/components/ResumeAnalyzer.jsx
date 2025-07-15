import React, { useState } from "react";
import { Upload, FileText, Target, BookOpen, TrendingUp, CheckCircle, AlertCircle, Lightbulb, Users, Award, Clock, Brain, Zap, Shield } from "lucide-react";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => setFile(e.target.files[0]);

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-700">
      {/* Header Section */}
      <div className="bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-4 text-white">
              AI Career Roadmap
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Transform your career with intelligent resume analysis. Get personalized insights, skill recommendations, and a tailored learning roadmap to achieve your dream job.
            </p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Smart Analysis</h3>
            <p className="text-gray-600">Advanced AI algorithms extract and analyze your skills, experience, and qualifications with precision.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Career Matching</h3>
            <p className="text-gray-600">Get matched with the best-fit roles based on your skills and receive detailed compatibility scores.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
            <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Learning Roadmap</h3>
            <p className="text-gray-600">Receive a personalized learning path with resources, timelines, and project ideas to bridge skill gaps.</p>
          </div>
        </div>

        {/* Upload Section */}
        <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-2xl p-12 mb-8 border border-blue-100 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-100 to-transparent rounded-full -translate-y-32 translate-x-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-indigo-100 to-transparent rounded-full translate-y-24 -translate-x-24 opacity-50"></div>
          
          <div className="text-center relative z-10">
            <div className="mb-8">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                <Upload className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Upload Your Resume</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Drop your PDF resume below and let our AI create a personalized career roadmap just for you
              </p>
            </div>
            
            <div className="flex flex-col items-center gap-8">
              <div className="relative w-full max-w-lg">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  id="resume-upload"
                />
                <label 
                  htmlFor="resume-upload"
                  className="block border-3 border-dashed border-blue-300 rounded-2xl p-12 hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer group"
                >
                  <div className="text-center">
                    <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    {file ? (
                      <div>
                        <p className="text-lg font-semibold text-blue-700 mb-2">✓ {file.name}</p>
                        <p className="text-sm text-blue-600">Click to change file</p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-lg font-semibold text-gray-700 mb-2">
                          Drag & drop your resume here
                        </p>
                        <p className="text-gray-500 mb-2">or click to browse</p>
                        <p className="text-sm text-gray-400">PDF files only • Max 10MB</p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              
              <button
                onClick={handleAnalyze}
                disabled={loading || !file}
                className={`flex items-center gap-4 px-12 py-5 rounded-2xl font-bold text-xl transition-all duration-300 transform ${
                  loading || !file
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 hover:scale-105 shadow-2xl hover:shadow-blue-500/25"
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-6 w-6 border-3 border-white border-t-transparent"></div>
                    <span>Analyzing Your Resume...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-6 h-6" />
                    <span>Generate Career Roadmap</span>
                  </>
                )}
              </button>
              
              {!file && (
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>100% Secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-blue-500" />
                    <span>AI Powered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-500" />
                    <span>Instant Analysis</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        {result && (
          <div className="space-y-8">
            {/* Extracted Skills */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Extracted Skills</h2>
              </div>
              <div className="flex flex-wrap gap-3">
                {result.extracted_skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 px-4 py-2 rounded-full font-medium border border-blue-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Career Prediction */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Career Prediction</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
                    <h3 className="font-semibold text-green-800 mb-2">Best Fit Role</h3>
                    <p className="text-2xl font-bold text-green-700">{result.career_prediction.best_fit_role}</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-2">Match Percentage</h3>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${result.career_prediction.match_percent}%` }}
                        ></div>
                      </div>
                      <span className="text-2xl font-bold text-blue-700">{result.career_prediction.match_percent}%</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <h3 className="font-semibold text-green-800">Matched Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.career_prediction.matched_skills.map((skill, idx) => (
                        <span key={idx} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <h3 className="font-semibold text-orange-800">Missing Skills</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.career_prediction.missing_skills.map((skill, idx) => (
                        <span key={idx} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Roadmap for Missing Skills */}
            {result.roadmap_for_missing_skills && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
                <div className="flex items-center gap-3 mb-8">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <BookOpen className="w-6 h-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">{result.roadmap_for_missing_skills.roadmap_title}</h2>
                </div>

                {/* Skills Roadmap */}
                <div className="space-y-8 mb-10">
                  {Object.entries(result.roadmap_for_missing_skills.skills).map(([skillName, skillDetails]) => (
                    <div key={skillName} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-xl font-bold text-blue-800">{skillName}</h3>
                        <div className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-700">{skillDetails.estimated_days} days</span>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-green-600" />
                              Learning Plan
                            </h4>
                            <p className="text-gray-700 bg-white p-3 rounded-lg">{skillDetails.learning_plan}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <Lightbulb className="w-4 h-4 text-yellow-600" />
                              Tips
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {skillDetails.tips.map((tip, idx) => (
                                <span key={idx} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                                  {tip}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                              <BookOpen className="w-4 h-4 text-purple-600" />
                              Resources
                            </h4>
                            <div className="space-y-2">
                              {skillDetails.resources.map((res, idx) => (
                                <a
                                  key={idx}
                                  href={res.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="block bg-white p-3 rounded-lg hover:bg-purple-50 transition-colors border border-purple-200 hover:border-purple-300"
                                >
                                  <span className="text-purple-700 hover:text-purple-800 font-medium">{res.title}</span>
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {skillDetails.project_ideas?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Award className="w-4 h-4 text-indigo-600" />
                            Project Ideas
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skillDetails.project_ideas.map((project, idx) => (
                              <span key={idx} className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                                {project}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {skillDetails.common_mistakes?.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-red-600" />
                            Common Mistakes to Avoid
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {skillDetails.common_mistakes.map((mistake, idx) => (
                              <span key={idx} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                                {mistake}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Overall Learning Path */}
                {result.roadmap_for_missing_skills.overall_learning_path && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 mb-6">
                    <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Overall Learning Path
                    </h3>
                    <div className="space-y-3">
                      {result.roadmap_for_missing_skills.overall_learning_path.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </div>
                          <p className="text-green-800 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* General Tips */}
                {result.roadmap_for_missing_skills.general_tips && (
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 border border-purple-200">
                    <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      General Tips for Success
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {result.roadmap_for_missing_skills.general_tips.map((tip, idx) => (
                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg">
                          <div className="bg-purple-100 p-1 rounded-full flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-purple-600" />
                          </div>
                          <p className="text-purple-800 font-medium">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">© 2024 AI Resume Analyzer. Empowering careers through intelligent analysis.</p>
        </div>
      </div>
    </div>
  );
}