import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function Timer({ initialTime = 300, onExpire }) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (timeLeft <= 0) {
      if (onExpire) onExpire();
      return;
    }
    const timerId = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [timeLeft, onExpire]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="flex items-center gap-1 text-gray-700 font-medium">
      <Clock className="w-5 h-5 text-orange-500" />
      <span>{`${minutes.toString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`}</span>
    </div>
  );
}
