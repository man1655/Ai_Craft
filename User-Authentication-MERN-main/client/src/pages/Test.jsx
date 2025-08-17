import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { submitAnswers } from '../api';
import { 
  Clock, CheckCircle, AlertCircle, Lightbulb, Target, Brain, Zap, 
  ArrowRight, ArrowLeft, Flag, BookOpen, Timer, Award, ChevronRight 
} from 'lucide-react';

export default function Test() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  // Timer functionality
  useEffect(() => {
    if (!isTimerActive || timeRemaining <= 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          handleSubmit(); // Auto-submit when time runs out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerActive, timeRemaining]);

  const formatTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [timeRemaining]);

  const handleSubmit = useCallback(async () => {
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setIsTimerActive(false);
    
    try {
      const result = await submitAnswers(state.testId, answers);
      navigate('/features/interview/result', { state: result });
    } catch (error) {
      console.error('Error submitting answers:', error);
      setIsSubmitting(false);
      setIsTimerActive(true);
    }
  }, [state?.testId, answers, navigate, isSubmitting]);

  // Enhanced mouse tracking with throttling
  useEffect(() => {
    let timeoutId;
    const handleMouseMove = (e) => {
      if (timeoutId) return;
      
      timeoutId = setTimeout(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 100,
          y: (e.clientY / window.innerHeight) * 100
        });
        timeoutId = null;
      }, 16); // ~60fps
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // Optimized particle system
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    // Clear existing particles
    particlesContainer.innerHTML = '';

    const fragment = document.createDocumentFragment();
    const particleCount = window.innerWidth < 768 ? 20 : 30; // Fewer particles on mobile

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full pointer-events-none';
      
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.3 + 0.1;
      const hue = Math.random() * 80 + 180; // Blue-cyan range
      
      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: hsl(${hue}, 70%, 60%);
        opacity: ${opacity};
        box-shadow: 0 0 ${size * 3}px hsl(${hue}, 70%, 60%);
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 25 + 15}s ease-in-out ${Math.random() * 5}s infinite;
      `;
      
      fragment.appendChild(particle);
    }

    particlesContainer.appendChild(fragment);

    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (showConfirmSubmit) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          if (activeQuestion > 0) {
            setActiveQuestion(prev => prev - 1);
          }
          break;
        case 'ArrowRight':
          if (activeQuestion < state.questions.length - 1) {
            setActiveQuestion(prev => prev + 1);
          }
          break;
        case 'Enter':
          if (e.ctrlKey && allAnswered) {
            setShowConfirmSubmit(true);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeQuestion, state?.questions?.length, showConfirmSubmit]);

  if (!state || !state.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center relative overflow-hidden">
        <div className="particles-container absolute inset-0 w-full h-full"></div>
        
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/10 p-8 sm:p-12 text-center max-w-lg relative z-10 transform hover:scale-105 transition-all duration-500">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
            <AlertCircle className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            No Test Data Found
          </h2>
          <p className="text-xl text-slate-300 mb-8 leading-relaxed">
            Please start a new test from the dashboard to continue.
          </p>
          <button
            onClick={() => navigate('/features/interview')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/25 flex items-center justify-center gap-2 mx-auto"
          >
            <BookOpen size={20} />
            Start New Test
          </button>
        </div>
      </div>
    );
  }

  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = state.questions.length;
  const allAnswered = answeredQuestions === totalQuestions;
  const progressPercentage = (answeredQuestions / totalQuestions) * 100;
  const timeWarning = timeRemaining < 300; // Last 5 minutes

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="particles-container absolute inset-0 w-full h-full"></div>
      
      {/* Dynamic Gradient Orbs with smoother movement */}
      <div 
        className="fixed w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 blur-3xl transition-all duration-1000 ease-out"
        style={{
          left: `${mousePosition.x * 0.08}%`,
          top: `${mousePosition.y * 0.08}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      <div 
        className="fixed w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/15 to-blue-500/15 blur-3xl transition-all duration-1000 ease-out"
        style={{
          right: `${(100 - mousePosition.x) * 0.06}%`,
          bottom: `${(100 - mousePosition.y) * 0.06}%`,
          transform: 'translate(50%, 50%)',
        }}
      />

      {/* Main Layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Enhanced Header Section */}
        <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl mb-8 p-6 sm:p-8 hover:border-white/20 transition-all duration-500">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Brain className="text-white" size={24} />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                  {state.testName || 'Mock Interview Assessment'}
                </h1>
              </div>
              <p className="text-slate-300 text-lg leading-relaxed max-w-2xl">
                {state.testDescription || 'Complete all questions within the time limit to receive your personalized assessment.'}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-4 border border-cyan-500/20 flex-1 lg:flex-none min-w-[140px]">
                <div className="text-sm font-semibold text-cyan-400 mb-1 flex items-center gap-2">
                  <Flag size={14} />
                  Progress
                </div>
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {answeredQuestions} / {totalQuestions}
                </div>
              </div>
              
              <div className={`backdrop-blur-sm rounded-2xl p-4 border flex-1 lg:flex-none min-w-[140px] transition-all duration-300 ${
                timeWarning 
                  ? 'bg-gradient-to-br from-red-500/10 to-orange-600/10 border-red-500/20' 
                  : 'bg-gradient-to-br from-purple-500/10 to-pink-600/10 border-purple-500/20'
              }`}>
                <div className={`text-sm font-semibold mb-1 flex items-center gap-2 ${
                  timeWarning ? 'text-red-400' : 'text-purple-400'
                }`}>
                  <Timer size={14} />
                  Time Left
                </div>
                <div className={`text-2xl sm:text-3xl font-bold ${
                  timeWarning 
                    ? 'bg-gradient-to-r from-red-400 to-orange-500 bg-clip-text text-transparent animate-pulse' 
                    : 'bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent'
                }`}>
                  {formatTime}
                </div>
              </div>
            </div>
          </div>
          
          {/* Enhanced Progress Bar */}
          <div className="mt-6 space-y-3">
            <div className="w-full bg-white/5 backdrop-blur-sm rounded-full h-4 shadow-inner border border-white/10 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 h-4 rounded-full transition-all duration-700 shadow-lg relative"
                style={{ width: `${Math.max(progressPercentage, 2)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse rounded-full" />
                <div className="absolute right-0 top-0 w-2 h-4 bg-white/50 rounded-r-full animate-pulse" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-slate-400">Started</span>
              <div className="flex items-center gap-2">
                <Award size={16} className="text-yellow-400" />
                <span className="text-sm font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  {Math.round(progressPercentage)}% Complete
                </span>
              </div>
              <span className="text-sm font-medium text-slate-400">Complete</span>
            </div>
          </div>
        </div>

        {/* Enhanced Question Navigation */}
        <div className="mb-8">
          <div className="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <BookOpen size={20} className="text-cyan-400" />
                Question Navigation
              </h3>
              <span className="text-sm text-slate-400">Click to jump to question</span>
            </div>
            <div className="overflow-x-auto">
              <div className="flex gap-2 pb-2 min-w-max">
                {state.questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuestion(index)}
                    className={`relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all duration-300 transform hover:scale-110 ${
                      answers[q.id] !== undefined
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30 hover:shadow-green-500/50'
                        : activeQuestion === index
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 ring-2 ring-blue-400/50'
                          : 'bg-white/10 text-slate-300 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {index + 1}
                    {answers[q.id] !== undefined && (
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center">
                        <CheckCircle size={10} className="text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Questions Column - Takes more space */}
          <div className="xl:col-span-3 space-y-6">
            {state.questions.length > 0 && (
              <div className="bg-white/5 rounded-3xl shadow-2xl border border-white/10 p-6 sm:p-8 transition-all duration-500 hover:border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 ${
                      answers[state.questions[activeQuestion].id] !== undefined
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-green-500/30' 
                        : 'bg-gradient-to-r from-slate-600 to-slate-700 text-white'
                    }`}>
                      {activeQuestion + 1}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Question {activeQuestion + 1}
                      </h2>
                      <p className="text-slate-400">of {totalQuestions} total</p>
                    </div>
                  </div>
                  {answers[state.questions[activeQuestion].id] !== undefined && (
                    <div className="flex items-center bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-medium border border-green-500/20">
                      <CheckCircle className="mr-2" size={16} />
                      Answered
                    </div>
                  )}
                </div>
                
                <QuestionCard
                  question={state.questions[activeQuestion]}
                  selected={answers[state.questions[activeQuestion].id]}
                  setSelected={(value) => {
                    setAnswers(prev => ({
                      ...prev,
                      [state.questions[activeQuestion].id]: value
                    }));
                  }}
                />
                
                {/* Enhanced Navigation Controls */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setActiveQuestion(prev => Math.max(0, prev - 1))}
                    disabled={activeQuestion === 0}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeQuestion === 0 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    <ArrowLeft size={18} />
                    Previous
                  </button>
                  
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>Use</span>
                    <kbd className="bg-white/10 px-2 py-1 rounded text-xs">←</kbd>
                    <kbd className="bg-white/10 px-2 py-1 rounded text-xs">→</kbd>
                    <span>to navigate</span>
                  </div>
                  
                  <button
                    onClick={() => setActiveQuestion(prev => Math.min(state.questions.length - 1, prev + 1))}
                    disabled={activeQuestion === state.questions.length - 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeQuestion === state.questions.length - 1 
                        ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                        : 'bg-white/10 text-white hover:bg-white/20 hover:shadow-lg transform hover:scale-105'
                    }`}
                  >
                    Next
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}
            
            {/* Enhanced Submit Section */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-3">
                    Ready to Submit Your Test?
                  </h3>
                  <div className="flex items-center gap-3 mb-2">
                    {allAnswered ? (
                      <>
                        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="text-white" size={16} />
                        </div>
                        <p className="text-slate-300 text-lg">
                          Excellent! All questions have been completed.
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <AlertCircle className="text-white" size={16} />
                        </div>
                        <p className="text-slate-300 text-lg">
                          {totalQuestions - answeredQuestions} question{totalQuestions - answeredQuestions > 1 ? 's' : ''} still need{totalQuestions - answeredQuestions === 1 ? 's' : ''} your attention.
                        </p>
                      </>
                    )}
                  </div>
                  <p className="text-slate-400 text-sm">
                    Press <kbd className="bg-white/10 px-2 py-1 rounded text-xs">Ctrl + Enter</kbd> to submit quickly
                  </p>
                </div>
                
                <button
                  onClick={() => setShowConfirmSubmit(true)}
                  disabled={!allAnswered || isSubmitting}
                  className={`px-8 py-4 rounded-2xl font-bold transition-all duration-300 w-full lg:w-auto min-w-[200px] ${
                    allAnswered && !isSubmitting
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-400 hover:to-emerald-500 shadow-lg hover:shadow-green-500/30 transform hover:scale-105 active:scale-95'
                      : 'bg-white/5 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Zap size={20} fill="currentColor" />
                      Submit Test
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          {/* Enhanced Sidebar Column */}
          <div className="space-y-6">
            {/* Test Tips */}
            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 backdrop-blur-xl rounded-2xl p-6 border border-blue-300/20 hover:border-blue-300/40 transition-all duration-500">
              <div className="flex items-center mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-3 rounded-xl mr-3 shadow-lg">
                  <Lightbulb className="text-white" size={20} />
                </div>
                <h4 className="font-bold text-xl bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Pro Tips
                </h4>
              </div>
              
              <div className="space-y-3">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="flex items-center mb-2">
                    <Clock className="text-cyan-400 mr-3 group-hover:scale-110 transition-transform" size={18} />
                    <span className="font-medium text-white">Time Management</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">Monitor the timer and pace yourself evenly across questions.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all duration-300 group">
                  <div className="flex items-center mb-2">
                    <Target className="text-purple-400 mr-3 group-hover:scale-110 transition-transform" size={18} />
                    <span className="font-medium text-white">Stay Focused</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">Read each question thoroughly before selecting your answer.</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300 group">
                  <div className="flex items-center mb-2">
                    <Brain className="text-green-400 mr-3 group-hover:scale-110 transition-transform" size={18} />
                    <span className="font-medium text-white">Think Critically</span>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">Apply logical reasoning to identify the best possible answer.</p>
                </div>
              </div>
            </div>
            
            {/* Enhanced Summary Section */}
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500">
              <h4 className="font-bold text-xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <Award size={20} />
                Test Overview
              </h4>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2">
                    <BookOpen size={16} />
                    Total Questions
                  </span>
                  <span className="font-bold text-white text-lg">{totalQuestions}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-400" />
                    Completed
                  </span>
                  <span className="font-bold text-green-400 text-lg">{answeredQuestions}</span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                  <span className="text-slate-300 flex items-center gap-2">
                    <AlertCircle size={16} className="text-yellow-400" />
                    Remaining
                  </span>
                  <span className="font-bold text-yellow-400 text-lg">{totalQuestions - answeredQuestions}</span>
                </div>
                
                <div className="pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-slate-400">Completion Rate</span>
                    <span className="text-sm font-bold text-cyan-400">{Math.round(progressPercentage)}%</span>
                  </div>
                  <div className="h-3 w-full bg-white/10 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500 relative overflow-hidden"
                      style={{ width: `${Math.max(progressPercentage, 3)}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent animate-pulse rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 max-w-md w-full shadow-2xl animate-in zoom-in duration-300">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Submit Your Test?</h3>
              <p className="text-slate-300 mb-2">
                You've answered <span className="font-bold text-cyan-400">{answeredQuestions}</span> out of <span className="font-bold text-white">{totalQuestions}</span> questions.
              </p>
              <p className="text-slate-400 text-sm mb-8">
                Once submitted, you won't be able to change your answers.
              </p>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 bg-white/10 text-white px-6 py-3 rounded-xl font-medium hover:bg-white/20 transition-all duration-300"
                >
                  Review Again
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Now'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Animations & Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
            opacity: var(--opacity, 0.3);
          }
          25% {
            transform: translate(30px, -20px) rotate(90deg);
            opacity: calc(var(--opacity, 0.3) * 1.2);
          }
          50% {
            transform: translate(60px, 10px) rotate(180deg);
            opacity: var(--opacity, 0.3);
          }
          75% {
            transform: translate(20px, -40px) rotate(270deg);
            opacity: calc(var(--opacity, 0.3) * 0.8);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px currentColor;
          }
          50% {
            box-shadow: 0 0 40px currentColor, 0 0 60px currentColor;
          }
        }
        
        .particle {
          will-change: transform, opacity;
          --opacity: 0.3;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .particle {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}