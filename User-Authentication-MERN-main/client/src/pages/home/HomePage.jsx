import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
// OR if you're using the public folder (Next.js style)
// Adjust the path as necessary
import {
  Circle,
  Info,
  Rocket,
  CheckCircle,
  Star,
  Users,
  Download,
  Settings,
  Loader,
} from "lucide-react";

// Mock functions for demonstration
const startUser = async () => ({
  statusCode: 200,
  data: { name: "Demo User" },
});
const addUserData = (data) => ({ type: "ADD_USER_DATA", payload: data });

// Mock Redux functionality
const useSelector = (selector) => ({ userData: null });
const useDispatch = () => (action) => console.log("Dispatch:", action);


// Mock image - using a placeholder


function HomePage() {
  const user = useSelector((state) => state.editUser?.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Initialize particles
    const initialParticles = Array.from({ length: 300 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2,
      opacity: Math.random() * 0.3 + 0.1,
    }));
    setParticles(initialParticles);

    // Animation loop
    const animateParticles = () => {
      setParticles((prevParticles) =>
        prevParticles.map((p) => ({
          ...p,
          x: (p.x + p.speedX + 100) % 100,
          y: (p.y + p.speedY + 100) % 100,
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchResponse = async () => {
      try {
        const response = await startUser();
        if (response.statusCode == 200) {
          dispatch(addUserData(response.data));
        } else {
          dispatch(addUserData(""));
        }
      } catch (error) {
        console.log(
          "Printing from Home Page there was a error ->",
          error.message
        );
        dispatch(addUserData(""));
      }
    };
    fetchResponse();
  }, []);

  const hadnleGetStartedClick = () => {
  
      navigate("/dashboard");

    
  };

  const features = [
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "AI-Powered Generation",
      description:
        "Leverage advanced AI to create compelling resume content tailored to your industry and role.",
    },
    {
      icon: <Settings className="w-6 h-6" />,
      title: "Smart Customization",
      description:
        "Intelligent templates that adapt to your experience level and career objectives.",
    },
    {
      icon: <Download className="w-6 h-6" />,
      title: "Multiple Formats",
      description:
        "Export your resume in various formats including PDF, Word, and more.",
    },
  ];

  const stats = [
    { number: "10K+", label: "Resumes Created" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9", label: "User Rating" },
    { number: "24/7", label: "Support" },
  ];

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-900 to-black overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Floating Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              opacity: particle.opacity,
              transition: "left 0.5s linear, top 0.5s linear",
            }}
          />
        ))}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-purple-900/10"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 pb-20 overflow-hidden">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <div className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-lg px-4 py-2 text-sm font-medium text-white ring-1 ring-white/10 mb-8 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20">
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              #1 AI Resume Builder - Professional Grade
            </div>

            {/* Main Heading */}
            <h1 className="mb-8 text-5xl font-bold tracking-tight text-white sm:text-7xl">
              <span className="block">Create Your</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent bg-size-200 animate-pulse">
                Perfect Resume
              </span>
              <span className="block">in Minutes</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mb-10 max-w-2xl text-xl leading-8 text-gray-300">
              Harness the power of AI to build professional resumes that get
              noticed. Stand out from the competition with intelligent design
              and compelling content.
            </p>

            {/* CTA Button */}
            <div className="flex justify-center mb-16">
              <button
                onClick={hadnleGetStartedClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-2xl shadow-lg backdrop-blur-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-cyan-500/25 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-900 border border-white/10"
              >
                <Rocket className="w-5 h-5 mr-2 transition-transform group-hover:translate-x-1" />
                Get Started Free
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 mb-16">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-white/5 backdrop-blur-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  <div className="text-3xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Hero Image */}
          <div className="mx-auto max-w-5xl">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-500/20 rounded-3xl blur-3xl transform rotate-1"></div>
              <div className="relative overflow-hidden bg-white/5 backdrop-blur-lg rounded-3xl shadow-2xl ring-1 ring-white/10 border border-white/10 transition-all duration-300 hover:shadow-cyan-500/20">
                {/* Browser Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-cyan-500/80 to-purple-600/80 backdrop-blur-lg">
                  <div className="flex space-x-2">
                    <Circle className="w-3 h-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer hover:scale-110" />
                    <Circle className="w-3 h-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer hover:scale-110" />
                    <Circle className="w-3 h-3 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer hover:scale-110" />
                  </div>
                  <div className="text-white/90 text-sm font-medium">
                    AI Resume Builder
                  </div>
                  <Info className="w-4 h-4 text-white/80 hover:text-white transition-colors duration-200 cursor-pointer hover:scale-110" />
                </div>

                {/* Screenshot */}
                <div className="p-2 bg-gray-900/20">
                  <img
                    className="w-full h-auto rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
                    src='./heroSnapshot.png'
                    alt="AI Resume Builder Dashboard"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl mb-4">
              Why Choose Our AI Resume Builder?
            </h2>
            <p className="text-lg text-gray-300">
              Experience the future of resume creation with our cutting-edge AI
              technology
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 bg-white/5 backdrop-blur-lg rounded-2xl shadow-lg border border-white/10 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-white bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 border border-white/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-600/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .bg-size-200 {
          background-size: 200% 200%;
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
    </>
    
  );
}

export default HomePage;
