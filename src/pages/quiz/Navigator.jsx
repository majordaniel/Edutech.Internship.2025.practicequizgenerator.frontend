export default function Navigator({ total, current, onJump }) {
  return (
    <div className="flex gap-2 mt-6 flex-wrap">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onJump(i)}
          className={`w-8 h-8 rounded-full text-sm font-medium ${
            current === i
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
