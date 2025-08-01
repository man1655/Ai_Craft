import React, { useState, useEffect } from "react";
import {
  Mail,
  Send,
  Copy,
  CheckCircle,
  AlertCircle,
  Briefcase,
  User,
  FileText,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const EmailForm = () => {
  const [form, setForm] = useState({
    applicationType: "Job Application",
    position: "Software Engineer",
    jobDescription: "",
  });

  const [generatedEmail, setGeneratedEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [particles, setParticles] = useState([]);

  const APPLICATION_TYPES = [
    "Job Application",
    "Follow-up",
    "Thank You",
    "Withdrawal",
    "Status Inquiry",
  ];

  const POSITIONS = [
    "Software Engineer",
    "Marketing Manager",
    "Data Analyst",
    "Graphic Designer",
    "Project Manager",
  ];

  // Initialize floating particles
  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 130; i++) {
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

  const generateJobDescription = async () => {
    setLoadingDescription(true);
    setNotification("");
    // Simulate API call
    setTimeout(() => {
      setForm((prev) => ({ 
        ...prev, 
        jobDescription: `We are seeking a talented ${form.position} to join our dynamic team. The ideal candidate will have strong technical skills, excellent problem-solving abilities, and experience with modern development practices. Key responsibilities include developing high-quality software solutions, collaborating with cross-functional teams, and contributing to architectural decisions.` 
      }));
      setNotification("Job description generated successfully!");
      setLoadingDescription(false);
    }, 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailChange = (e) => {
    setGeneratedEmail(e.target.value);
  };

  const handleSubmit = async () => {
    if (!form.jobDescription.trim()) {
      setNotification("Please provide a job description");
      return;
    }

    setLoading(true);
    setNotification("");
    
    // Simulate API call
    setTimeout(() => {
      const email = `Subject: Application for ${form.position}

Dear Hiring Manager,

I am writing to express my strong interest in the ${form.position} position at your company. With my background in technology and passion for innovation, I am excited about the opportunity to contribute to your team.

Based on the job description, I believe my skills align perfectly with your requirements. I have extensive experience in software development, problem-solving, and working collaboratively in team environments.

Key highlights of my qualifications:
• Strong technical foundation and continuous learning mindset
• Proven ability to deliver high-quality solutions
• Excellent communication and teamwork skills
• Passion for staying current with industry trends

I would welcome the opportunity to discuss how my experience and enthusiasm can contribute to your team's success. Thank you for considering my application.

Best regards,
[Your Name]`;
      
      setGeneratedEmail(email);
      setNotification("Email generated successfully!");
      setLoading(false);
    }, 3000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setNotification("Email copied to clipboard!");
    setTimeout(() => setNotification(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
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

      <div className="max-w-4xl mx-auto py-12 px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl shadow-cyan-500/25 relative backdrop-blur-sm border border-white/10">
            <Mail className="w-10 h-10 text-white" />
            <Sparkles className="w-6 h-6 text-yellow-300 absolute -top-2 -right-2 animate-bounce" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent animate-pulse">
              AI Email
            </span>{" "}
            <span className="text-white">Assistant</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Craft compelling job application emails with the power of AI
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 mb-8 hover:shadow-cyan-500/20 transition-all duration-300">
          <div className="flex items-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm border border-white/10">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Email Configuration
            </h2>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Application Type <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  <select
                    name="applicationType"
                    value={form.applicationType}
                    onChange={handleChange}
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-12 py-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
                    required
                  >
                    {APPLICATION_TYPES.map((type) => (
                      <option
                        key={type}
                        value={type}
                        className="bg-gray-800 text-white"
                      >
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Position <span className="text-red-400">*</span>
                </label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                  <select
                    name="position"
                    value={form.position}
                    onChange={handleChange}
                    className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-12 py-4 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
                    required
                  >
                    {POSITIONS.map((pos) => (
                      <option
                        key={pos}
                        value={pos}
                        className="bg-gray-800 text-white"
                      >
                        {pos}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-3 relative">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Job Description <span className="text-red-400">*</span>
              </label>

              <div className="relative">
                <textarea
                  name="jobDescription"
                  value={form.jobDescription}
                  onChange={handleChange}
                  rows={6}
                  className="w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 resize-none hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20"
                  placeholder="Paste the job description, requirements, and any other relevant details..."
                  required
                />

                <button
                  type="button"
                  onClick={generateJobDescription}
                  disabled={loadingDescription}
                  className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 transform backdrop-blur-sm border border-white/10"
                >
                  {loadingDescription ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                      Generating...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Sparkles className="w-4 h-4 mr-1" />
                      Generate with AI
                    </span>
                  )}
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Provide as much detail as possible for better results
              </p>
            </div>

            <div className="pt-6">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white py-5 px-6 rounded-xl font-semibold shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 border border-cyan-400/20 backdrop-blur-sm ${
                  loading ? "opacity-70 cursor-not-allowed scale-100" : ""
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-6 w-6 text-white"
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
                    Generating Your Professional Email...
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-lg">
                    <Sparkles className="w-6 h-6 mr-3" />
                    Generate Professional Email
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </span>
                )}
              </button>
            </div>
          </div>

          {notification && (
            <div
              className={`mt-6 p-4 rounded-xl text-center font-medium backdrop-blur-lg border transition-all duration-300 hover:scale-[1.02] ${
                notification.includes("success")
                  ? "bg-green-500/20 text-green-300 border-green-500/30 shadow-lg shadow-green-500/20"
                  : "bg-red-500/20 text-red-300 border-red-500/30 shadow-lg shadow-red-500/20"
              }`}
            >
              <div className="flex items-center justify-center">
                {notification.includes("success") ? (
                  <CheckCircle className="w-5 h-5 mr-2" />
                ) : (
                  <AlertCircle className="w-5 h-5 mr-2" />
                )}
                {notification}
              </div>
            </div>
          )}
        </div>

        {/* Generated Email Card */}
        {generatedEmail && (
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/10 p-8 hover:shadow-purple-500/20 transition-all duration-300" style={{animation: 'fadeIn 0.6s ease-out'}}>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4 shadow-lg backdrop-blur-sm border border-white/10">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  Generated Email
                </h2>
              </div>
              <button
                onClick={handleCopy}
                className="flex items-center bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-emerald-500/30 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 border border-emerald-400/20 backdrop-blur-sm"
              >
                <Copy className="w-5 h-5 mr-2" />
                Copy to Clipboard
              </button>
            </div>

            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
              <textarea
                value={generatedEmail}
                onChange={handleEmailChange}
                rows={15}
                className="w-full bg-transparent border-none resize-none focus:ring-0 text-gray-200 focus:outline-none"
                style={{
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                }}
              />
            </div>

            <div className="mt-6 p-4 bg-cyan-500/20 backdrop-blur-lg rounded-xl border border-cyan-500/30 text-cyan-300 shadow-lg shadow-cyan-500/20">
              <p className="text-sm flex items-center">
                <Sparkles className="w-4 h-4 mr-2 text-cyan-400 animate-pulse" />
                You can edit the generated email above. Personal touches always
                help make your application stand out!
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default EmailForm;