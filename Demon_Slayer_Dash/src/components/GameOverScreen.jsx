import React from "react";

function GameOverScreen({ score, restartGame, win }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 text-white p-6 rounded-md shadow-lg">
      <h2
        className={`text-3xl font-bold ${
          win ? "text-green-400" : "text-red-500"
        }`}
      >
        {win ? "You Won! 🎉" : "Game Over!"}
      </h2>
      <p className="mt-2">
        Final Score: <span className="text-yellow-300 text-xl">{score}</span>
      </p>
      <button
        onClick={restartGame}
        className="mt-4 px-6 py-2 bg-red-600 text-white rounded-md shadow hover:bg-red-700"
      >
        Restart
      </button>
    </div>
  );
}

export default GameOverScreen;