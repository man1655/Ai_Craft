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
  const [activeQuestion, setActiveQuestion] = useState(0);

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

    for (let i = 0; i < 40; i++) { // Reduced number for better performance
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full';
      
      const size = Math.random() * 3 + 1;
      const opacity = Math.random() * 0.4 + 0.1;
      const hue = Math.random() * 60 + 180;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.background = `hsl(${hue}, 70%, 60%)`;
      particle.style.opacity = opacity;
      particle.style.boxShadow = `0 0 ${size * 2}px hsl(${hue}, 70%, 60%)`;
      
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 5;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
      
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
      {/* Background Elements */}
      <div className="particles-container absolute inset-0 w-full h-full pointer-events-none"></div>
      
      {/* Dynamic Gradient Orbs */}
      <div 
        className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl opacity-70 transition-transform duration-1000"
        style={{
          left: `${mousePosition.x * 0.1 - 10}%`,
          top: `${mousePosition.y * 0.1 - 10}%`,
        }}
      ></div>
      <div 
        className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl opacity-60"
        style={{
          right: `${(100 - mousePosition.x) * 0.08}%`,
          bottom: `${(100 - mousePosition.y) * 0.12 + 20}%`,
        }}
      ></div>

      {/* Main Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl mb-8 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-2">
                {state.testName || 'Mock Interview Test'}
              </h1>
              <p className="text-slate-300 text-lg font-medium">
                {state.testDescription || 'Answer all questions to complete your assessment'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex-1 sm:flex-none">
                <div className="text-sm font-semibold text-slate-400 mb-1">Progress</div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {answeredQuestions} / {totalQuestions}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 flex-1 sm:flex-none">
                <div className="text-sm font-semibold text-slate-400 mb-1">Time</div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                  25:00
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-3 shadow-inner border border-white/20">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-3 rounded-full transition-all duration-700 shadow-lg relative overflow-hidden"
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

        {/* Question Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 pb-2">
            {state.questions.map((q, index) => (
              <button
                key={q.id}
                onClick={() => setActiveQuestion(index)}
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                  answers[q.id] 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30'
                    : activeQuestion === index
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/10 text-slate-300 hover:bg-white/20'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Questions Column */}
          <div className="lg:col-span-2 space-y-6">
            {state.questions.length > 0 && (
              <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-6 sm:p-8 transition-all duration-500">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold mr-4 ${
                      answers[state.questions[activeQuestion].id] 
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30' 
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
                    }`}>
                      {activeQuestion + 1}
                    </div>
                    <h2 className="text-xl font-semibold text-white">
                      Question {activeQuestion + 1} of {totalQuestions}
                    </h2>
                  </div>
                  {answers[state.questions[activeQuestion].id] && (
                    <div className="flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-sm">
                      <CheckCircle className="mr-1" size={16} />
                      Answered
                    </div>
                  )}
                </div>
                
                <QuestionCard
                  question={state.questions[activeQuestion]}
                  selected={answers[state.questions[activeQuestion].id]}
                  setSelected={(value) => setAnswers({ ...answers, [state.questions[activeQuestion].id]: value })}
                />
                
                {/* Navigation Controls */}
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setActiveQuestion(prev => Math.max(0, prev - 1))}
                    disabled={activeQuestion === 0}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                      activeQuestion === 0 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg'
                    }`}
                  >
                    <ArrowRight className="transform rotate-180 mr-2" />
                    Previous
                  </button>
                  
                  <button
                    onClick={() => setActiveQuestion(prev => Math.min(state.questions.length - 1, prev + 1))}
                    disabled={activeQuestion === state.questions.length - 1}
                    className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all ${
                      activeQuestion === state.questions.length - 1 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg'
                    }`}
                  >
                    Next
                    <ArrowRight className="ml-2" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Submit Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
                    Ready to Submit?
                  </h3>
                  <div className="flex items-center">
                    {allAnswered ? (
                      <>
                        <CheckCircle className="text-green-400 mr-2" size={20} />
                        <p className="text-slate-300">
                          All questions completed. Review your answers before submitting.
                        </p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="text-yellow-400 mr-2" size={20} />
                        <p className="text-slate-300">
                          {totalQuestions - answeredQuestions} question{totalQuestions - answeredQuestions > 1 ? 's' : ''} remaining.
                        </p>
                      </>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered || isSubmitting}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 w-full sm:w-auto ${
                    allAnswered && !isSubmitting
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95'
                      : 'bg-white/10 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <Zap className="mr-2" size={20} fill="currentColor" />
                      Submit Test
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Tips Section */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-300/20 hover:border-blue-300/40 transition-all duration-500">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-2 rounded-lg mr-3">
                  <Lightbulb className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Test Tips
                </h4>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <Clock className="text-cyan-400 mr-2" size={18} />
                    <span className="font-medium text-white">Time Management</span>
                  </div>
                  <p className="text-slate-300 text-sm">Allocate your time wisely across all questions.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <Target className="text-purple-400 mr-2" size={18} />
                    <span className="font-medium text-white">Stay Focused</span>
                  </div>
                  <p className="text-slate-300 text-sm">Read each question carefully before answering.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300">
                  <div className="flex items-center mb-2">
                    <Brain className="text-green-400 mr-2" size={18} />
                    <span className="font-medium text-white">Critical Thinking</span>
                  </div>
                  <p className="text-slate-300 text-sm">Apply your knowledge to select the best answer.</p>
                </div>
              </div>
            </div>
            
            {/* Summary Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <h4 className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
                Test Summary
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Total Questions</span>
                  <span className="font-bold text-white">{totalQuestions}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Answered</span>
                  <span className="font-bold text-green-400">{answeredQuestions}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Remaining</span>
                  <span className="font-bold text-yellow-400">{totalQuestions - answeredQuestions}</span>
                </div>
                
                <div className="pt-4 border-t border-white/10">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(calc(var(--x-direction) * 20px), calc(var(--y-direction) * -15px)) rotate(90deg);
          }
          50% {
            transform: translate(calc(var(--x-direction) * 40px), calc(var(--y-direction) * 20px)) rotate(180deg);
          }
          75% {
            transform: translate(calc(var(--x-direction) * 15px), calc(var(--y-direction) * -30px)) rotate(270deg);
          }
        }
        
        .particle {
          will-change: transform;
        }
      `}</style>
    </div>
  );
}