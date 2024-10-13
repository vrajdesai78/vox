"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { cities, City } from '../../utils/city'; 

const CityCards: React.FC = () => {
  const [showAll, setShowAll] = useState(false);

  const displayedCities = showAll ? cities : cities.slice(0, 4);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        {displayedCities.map((city: City) => (
          <div key={city.id} className="flex flex-col items-center bg-[#F7F7F7] border-[1px] border-dashed border-[#D6D6D6] shadow-md p-4 w-[10rem] rounded-lg">
            <div className="relative w-20 h-20 mb-2">
              <Image
                src={city.image}
                alt={`${city.city} landmark`}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-black font-bricolage text-center font-semibold">{city.city}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="flex items-center justify-center w-full py-2 hover:underline"
      >
        {showAll ? 'Show Less' : 'Show More'}
        <svg
          className={`ml-2 h-5 w-5 transform transition-transform duration-200 ${
            showAll ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>
  );
};

export default CityCards;