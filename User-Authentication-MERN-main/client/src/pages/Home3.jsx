import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateTest } from '../api';

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

  return (
    <div className="min-h-screen bg-indigo-800 flex items-center justify-center p-4">
      <div className="max-w-lg w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Mock Interview Test
          </h1>
          <p className="text-slate-200 text-lg">
            Practice your technical skills with confidence
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-slate-800 mb-2">
              Get Started
            </h2>
            <p className="text-slate-600">
              Enter a topic to begin your mock interview session
            </p>
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Interview Topic
              </label>
              <input
                type="text"
                placeholder="Enter a topic (e.g. React, Node.js, Python)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isLoading}
                className={`w-full border-2 px-4 py-3 rounded-lg focus:outline-none transition-colors text-slate-800 ${
                  isLoading 
                    ? 'border-slate-200 bg-slate-50 cursor-not-allowed' 
                    : 'border-slate-300 focus:border-blue-500'
                }`}
                onKeyPress={(e) => e.key === 'Enter' && !isLoading && startTest()}
              />
            </div>

            <button
              onClick={startTest}
              disabled={!topic.trim() || isLoading}
              className={`w-full px-6 py-3 rounded-lg font-medium text-lg transition-all ${
                !topic.trim() || isLoading
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Generating Test...
                </div>
              ) : (
                'Start Mock Interview'
              )}
            </button>
          </div>

          {/* Features Section */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-3 text-center">
              What to expect:
            </h3>
            <div className="grid grid-cols-1 gap-3 text-sm text-slate-600">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                <span>Realistic interview questions</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                <span>Topic-specific scenarios</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                <span>Practice at your own pace</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-slate-300 text-sm">
            {isLoading 
              ? "Please wait while we prepare your personalized test..." 
              : "Build confidence • Practice makes perfect • Ace your interviews"
            }
          </p>
        </div>
      </div>
    </div>
  );
}