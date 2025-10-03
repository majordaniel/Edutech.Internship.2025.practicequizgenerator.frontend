export default function QuizHeader({ title, timer, current, total }) {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-bold text-gray-800">{title}</h2>
      <div className="text-sm text-gray-600">
        Q{current}/{total} | Time Left: {timer}
      </div>
    </div>
  );
}
