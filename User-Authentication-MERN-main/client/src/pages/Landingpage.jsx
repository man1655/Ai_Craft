import React, { useState, useEffect } from 'react';
import { ChevronRight, Play, CheckCircle, Star, Users, BookOpen, Target, Zap, ArrowRight, Menu, X, Link } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-4 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute top-1/3 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 backdrop-blur-md bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                InterviewAI
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors duration-200">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors duration-200">Pricing</a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors duration-200">Success Stories</a>
            </div>

            <button 
              className="md:hidden text-gray-300 hover:text-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800/95 backdrop-blur-md border-b border-white/10">
            <div className="px-4 py-6 space-y-4">
              <a href="#features" className="block text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#pricing" className="block text-gray-300 hover:text-white transition-colors">Pricing</a>
              <a href="#testimonials" className="block text-gray-300 hover:text-white transition-colors">Success Stories</a>
              <button 
                onClick={() => navigate('/Interview-prep/dashboard')}
                className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-lg text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1 mb-6">
                <Star className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium">Trusted by 50,000+ job seekers</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-white">Ace Your Interview</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
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
                  className="group bg-gradient-to-r from-purple-500 to-cyan-500 px-6 py-3 rounded-lg text-white font-semibold hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 shadow-lg"
                >
                  Start Free Trial
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="group flex items-center px-6 py-3 border border-white/20 rounded-lg hover:bg-white/5 transition-all duration-200">
                  <Play className="w-5 h-5 mr-2 text-purple-400 group-hover:scale-110 transition-transform" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 max-w-md">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">94%</div>
                  <div className="text-xs text-gray-400">Success Rate</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-purple-400 mb-1">2.5x</div>
                  <div className="text-xs text-gray-400">Faster Placement</div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-lg">
                  <div className="text-2xl font-bold text-pink-400 mb-1">50K+</div>
                  <div className="text-xs text-gray-400">Success Stories</div>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 mt-10 lg:mt-0">
              <div className="bg-white/5 backdrop-blur-sm p-2 rounded-2xl border border-white/10">
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl aspect-video flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
      <section id="features" className="relative z-10 py-16 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
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
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-400/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/10 to-cyan-500/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative z-10 py-16 px-4 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Success Stories
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Hear from people who transformed their careers with InterviewAI
            </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl text-center font-light mb-8 text-gray-300 leading-relaxed">
              "{testimonials[currentTestimonial].content}"
            </blockquote>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-full flex items-center justify-center text-cyan-400 font-semibold mb-4">
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

      {/* CTA Section */}
      <section className="relative z-10 py-16 px-4 bg-gradient-to-r from-purple-600 to-cyan-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
            Join thousands of successful candidates who transformed their interview skills with our AI-powered platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => navigate('/Interview-prep/dashboard')}
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg"
            >
              Start Your Free Trial
              <ChevronRight className="inline-block ml-2 w-5 h-5" />
            </button>
            <button className="px-8 py-3 border border-purple-400 text-white rounded-lg hover:bg-purple-500 transition-all duration-200">
              View Pricing Plans
            </button>
          </div>
          
          <p className="text-sm text-purple-200 mt-6">
            No credit card required • 7-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-sm py-12 px-4 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                InterviewAI
              </span>
            </div>
            
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Support</a>
            </div>
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} InterviewAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}