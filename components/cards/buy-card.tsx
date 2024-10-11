import React from 'react';

interface BuyCardProps {
  id: number;
  title: string;
  bgImage: string;
  location: string;
  dateRange: string;
  trending: {
    status: boolean;
    metric: string;
  };
  onClick: (id: number) => void;
}

const BuyCard: React.FC<BuyCardProps> = ({ id, title, bgImage, location, dateRange, trending, onClick }) => {
  const handleClick = () => {
    onClick(id);
  };

  return (
    <div
      className="rounded-xl overflow-hidden h-40 w-[25rem] relative group cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 shadow-inner"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={handleClick}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100" />
      <div className="p-4 text-white font-bold relative z-10 flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl mb-1">{title}</h3>
          <p className="text-sm font-normal">{location} • {dateRange}</p>
        </div>
        {trending.status && (
          <p className="text-xs font-normal text-green-400">Trending: {trending.metric}</p>
        )}
      </div>
    </div>
  );
};

export default BuyCard;