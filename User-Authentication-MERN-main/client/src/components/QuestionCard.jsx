export default function QuestionCard({ question, selected, setSelected }) {
  return (
    <div className="border p-4 rounded mb-4 shadow">
      <h3 className="font-semibold mb-2">{question.question}</h3>
      <div className="grid gap-2">
        {question.options.map((opt, idx) => (
          <label key={idx} className="flex items-center gap-2">
            <input
              type="radio"
              name={question.id}
              value={idx}
              checked={selected === idx}
              onChange={() => setSelected(idx)}
              className="accent-blue-500"
            />
            {opt}
          </label>
        ))}
      </div>
    </div>
  );
}
