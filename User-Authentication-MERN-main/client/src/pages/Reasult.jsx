import { useLocation, useNavigate } from 'react-router-dom';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen bg-slate-700 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-xl font-semibold mb-2">No results found</h2>
          <p>Please take a test first.</p>
          <button
            onClick={() => navigate('/features/interview')}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
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
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-700 to-slate-800 text-slate-800">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="text-center text-white mb-10">
          <h1 className="text-3xl font-bold">Mock Interview Results</h1>
          <p className="text-slate-300">Review your performance</p>
        </div>

        {/* Score Card */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{getScoreEmoji()}</div>
            <h2 className="text-4xl font-bold mb-2">
              <span className={getScoreColor()}>
                {score} / {total}
              </span>
            </h2>
            <div className="text-2xl font-semibold text-slate-700 mb-2">
              {percentage}% Score
            </div>
            <p className="text-lg text-slate-600">{getPerformanceMessage()}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>Performance</span>
              <span>{percentage}%</span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-3">
              <div
                className={`h-3 rounded-full transition-all duration-1000 ${
                  percentage >= 80
                    ? 'bg-green-500'
                    : percentage >= 60
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{score}</div>
              <div className="text-sm text-slate-600">Correct</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-red-600">
                {total - score}
              </div>
              <div className="text-sm text-slate-600">Incorrect</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-slate-700">{total}</div>
              <div className="text-sm text-slate-600">Total</div>
            </div>
          </div>
        </div>

        {/* Explanations */}
        <div className="bg-white rounded-xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold">?</span>
            </div>
            Question Explanations
          </h3>

          {explanations.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">📝</div>
              <p className="text-slate-600 text-lg">No explanations available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {explanations.map((ex) => (
                <div
                  key={ex.id}
                  className="bg-slate-50 border-l-4 border-blue-500 p-6 rounded-r-lg"
                >
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm mr-4 mt-1">
                      {ex.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-slate-700 leading-relaxed">
                        {ex.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-white rounded-xl shadow-xl p-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              Ready for your next challenge?
            </h3>
            <p className="text-slate-600 mb-6">
              Practice makes perfect. Keep improving your interview skills!
            </p>
            <button
              onClick={() => navigate('/features/interview')}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-lg shadow-lg hover:shadow-xl"
            >
              Take Another Test
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-slate-300 text-sm">
            Every expert was once a beginner • Keep learning • You've got this! 🚀
          </p>
        </div>
      </div>
    </div>
  );
}
