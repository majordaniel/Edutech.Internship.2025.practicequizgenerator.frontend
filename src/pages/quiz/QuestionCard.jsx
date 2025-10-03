export default function QuestionCard({ question, selected, onSelect }) {
  return (
    <div className="mb-4">
      <p className="font-medium text-gray-700 mb-2">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => onSelect(question.id, opt)}
            className={`block w-full text-left px-4 py-2 rounded-lg border ${
              selected === opt
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white hover:bg-gray-50 border-gray-300"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
