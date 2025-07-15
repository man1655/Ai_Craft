import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuestionCard from '../components/QuestionCard';
import { submitAnswers } from '../api';

export default function Test() {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  if (!state || !state.questions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-center p-8">
          <div className="text-6xl mb-6">😕</div>
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-red-400 to-pink-400 bg-clip-text text-transparent">
            No test data found
          </h2>
          <p className="text-xl text-white/80 mb-6">Please start a new test from the home page.</p>
          <button
            onClick={() => window.history.back()}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl font-bold text-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Header */}
      <div className="bg-white/95 backdrop-blur-sm shadow-xl border-b border-white/20">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mock Interview Test
              </h1>
              <p className="text-slate-700 mt-2 font-medium">Answer all questions to complete your assessment</p>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-slate-600">Progress</div>
              <div className="text-2xl font-bold text-indigo-600">
                {answeredQuestions} / {totalQuestions}
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="w-full bg-slate-200 rounded-full h-3 shadow-inner">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-xs font-medium text-slate-500">Start</span>
              <span className="text-xs font-medium text-slate-500">{Math.round(progressPercentage)}% Complete</span>
              <span className="text-xs font-medium text-slate-500">Finish</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-8">
        <div className="grid gap-8">
          {state.questions.map((q, index) => (
            <div key={q.id} className="relative">
              {/* Question Number Badge */}
              <div className="absolute -left-6 -top-3 z-10">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold shadow-lg transition-all duration-300 ${
                  answers[q.id] 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white transform scale-110' 
                    : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white'
                }`}>
                  {index + 1}
                </div>
              </div>
              
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 ml-4">
                <QuestionCard
                  question={q}
                  selected={answers[q.id]}
                  setSelected={(value) => setAnswers({ ...answers, [q.id]: value })}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Submit Section */}
        <div className="mt-12 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Ready to submit?
              </h3>
              <p className="text-slate-700 text-lg mt-2 font-medium">
                {allAnswered 
                  ? "🎉 All questions answered! You can now submit your test."
                  : `📝 Please answer ${totalQuestions - answeredQuestions} more question${totalQuestions - answeredQuestions > 1 ? 's' : ''}.`
                }
              </p>
            </div>
            
            <button
              onClick={handleSubmit}
              disabled={!allAnswered || isSubmitting}
              className={`px-10 py-4 rounded-xl font-bold text-xl transition-all duration-300 transform ${
                allAnswered && !isSubmitting
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 shadow-2xl hover:shadow-green-500/25 hover:scale-105'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                  Submitting...
                </div>
              ) : (
                '🚀 Submit Test'
              )}
            </button>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-300/30">
          <h4 className="font-bold text-xl text-white mb-4 flex items-center">
            💡 <span className="ml-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Pro Tips:</span>
          </h4>
          <ul className="text-white/90 space-y-3 text-lg font-medium">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-4"></span>
              Take your time to read each question carefully
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mr-4"></span>
              You can change your answers before submitting
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-4"></span>
              Make sure all questions are answered before submission
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}