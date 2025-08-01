import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, CheckCircle, Star, Users, BookOpen, Target, Zap, ArrowRight, Menu, X, Link } from 'lucide-react';

// Mock navigation function
const useNavigate = () => (path) => console.log('Navigate to:', path);

export default function Landingpage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const navigate = useNavigate();

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer at Google",
      content: "Landed my dream job at Google after just 2 weeks of practice. The AI feedback was incredibly detailed and helped me identify my weak spots.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "Product Manager at Microsoft", 
      content: "The mock interviews felt so real. I went into my actual interviews with complete confidence and got offers from 3 companies.",
      rating: 5
    },
    {
      name: "Priya Patel",
      role: "Data Scientist at Meta",
      content: "The personalized study plan adapted to my learning style. I improved my technical interview skills by 300% in just one month.",
      rating: 5
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating Particles */}
        {[...Array(400)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 4}s`
            }}
          />
        ))}
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/10 to-purple-900/10"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center bg-white/5 backdrop-blur-lg border border-white/10 rounded-full px-4 py-1 mb-6 transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/20">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Trusted by 50,000+ job seekers</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">Ace Your Interview</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-size-200 animate-gradient">
                  With AI Precision
                </span>
              </h1>
              
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Master any interview with personalized AI coaching, real-time feedback, and proven strategies. 
                Transform your interview anxiety into unshakeable confidence.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button 
                  onClick={() => navigate('/Interview-prep/dashboard')}
                  className="group bg-gradient-to-r from-cyan-500 to-purple-600 px-6 py-3 rounded-xl text-white font-semibold hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 shadow-lg backdrop-blur-lg border border-white/10 hover:shadow-cyan-500/25 hover:scale-105"
                >
                  Start Free Trial
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition-all duration-300 backdrop-blur-lg hover:shadow-lg hover:shadow-cyan-500/10">
                  <Play className="w-5 h-5 mr-2 text-purple-400 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">94%</div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="text-2xl font-bold text-purple-400 mb-1">2.5x</div>
                  <div className="text-xs text-gray-400">Faster Placement</div>
                </div>
                <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-pink-500/10">
                  <div className="text-2xl font-bold text-pink-400 mb-1">50K+</div>
                  <div className="text-xs text-gray-400">Success Stories</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="bg-white/5 backdrop-blur-lg p-2 rounded-2xl border border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl aspect-video flex items-center justify-center backdrop-blur-sm">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-lg border border-white/10">
                      <Zap className="w-8 h-8 text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-white">AI Interview Simulation</h3>
                    <p className="text-gray-400">Experience realistic interview practice with our AI technology</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Powerful Features
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Everything you need to prepare for your next interview
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-6 h-6 text-cyan-400" />,
                title: "Personalized AI Coach",
                description: "Get tailored feedback and improvement strategies based on your unique interview style and career goals."
              },
              {
                icon: <BookOpen className="w-6 h-6 text-purple-400" />,
                title: "Real Interview Scenarios",
                description: "Practice with thousands of real interview questions from top companies like Google, Amazon, and Meta."
              },
              {
                icon: <Users className="w-6 h-6 text-blue-400" />,
                title: "Live Mock Interviews",
                description: "Experience realistic interview simulations with AI interviewers that adapt to your responses."
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-green-400" />,
                title: "Instant Performance Analysis",
                description: "Receive detailed breakdowns of your performance with actionable insights for improvement."
              },
              {
                icon: <Zap className="w-6 h-6 text-yellow-400" />,
                title: "Industry-Specific Prep",
                description: "Specialized training modules for tech, finance, consulting, and 15+ other industries."
              },
              {
                icon: <Star className="w-6 h-6 text-orange-400" />,
                title: "Success Tracking",
                description: "Monitor your progress with detailed analytics and celebrate your improvements over time."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-400/30 transition-all duration-300 hover:bg-white/10 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 flex items-center justify-center mb-4 backdrop-blur-lg border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-purple-600/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                Success Stories
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Hear from people who transformed their careers with InterviewAI
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/20">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-center font-light mb-8 text-gray-300 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center text-cyan-400 font-semibold mb-4 backdrop-blur-lg border border-white/10">
                {testimonials[currentTestimonial].name.charAt(0)}
              </div>
              <div className="text-center">
                <div className="font-semibold text-white">{testimonials[currentTestimonial].name}</div>
                <div className="text-gray-400">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentTestimonial ? 'bg-cyan-400' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      
     

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg); 
            opacity: 0.4;
          }
          25% { 
            transform: translateY(-20px) translateX(10px) rotate(90deg); 
            opacity: 0.8;
          }
          50% { 
            transform: translateY(-40px) translateX(-10px) rotate(180deg); 
            opacity: 1;
          }
          75% { 
            transform: translateY(-20px) translateX(15px) rotate(270deg); 
            opacity: 0.6;
          }
        }
        
        .animate-float {
          animation: float linear infinite;
        }
        
        .bg-size-200 {
          background-size: 200% 200%;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}