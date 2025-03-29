import React, { useState, useEffect } from "react";
import Timer from "./Timer";
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

export default function Game() {
  // Game State
  const [character, setCharacter] = useState(null); // Current character (Demon Slayer or Demon)
  const [position, setPosition] = useState({ top: "50%", left: "50%" }); // Random position
  const [score, setScore] = useState(0); // Player's score
  const [timeLeft, setTimeLeft] = useState(10); // Timer countdown
  const [gameOver, setGameOver] = useState(false); // Game over flag

  useEffect(() => {
    if (timeLeft === 0) setGameOver(true);
  }, [timeLeft]);


  const spawnCharacter = () => {
    const isDemon = Math.random() < 0.3; 
    const newCharacter = isDemon
      ? demons[Math.floor(Math.random() * demons.length)]
      : demonSlayers[Math.floor(Math.random() * demonSlayers.length)];

    setCharacter({ src: newCharacter, isDemon });

   
    setPosition({
      top: `${Math.random() * 80 + 10}%`,
      left: `${Math.random() * 80 + 10}%`,
    });
  };


  const handleCharacterClick = () => {
    if (character.isDemon) {
      setGameOver(true); 
    } else {
      setScore(score + 1); 
      spawnCharacter(); 
    }
  };


  const restartGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameOver(false);
    spawnCharacter();
  };


  useEffect(() => {
    if (!gameOver) spawnCharacter();
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-900 text-white relative">
      <h1 className="text-3xl font-bold">Demon Slayer Click Challenge</h1>


      <Timer
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        gameOver={gameOver}
      />

      <p className="text-xl">Score: {score}</p>

     
      {!gameOver ? (
        <ImageButton
          character={character}
          position={position}
          handleClick={handleCharacterClick}
        />
      ) : (
        <GameOverScreen score={score} restartGame={restartGame} />
      )}
    </div>
  );
}
