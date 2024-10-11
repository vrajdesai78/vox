import React from 'react';
import { buy } from "../../utils/content";
import GradientButton from "../buttons/gradient-button";
import SearchBar from "../searchbar/searchbar";
import BuyGrid from './buy-grid';

const BuyHero: React.FC = () => {
  const handleButtonClick = () => {
    console.log("Button clicked!");
  };

  return (
    <div className="relative w-full flex flex-col">
      <div className="flex flex-1 justify-center items-center">
        <div className="flex w-full max-w-xl flex-col items-center gap-3 px-4">
          <h1 className="text-black text-2xl lg:text-5xl lg:text-nowrap text-center font-semibold font-bricolage leading-tight">
            {buy.title}
          </h1>
          <p className="text-custom-gray text-center text-xs lg:text-base font-inter leading-tight">
            {buy.subtitle}
          </p>
          <div className="pt-4">
            <GradientButton
              label="Create a Listing"
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
      <div className="w-full max-w-xl mx-auto px-4 mt-10 mb-10">
        <SearchBar />
      </div>
      <div className="w-full">
        <BuyGrid />
      </div>
    </div>
  );
};

export default BuyHero;