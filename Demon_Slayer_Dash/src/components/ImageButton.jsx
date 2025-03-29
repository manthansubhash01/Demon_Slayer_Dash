import React from "react";


function ImageButton({ character, position, handleClick }) {
  if (!character) return null;

  return (
    <div
      className="absolute w-full h-full bg-cover bg-no-repeat"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <img
        src={character.src}
        alt="Character"
        onClick={handleClick}
        className="w-[130px] h-[160px] md:w-[160px] md:h-[190px] cursor-pointer transition-transform duration-200 hover:scale-110"
      />
    </div>
  );
}

export default ImageButton;