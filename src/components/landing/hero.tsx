"use client";

import React, { useState } from "react";
import { DotPattern } from "@/components/background/dot-pattern";
import { HeroCard } from "@/components/cards/hero-card";
import { hero } from "@/utils/content";
import GradientButton from "@/components/buttons/gradient-button";
import ImageSlider from "@/components/cards/slider";
import CityCards from "../cards/city-card";
import SellGrid from "../sell/sell-grid";
import { useSendTransaction } from "wagmi";
import { base, baseSepolia } from "viem/chains";
import { parseEther } from "viem";

const Hero = () => {
  const [cities, setCities] = useState([]);

  const { sendTransaction } = useSendTransaction();

  return (
    <>
      <div className='hidden lg:flex'>
        <div className='relative w-full border-t-2 border-black/10'>
          <div className='flex pt-20 justify-between items-center'>
            <div className='relative w-[30rem] grid grid-cols-2 grid-rows-2'>
              <div className='flex justify-center items-center col-span-1 row-span-1'>
                <HeroCard color='#CDFFAC' emoji='🎤' rotation='-12deg' />
              </div>
              <div className='flex justify-center items-center col-span-2 row-span-2'>
                <HeroCard color='#ADE8FF' emoji='🎺' rotation='-12deg' />
              </div>
            </div>
            <div className='flex w-[40rem] flex-col items-center gap-3'>
              <div className='text-black text-5xl text-center font-semibold font-bricolage leading-[57.60px]'>
                {hero.title}
              </div>
              <div className='text-custom-gray text-base font-inter leading-tight'>
                {hero.subtitle}
              </div>
              <div>
                <GradientButton
                  label='Buy'
                  onClick={() => {
                    sendTransaction({
                      to: "0x78D98C8DBD4e1BFEfe439f1bF89692FeDCa95C45",
                      value: parseEther("0.001"),
                    });
                  }}
                />
              </div>
            </div>
            <div className='relative w-[30rem] h-[14rem] grid grid-cols-2 grid-rows-2'>
              <div className='flex justify-center items-center col-span-2 row-span-1'>
                <HeroCard color='#E1CCFF' emoji='🪩' rotation='12deg' />
              </div>
              <div className='flex justify-center items-center col-span-1 row-span-2'>
                <HeroCard color='#FFE0A6' emoji='🎶' rotation='12deg' />
              </div>
            </div>
          </div>
          <div className='pt-24'>
            <ImageSlider />
          </div>
          <div className='absolute inset-0 -z-10'>
            <DotPattern className='[mask-image:gradient(1px_circle_at_center,white,transparent)]' />
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-10 lg:hidden pt-10'>
        <div className='flex items-center gap-2'>
          <div className='col-span-1 row-span-1'>
            <HeroCard color='#CDFFAC' emoji='🎤' rotation='4deg' />
          </div>
          <div className='col-span-2 row-span-1'>
            <HeroCard color='#ADE8FF' emoji='🎺' rotation='-2deg' />
          </div>
          <div className='col-span-3 row-span-1'>
            <HeroCard color='#E1CCFF' emoji='🪩' rotation='4deg' />
          </div>
          <div className='col-span-4 row-span-1'>
            <HeroCard color='#FFE0A6' emoji='🎶' rotation='-2deg' />
          </div>
        </div>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-black text-[32px] text-center font-semibold font-bricolage leading-[38.40px]'>
            Vox has your seat
          </div>
          <div className="text-center text-custom-gray text-sm font-medium font-['Inter'] leading-[16.80px]">
            Turning 'Sold Out' to 'See you there'
          </div>
          <button
            className={`h-11 w-32 px-4 py-2 bg-gradient-to-b from-[#272727] to-black rounded-lg shadow-inner border border-black flex justify-center items-center gap-3 text-center text-white text-sm font-medium leading-[16.80px] font-inter`}
            type='button'
          >
            Login
          </button>
        </div>
        <div className='px-4'>
          <ImageSlider />
        </div>
        <div className='flex flex-col items-center gap-2'>
          <div className='text-black text-base text-center font-semibold font-bricolage leading-[38.40px]'>
            Choose by cities
          </div>
          <div>
            <CityCards />
          </div>
        </div>
        <div className='absolute inset-0 -z-10'>
          <DotPattern className='[mask-image:gradient(1px_circle_at_center,white,transparent)]' />
        </div>
      </div>
    </>
  );
};

export default Hero;
