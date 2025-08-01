import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTest } from '../api';
import { ChevronRight, Clock, Code, Zap, Star, Circle } from 'lucide-react';

export default function Home3() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const startTest = async () => {
    if (!topic.trim()) return;
    setIsLoading(true);
    try {
      const data = await generateTest(topic);
      navigate('/features/interview/test', { state: data });
    } catch (error) {
      console.error('Error generating test:', error);
      setIsLoading(false);
    }
  };

  // Create floating particles
  useEffect(() => {
    const particlesContainer = document.querySelector('.particles-container');
    if (!particlesContainer) return;

    for (let i = 0; i < 400; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle absolute rounded-full bg-white/10';
      
      // Random size between 1px and 3px
      const size = Math.random() * 2 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      
      // Random animation
      const duration = Math.random() * 30 + 20;
      const delay = Math.random() * 5;
      particle.style.animation = `float ${duration}s linear ${delay}s infinite`;
      
      // Random movement direction
      const xDirection = Math.random() > 0.5 ? 1 : -1;
      const yDirection = Math.random() > 0.5 ? 1 : -1;
      particle.style.setProperty('--x-direction', xDirection);
      particle.style.setProperty('--y-direction', yDirection);
      
      particlesContainer.appendChild(particle);
    }

    return () => {
      particlesContainer.innerHTML = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="particles-container absolute inset-0 w-full h-full pointer-events-none"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute -left-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/20 to-purple-500/20 blur-3xl animate-pulse opacity-70"></div>
      <div className="absolute -right-20 bottom-1/3 w-72 h-72 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-3xl animate-pulse opacity-70 animation-delay-2000"></div>
      <div className="absolute right-1/3 top-1/4 w-56 h-56 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-3xl animate-pulse opacity-70 animation-delay-4000"></div>

      <div className="relative z-10 flex items-center justify-center p-4 min-h-screen">
        <div className="max-w-lg w-full">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-2 animate-text">
              Mock Interview Test
            </h1>
            <p className="text-slate-300 text-lg">
              Practice your technical skills with confidence
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white/5 backdrop-blur-lg rounded-xl shadow-2xl p-8 border border-white/10 relative overflow-hidden">
            {/* Card gradient overlay */}
            <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 blur-xl pointer-events-none"></div>
            
            <div className="text-center mb-6 relative z-10">
              <h2 className="text-2xl font-semibold text-white mb-2">
                Get Started
              </h2>
              <p className="text-slate-300">
                Enter a topic to begin your mock interview session
              </p>
            </div>

            {/* Input Section */}
            <div className="space-y-4 relative z-10">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Interview Topic
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter a topic (e.g. React, Node.js, Python)"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                    className={`w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg focus:outline-none transition-all text-white placeholder-slate-400 ${
                      isLoading 
                        ? 'cursor-not-allowed' 
                        : 'focus:ring-2 focus:ring-cyan-500 focus:border-transparent'
                    }`}
                    onKeyPress={(e) => e.key === 'Enter' && !isLoading && startTest()}
                  />
                  {!isLoading && (
                    <ChevronRight className="absolute right-3 top-3.5 text-slate-400" size={20} />
                  )}
                </div>
              </div>

              <button
                onClick={startTest}
                disabled={!topic.trim() || isLoading}
                className={`w-full px-6 py-3 rounded-lg font-medium text-lg transition-all relative overflow-hidden group ${
                  !topic.trim() || isLoading
                    ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-500 shadow-lg hover:shadow-cyan-500/20'
                }`}
              >
                <div className="relative z-10 flex items-center justify-center">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Generating Test...
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2" size={20} fill="currentColor" />
                      Start Mock Interview
                    </>
                  )}
                </div>
                {!isLoading && (
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}
              </button>
            </div>

            {/* Features Section */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <h3 className="text-lg font-semibold text-white mb-4 text-center">
                What to expect:
              </h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-cyan-500/30 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500/10 to-blue-500/10 mr-3">
                      <Code className="text-cyan-400" size={20} />
                    </div>
                    <span className="text-slate-200">Realistic interview questions</span>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all hover:shadow-lg hover:shadow-purple-500/10">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 mr-3">
                      <Clock className="text-purple-400" size={20} />
                    </div>
                    <span className="text-slate-200">Topic-specific scenarios</span>
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="flex items-center">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 mr-3">
                      <Star className="text-blue-400" size={20} />
                    </div>
                    <span className="text-slate-200">Practice at your own pace</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
         
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(calc(var(--x-direction) * 50px), calc(var(--y-direction) * 50px));
          }
          100% {
            transform: translate(0, 0);
          }
        }
        .animate-text {
          background-size: 200% auto;
          animation: gradientText 3s ease infinite;
        }
        @keyframes gradientText {
          0% {
            background-position: 0% center;
          }
          50% {
            background-position: 100% center;
          }
          100% {
            background-position: 0% center;
          }
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}