import React, { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft, gameOver }) {
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameOver]);

  return <p className="text-xl">Time Left: {timeLeft}s</p>;
}