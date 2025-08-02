import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Trophy, Award, Target, TrendingUp, Home, RotateCcw, CheckCircle, XCircle, BookOpen } from 'lucide-react';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  // Create floating particles with white color and bigger size
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    for (let i = 0; i < 80; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-white';
      
      // Bigger particles with white color
      const size = Math.random() * 6 + 3; // 3-9px instead of 1-3px
      const opacity = Math.random() * 0.6 + 0.2;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.opacity = opacity;
      particle.style.boxShadow = `0 0 ${size * 3}px rgba(255, 255, 255, 0.5)`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Enhanced animation with more movement
      const duration = Math.random() * 40 + 30;
      const delay = Math.random() * 8;
      particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite, pulse ${Math.random() * 4 + 2}s ease-in-out infinite alternate`;
      
      // More pronounced movement
      const xDirection = (Math.random() - 0.5) * 3;
      const yDirection = (Math.random() - 0.5) * 3;
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

  if (!state) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black relative overflow-hidden flex items-center justify-center">
        {/* Background Effects */}
        <div className="particles-container absolute inset-0 w-full h-full pointer-events-none"></div>
        
        {/* Dynamic Gradient Orbs */}
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 blur-3xl animate-pulse opacity-70 -left-20 -top-20"></div>
        <div className="absolute w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 blur-3xl animate-pulse opacity-60 -right-20 bottom-1/3" style={{ animationDelay: '2s' }}></div>
        
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-12 text-center max-w-lg relative z-10">
          <div className="text-6xl mb-6">📊</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            No results found
          </h2>
          <p className="text-xl text-slate-300 mb-8">Please take a test first.</p>
          <button
            onClick={() => navigate('/features/interview')}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-cyan-500/25"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const { score, total, explanations } = state;
  const percentage = Math.round((score / total) * 100);

  const getScoreColor = () => {
    if (percentage >= 80) return 'from-green-400 to-emerald-500';
    if (percentage >= 60) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getScoreEmoji = () => {
    if (percentage >= 80) return '🎉';
    if (percentage >= 60) return '👍';
    return '💪';
  };

  const getPerformanceMessage = () => {
    if (percentage >= 80) return 'Excellent work!';
    if (percentage >= 60) return 'Good job!';
    return 'Keep practicing!';
  };

  const getScoreIcon = () => {
    if (percentage >= 80) return Trophy;
    if (percentage >= 60) return Award;
    return Target;
  };

  const ScoreIcon = getScoreIcon();

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

      <div className="relative z-10 max-w-6xl mx-auto p-6">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10 mb-6">
            <ScoreIcon className="text-cyan-400" size={20} />
            <span className="text-slate-300 font-medium">Assessment Complete</span>
          </div>
          
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4">
            Mock Interview Results
          </h1>
          <p className="text-slate-300 text-xl">Review your performance and keep improving</p>
        </div>

        {/* Enhanced Score Card */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 mb-8 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
          {/* Card glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          
          <div className="text-center mb-8">
            <div className="text-8xl mb-6 animate-bounce">{getScoreEmoji()}</div>
            <h2 className="text-6xl font-bold mb-4">
              <span className={`bg-gradient-to-r ${getScoreColor()} bg-clip-text text-transparent`}>
                {score} / {total}
              </span>
            </h2>
            <div className="text-3xl font-semibold text-white mb-4">
              {percentage}% Score
            </div>
            <p className="text-xl text-slate-300 font-medium">{getPerformanceMessage()}</p>
          </div>

          {/* Enhanced Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-slate-400 mb-3 font-medium">
              <span>Performance</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-white/10 backdrop-blur-sm rounded-full h-4 shadow-inner border border-white/20">
              <div
                className={`h-4 rounded-full transition-all duration-1000 shadow-lg ${
                  percentage >= 80
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500'
                    : percentage >= 60
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500'
                    : 'bg-gradient-to-r from-red-400 to-pink-500'
                } relative overflow-hidden`}
                style={{ width: `${percentage}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Score Breakdown */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300 group/stat">
              <div className="flex items-center justify-center mb-3">
                <CheckCircle className="text-green-400 group-hover/stat:scale-110 transition-transform" size={24} />
              </div>
              <div className="text-3xl font-bold text-green-400 mb-1">{score}</div>
              <div className="text-sm text-slate-400 font-medium">Correct</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-red-500/30 hover:shadow-lg hover:shadow-red-500/10 transition-all duration-300 group/stat">
              <div className="flex items-center justify-center mb-3">
                <XCircle className="text-red-400 group-hover/stat:scale-110 transition-transform" size={24} />
              </div>
              <div className="text-3xl font-bold text-red-400 mb-1">
                {total - score}
              </div>
              <div className="text-sm text-slate-400 font-medium">Incorrect</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group/stat">
              <div className="flex items-center justify-center mb-3">
                <Target className="text-blue-400 group-hover/stat:scale-110 transition-transform" size={24} />
              </div>
              <div className="text-3xl font-bold text-blue-400 mb-1">{total}</div>
              <div className="text-sm text-slate-400 font-medium">Total</div>
            </div>
          </div>
        </div>

        {/* Enhanced Explanations */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 mb-8 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
          {/* Card glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          
          <h3 className="text-3xl font-bold text-white mb-8 flex items-center">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="text-white" size={24} />
            </div>
            Question Explanations
          </h3>

          {explanations.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">📝</div>
              <p className="text-slate-300 text-xl font-medium">No explanations available for this test.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {explanations.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-white/10 backdrop-blur-sm border-l-4 border-cyan-500 p-6 rounded-r-xl hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300 group/explanation"
                >
                  <div className="flex items-start">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 mt-1 group-hover/explanation:scale-110 transition-transform">
                      {ex.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-200 leading-relaxed text-lg">
                        {ex.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Enhanced CTA */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/10 p-10 hover:border-white/20 transition-all duration-500 relative overflow-hidden group">
          {/* Card glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl"></div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-6">
              <TrendingUp className="text-cyan-400 mr-3" size={32} />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Ready for your next challenge?
              </h3>
            </div>
            <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto">
              Practice makes perfect. Keep improving your interview skills and boost your confidence for the real thing!
            </p>
            <button
              onClick={() => navigate('/features/interview')}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-10 py-4 rounded-xl hover:from-cyan-500 hover:to-blue-500 transition-all duration-300 font-bold text-xl shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 active:scale-95"
            >
              Take Another Test
            </button>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-12">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
            <p className="text-slate-300 text-lg font-medium">
              Every expert was once a beginner • Keep learning • You've got this! 🚀
            </p>
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
            transform: translate(calc(var(--x-direction) * 40px), calc(var(--y-direction) * -30px)) rotate(90deg);
          }
          50% {
            transform: translate(calc(var(--x-direction) * 80px), calc(var(--y-direction) * 40px)) rotate(180deg);
          }
          75% {
            transform: translate(calc(var(--x-direction) * 30px), calc(var(--y-direction) * -50px)) rotate(270deg);
          }
        }
        
        @keyframes pulse {
          0% {
            opacity: 0.2;
            transform: scale(1);
          }
          100% {
            opacity: 0.8;
            transform: scale(1.2);
          }
        }
        
        .particle {
          animation-fill-mode: both;
        }
        
        /* Enhanced glassmorphism effects */
        .backdrop-blur-xl {
          backdrop-filter: blur(20px);
        }
        
        /* Enhanced hover effects */
        .group:hover .group-hover\\:scale-110 {
          transform: scale(1.1);
        }
        
        /* Score animation */
        @keyframes scoreReveal {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        
        .animate-score {
          animation: scoreReveal 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        /* Button glow effects */
        button:not(:disabled):hover {
          box-shadow: 0 20px 40px -12px rgba(6, 182, 212, 0.4);
        }
      `}</style>
    </div>
  );
}