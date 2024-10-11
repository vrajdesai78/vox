import React from 'react';
import { DotPattern } from "../background/dot-pattern";
import { HeroCard } from "../cards/hero-card";
import { hero } from "../../utils/content";
import GradientButton from "../buttons/gradient-button";
import ImageSlider from "../cards/slider";

interface HeroProps {
  onLogin: () => void;
}

const Hero: React.FC<HeroProps> = ({ onLogin }) => {
  return (
    <div className="relative w-full h-[90%] border-t-2 border-black/10">
      <div className="flex h-[70%] justify-between items-center">
        <div className="relative w-[30rem] h-[14rem] grid grid-cols-2 grid-rows-2">
          <div className="flex justify-center items-center col-span-1 row-span-1">
            <HeroCard color="#CDFFAC" emoji="🎤" rotation="-12deg" />
          </div>
          <div className="flex justify-center items-center col-span-2 row-span-2">
            <HeroCard color="#ADE8FF" emoji="🎺" rotation="-12deg" />
          </div>
        </div>
        <div className="flex w-[40rem] flex-col items-center gap-3">
          <div className="text-black text-5xl text-center font-semibold font-bricolage leading-[57.60px]">
            {hero.title}
          </div>
          <div className="text-custom-gray text-base font-inter leading-tight">
            {hero.subtitle}
          </div>
          <div>
            <GradientButton
              label="Login"
              onClick={onLogin}
            />
          </div>
        </div>
        <div className="relative w-[30rem] h-[14rem] grid grid-cols-2 grid-rows-2">
          <div className="flex justify-center items-center col-span-2 row-span-1">
            <HeroCard color="#E1CCFF" emoji="🪩" rotation="12deg" />
          </div>
          <div className="flex justify-center items-center col-span-1 row-span-2">
            <HeroCard color="#FFE0A6" emoji="🎶" rotation="12deg" />
          </div>
        </div>
      </div>
      <div>
        <ImageSlider />
      </div>
      <div className="absolute inset-0 -z-10">
        <DotPattern className="[mask-image:gradient(1px_circle_at_center,white,transparent)]" />
      </div>
    </div>
  );
};

export default Hero;