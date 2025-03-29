import React, { useState, useEffect } from "react";
import ImageButton from "./ImageButton";
import GameOverScreen from "./GameOverScreen";

const demonSlayers = [
  "https://www.demonslayer-api.com/api/v1/characters/images/1.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/2.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/3.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/9.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/10.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/12.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/15.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/20.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/28.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/29.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/30.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/31.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/32.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/33.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/34.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/45.webp",
];

const demons = [
  "https://www.demonslayer-api.com/api/v1/characters/images/14.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/36.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/37.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/39.webp",
  "https://www.demonslayer-api.com/api/v1/characters/images/44.webp",
];



const MAX_SCORE = 500; 

function Game() {
  const [character, setCharacter] = useState(null);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [win, setWin] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameStarted, setGameStarted] = useState(false); // NEW STATE for game start

  useEffect(() => {
    // Preload images before starting the game
    const allImages = [...demonSlayers, ...demons];
    let loadedImages = 0;

    allImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImages++;
        if (loadedImages === allImages.length) {
          setIsLoading(false); // Set loading to false once all images load
        }
      };
    });
  }, []);

  const spawnCharacter = () => {
    if (score >= MAX_SCORE) {
      setWin(true);
      setGameOver(true);
      return;
    }

    const isDemon = Math.random() < 0.3; // 30% chance of demon appearing
    const newCharacter = isDemon
      ? demons[Math.floor(Math.random() * demons.length)]
      : demonSlayers[Math.floor(Math.random() * demonSlayers.length)];

    setCharacter({ src: newCharacter, isDemon });

    setPosition({
      top: `${Math.random() * 80}%`,
      left: `${Math.random() * 80}%`,
    });

    if (timerId) clearTimeout(timerId);

    const newTime = Math.floor(Math.random() * 2) + 1;
    const newTimer = setTimeout(spawnCharacter, newTime * 1000); // Auto-change if not clicked
    setTimerId(newTimer);
  };

  const handleCharacterClick = () => {
    if (character.isDemon) {
      setGameOver(true); // If they click a demon, they lose
    } else {
      setScore(score + 1); // Gain score for clicking Demon Slayer
      spawnCharacter();
    }
  };

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    setWin(false);
    setGameStarted(false); // Reset to show start screen again
  };

  const startGame = () => {
    setGameStarted(true);
    spawnCharacter();
  };

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover bg-center text-white"
      style={{
        backgroundImage:
          "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.wallpapersden.com%2Fimage%2Fdownload%2Fdemon-slayer-kimetsu-no-yaiba-4k-characters_bGVua2qUmZqaraWkpJRnbW1lrWZtZWU.jpg&f=1&nofb=1&ipt=a4bedc81699b1ebbaa866bb29ec5b111060873fc29a09bd0e694224f9a75b202&ipo=images')",
      }}
    >
      {isLoading ? (
        <div className="text-2xl font-bold">Loading...</div>
      ) : !gameStarted ? (
        // SHOW START SCREEN
        <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold mb-4">
            🔥 Demon Slayer Click Challenge 🔥
          </h1>
          <p className="mb-3">Click Demon Slayers to gain points.</p>
          <p className="mb-3">DO NOT click demons, or you lose!</p>
          <p className="mb-3">
            ⏳ Images appear randomly. If you don't click, the game continues.
          </p>
          <button
            onClick={startGame}
            className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow-md"
          >
            Start Game
          </button>
        </div>
      ) : (
        // SHOW GAME SCREEN
        <>
          <div className="text-2xl font-bold bg-gray-800 p-3 rounded-md shadow-md">
            Score: <span className="text-yellow-300">{score}</span>
          </div>

          <div className="relative w-[1200px] h-[750px] bg-gray-700 border-2 border-white rounded-md mt-6 flex items-center justify-center overflow-hidden">
            {!gameOver ? (
              <div className="relative w-full h-full">
                <ImageButton
                  character={character}
                  position={position}
                  handleClick={handleCharacterClick}
                />
              </div>
            ) : (
              <GameOverScreen
                score={score}
                restartGame={restartGame}
                win={win}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}


export default Game;