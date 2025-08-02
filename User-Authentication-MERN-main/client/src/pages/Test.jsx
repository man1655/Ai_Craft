import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { submitAnswers } from '../api';
import { Clock, CheckCircle, AlertCircle, Lightbulb, Target, Brain, Zap, ArrowRight } from 'lucide-react';

export default function Test() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const result = await submitAnswers(state.testId, answers);
      navigate('/features/interview/reasult', { state: result });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setIsSubmitting(false);
    }
  };

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create floating particles
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    for (let i = 0; i < 60; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full';
      
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.4 + 0.1;
      const hue = Math.random() * 60 + 180;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `hsl(${hue}, 70%, 60%)`;
      particle.style.opacity = opacity;
      particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 70%, 60%)`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.random() * 40 + 30;
      const delay = Math.random() * 8;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite, pulse ${Math.random() * 4 + 2}s ease-in-out infinite alternate`;
      
      const xDirection = (Math.random() - 0.5) * 2;
      const yDirection = (Math.random() - 0.5) * 2;
      particle.style.setProperty('--x-direction', xDirection);
      particle.style.setProperty('--y-direction', yDirection);
      
      particlesContainer.appendChild(particle);
    }

    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  if (!state || !state.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black flex items-center justify-center relative overflow-hidden">
        {/* Background Effects */}
        <div className="particles-container absolute inset-0 w-full h-full pointer-events-none"></div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-12 text-center max-w-lg relative z-10">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            No test data found
          </h2>
          <p className="text-xl text-slate-300 mb-8">Please start a new test from the home page.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/25"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = state.questions.length;
  const allAnswered = answeredQuestions === totalQuestions;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="particles-container absolute inset-0 w-full h-full pointer-events-none"></div>
      
      {/* Dynamic Gradient Orbs with mouse tracking */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl animate-pulse opacity-70 transition-transform duration-1000"
        style={{
          left: `${mousePosition.x * 0.1 - 10}%`,
          top: `${mousePosition.y * 0.1 - 10}%`,
        }}
      ></div>
      <div 
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl animate-pulse opacity-60"
        style={{
          right: `${(100 - mousePosition.x) * 0.08}%`,
          bottom: `${(100 - mousePosition.y) * 0.12 + 20}%`,
          animationDelay: '2s'
        }}
      ></div>
      <div 
        className="absolute w-72 h-72 rounded-full bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-teal-500/20 blur-3xl animate-pulse opacity-50"
        style={{
          right: `${mousePosition.x * 0.05 + 30}%`,
          top: `${mousePosition.y * 0.08 + 20}%`,
          animationDelay: '4s'
        }}
      ></div>

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Enhanced Header */}
      <div className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                Mock Interview Test
              </h1>
              <p className="text-slate-300 text-lg font-medium">
                Answer all questions to complete your assessment
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-sm font-semibold text-slate-400 mb-1">Progress</div>
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {answeredQuestions} / {totalQuestions}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="relative">
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-4 shadow-inner border border-white/20">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-700 shadow-lg relative overflow-hidden"
                style={{ width: `${progressPercentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
            <div className="flex justify-between mt-3">
              <span className="text-sm font-medium text-slate-400">Start</span>
              <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {Math.round(progressPercentage)}% Complete
              </span>
              <span className="text-sm font-medium text-slate-400">Finish</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto p-8">
        <div className="grid gap-8">
          {state.questions.map((q, index) => (
            <div key={q.id} className="relative group">
              {/* Enhanced Question Number Badge */}
              <div className="absolute -left-6 -top-4 z-20">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold shadow-2xl transition-all duration-500 transform group-hover:scale-110 ${
                  answers[q.id] 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/30 animate-pulse' 
                    : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white group-hover:from-cyan-500 group-hover:to-blue-500'
                }`}>
                  {answers[q.id] ? <CheckCircle size={24} /> : index + 1}
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-8 ml-6 hover:border-white/20 hover:shadow-cyan-500/10 transition-all duration-500 group-hover:transform group-hover:scale-[1.02]">
                {/* Card glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
                
                <QuestionCard
                  question={q}
                  selected={answers[q.id]}
                  setSelected={(value) => setAnswers({ ...answers, [q.id]: value })}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Submit Section */}
        <div className="mt-16 bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-10 border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
          {/* Submit section glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                Ready to Submit?
              </h3>
              <div className="flex items-center space-x-3">
                {allAnswered ? (
                  <>
                    <CheckCircle className="text-green-400" size={24} />
                    <p className="text-slate-300 text-xl font-medium">
                      Excellent! All questions completed. You can now submit your test.
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="text-yellow-400" size={24} />
                    <p className="text-slate-300 text-xl font-medium">
                      Please answer {totalQuestions - answeredQuestions} more question{totalQuestions - answeredQuestions > 1 ? 's' : ''} to continue.
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className={`px-12 py-5 rounded-xl font-bold text-xl transition-all duration-300 transform ${
                allAnswered && !isSubmitting
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-2xl hover:shadow-green-500/30 hover:scale-105 active:scale-95'
                  : 'bg-white/10 text-slate-500 cursor-not-allowed backdrop-blur-sm'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Submitting Test...
                </div>
              ) : (
                <div className="flex items-center">
                  <Zap className="mr-3" size={24} fill="currentColor" />
                  Submit Test
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Enhanced Tips Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 backdrop-blur-xl rounded-2xl p-8 border border-blue-300/20 hover:border-blue-300/40 transition-all duration-500 group">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
              <Lightbulb className="text-white" size={24} />
            </div>
            <h4 className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Pro Tips for Success
            </h4>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-cyan-500/30 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group/tip">
              <div className="flex items-center mb-3">
                <Clock className="text-cyan-400 mr-3 group-hover/tip:scale-110 transition-transform" size={20} />
                <span className="font-semibold text-white">Take Your Time</span>
              </div>
              <p className="text-slate-300 text-sm">Read each question carefully and consider all options before selecting.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-purple-500/30 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group/tip">
              <div className="flex items-center mb-3">
                <Target className="text-purple-400 mr-3 group-hover/tip:scale-110 transition-transform" size={20} />
                <span className="font-semibold text-white">Stay Flexible</span>
              </div>
              <p className="text-slate-300 text-sm">You can change your answers anytime before final submission.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group/tip">
              <div className="flex items-center mb-3">
                <Brain className="text-green-400 mr-3 group-hover/tip:scale-110 transition-transform" size={20} />
                <span className="font-semibold text-white">Think Critically</span>
              </div>
              <p className="text-slate-300 text-sm">Apply your knowledge and reasoning to find the best answer.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(calc(var(--x-direction) * 30px), calc(var(--y-direction) * -20px)) rotate(90deg);
          }
          50% {
            transform: translate(calc(var(--x-direction) * 60px), calc(var(--y-direction) * 30px)) rotate(180deg);
          }
          75% {
            transform: translate(calc(var(--x-direction) * 20px), calc(var(--y-direction) * -40px)) rotate(270deg);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.2;
            transform: scale(1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.5);
          }
        }
        
        .particle {
          animation-fill-mode: both;
        }
        
        /* Enhanced glassmorphism effects */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        /* Question card hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        /* Submit button glow */
        button:not(:disabled):hover {
          box-shadow: 0 20px 40px -12px rgba(34, 197, 94, 0.4);
        }
        
        /* Progress bar shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }
        
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}