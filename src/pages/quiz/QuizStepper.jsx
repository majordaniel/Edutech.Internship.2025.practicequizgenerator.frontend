export default function QuizStepper({ current, total, onPrev, onNext }) {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
      >
        Previous
      </button>
      <button
        onClick={onNext}
        disabled={current === total - 1}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
