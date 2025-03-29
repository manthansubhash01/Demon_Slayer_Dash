import React from "react";


export default function ImageButton({ character, position, handleClick }) {
  if (!character) return null;

  return (
    <div
      className="absolute cursor-pointer transition-all duration-200"
      style={{
        top: position.top, 
        left: position.left, 
        width: "100px",
        height: "100px",
      }}
      onClick={handleClick} 
    >
      <img
        src={character.src}
        alt={character.isDemon ? "Demon" : "Demon Slayer"} 
        className="w-full h-full object-contain rounded-lg border-2 border-white"
      />
    </div>
  );
}
