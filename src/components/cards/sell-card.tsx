"use client";

import React from "react";

interface SellCardProps {
  id: number; 
  title: string;
  bgImage: string;
  onClick: (id: number) => void; 
}

const SellCard: React.FC<SellCardProps> = ({ id, title, bgImage, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className="rounded-xl overflow-hidden h-40 w-[20rem] lg:w-[24rem] relative group cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-inner"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
      <div className="p-4 text-white font-bold relative z-10">
        {title}
      </div>
    </div>
  );
};

export default SellCard;