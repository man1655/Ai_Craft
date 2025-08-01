import React, { useState, useEffect } from "react";
import {
  FileText,
  Target,
  Building2,
  Mail,
  BarChart3,
  Bot,
  Menu,
  X,
  ArrowRight,
  CheckCircle,
  Star,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";

const Homepage2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    const particleArray = [];
    for (let i = 0; i < 100; i++) {
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
      setParticles((prev) =>
        prev.map((particle) => ({
          ...particle,
          x: (particle.x + particle.speedX + 100) % 100,
          y: (particle.y + particle.speedY + 100) % 100,
        }))
      );
    };

    const interval = setInterval(animateParticles, 100);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "AI Resume Builder",
      description:
        "Create professional, ATS-optimized resumes with cutting-edge AI technology that understands modern hiring trends.",
      link: "/features/ai-resume-builder",
      gradient: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Interview Preparation",
      description:
        "Practice with AI-generated questions tailored to your industry and receive real-time feedback.",
      link: "/features/Interview-prep",
      gradient: "from-purple-500 to-pink-400",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Company Portal",
      description:
        "Recruiters can access candidate databases and streamline their hiring process efficiently.",
      link: "/features/CompanyPortal",
      gradient: "from-emerald-500 to-teal-400",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "AI Email Assistant",
      description:
        "Generate personalized follow-up emails that increase your response rates significantly.",
      link: "/features/EmailGenerator",
      gradient: "from-orange-500 to-amber-400",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Mock Interview",
      description:
        "Test your interview skills with topic-based MCQs and get instant feedback and explanations.",
      link: "/features/interview",
      gradient: "from-rose-500 to-pink-400",
    },
    {
      icon: <Bot className="w-8 h-8" />,
      title: "AI Roadmap Generator",
      description:
        "Get personalized skill development roadmap based on your resume using advanced AI analysis.",
      link: "/features/AiPath",
      gradient: "from-indigo-500 to-purple-400",
    },
  ];

  const steps = [
    {
      number: "1",
      title: "Sign Up & Profile",
      description:
        "Create your account and complete your professional profile with our guided setup process.",
    },
    {
      number: "2",
      title: "Build Your Resume",
      description:
        "Use our AI-powered builder to create a professional resume tailored to your target roles.",
    },
    {
      number: "3",
      title: "Practice Interviews",
      description:
        "Prepare for interviews with AI-generated questions and get feedback on your performance.",
    },
    {
      number: "4",
      title: "Land Your Job",
      description:
        "Apply with confidence and use our tools to follow up effectively until you land your dream role.",
    },
  ];

  const stats = [
    { number: "50K+", label: "Resumes Created" },
    { number: "95%", label: "Interview Success" },
    { number: "500+", label: "Companies" },
    { number: "4.9/5", label: "User Rating" },
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Software Engineer at Google",
      image: "👩‍💻",
      text: "CareerCraft AI helped me land my dream job at Google. The resume optimization and interview prep were game-changers!",
    },
    {
      name: "Mike Chen",
      role: "HR Director at Microsoft",
      image: "👨‍💼",
      text: "As a recruiter, the company portal has streamlined our hiring process. We've reduced time-to-hire by 40%.",
    },
    {
      name: "Emily Rodriguez",
      role: "Marketing Manager at Spotify",
      image: "👩‍🎨",
      text: "The AI email assistant is incredible. My follow-up response rates increased by 60% after using it.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Particle Background - Covering the entire website */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-900/10 to-transparent"></div>
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles - Now covering the entire page */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              left: `${particle.x}vw`,
              top: `${particle.y}vh`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>



      {/* Hero Section */}
      <section className="pt-20 pb-16 relative">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Build Your{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                  Dream Career
                </span>{" "}
                with AI
              </h1>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Create professional resumes, master interviews, and land your
                dream job with our comprehensive AI-driven platform. Trusted by
                thousands worldwide.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                <button className="group bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 flex items-center justify-center border border-cyan-400/20">
                  Start Building Free
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                <button className="border-2 border-slate-700 text-slate-300 px-8 py-4 rounded-full font-semibold text-lg hover:border-cyan-400 hover:text-cyan-400 hover:shadow-xl hover:shadow-cyan-400/20 hover:bg-slate-800/50 transition-all duration-300">
                  Watch Demo
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/90 rounded-3xl shadow-2xl shadow-cyan-500/10 p-8 transform rotate-3 hover:rotate-0 transition-all duration-500 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="text-sm text-slate-400 font-medium">
                    Resume Builder
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="h-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-full shadow-lg shadow-cyan-500/20"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-4/5"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-3/5"></div>
                  <div className="h-3 bg-slate-700 rounded-full w-5/6"></div>
                  <div className="space-y-2 mt-6">
                    <div className="h-2 bg-slate-700 rounded-full"></div>
                    <div className="h-2 bg-slate-700 rounded-full w-4/5"></div>
                    <div className="h-2 bg-slate-700 rounded-full w-3/5"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white p-3 rounded-full shadow-xl shadow-emerald-500/30 animate-bounce">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white p-3 rounded-full shadow-xl shadow-amber-500/30 animate-pulse">
                <Star className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Everything You Need to Land Your Dream Job
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Our AI-powered platform provides comprehensive tools for job
              seekers and recruiters to create, optimize, and manage career
              opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <a
                href={feature.link}
                key={index}
                className="group p-8 rounded-3xl border border-slate-800/50 hover:border-slate-600/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 bg-gradient-to-br from-slate-900/50 to-slate-800/30 hover:from-slate-800/60 hover:to-slate-900/60 block backdrop-blur-sm hover:scale-105 relative z-10"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {feature.description}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Get started in minutes and transform your career journey with our
              simple 4-step process.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group relative z-10">
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-cyan-500/30 border-2 border-cyan-400/20">
                    {step.number}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 opacity-30"></div>
                  )}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-cyan-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="py-20 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Join thousands of successful professionals who have transformed
              their careers with CareerCraft AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-slate-900/60 to-slate-800/40 p-8 rounded-3xl shadow-xl border border-slate-800/50 hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500 backdrop-blur-sm hover:scale-105 group relative z-10"
              >
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full flex items-center justify-center text-2xl mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {testimonial.image}
                  </div>
                  <div>
                    <div className="font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-slate-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
                <p className="text-slate-300 leading-relaxed italic mb-4">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 to-slate-950/40"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/5 rounded-full animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-cyan-400/10 rounded-full animate-bounce"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl text-cyan-50 mb-8 max-w-2xl mx-auto leading-relaxed">
            Join thousands of successful job seekers who have landed their dream
            jobs using CareerCraft AI. Start your journey today.
          </p>
          <button className="bg-white text-cyan-600 px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:shadow-white/30 transform hover:scale-105 transition-all duration-300 inline-flex items-center group border-2 border-white/20 relative z-10">
            Start Your Journey Today
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

  
      
    </div>
  );
};

export default Homepage2;