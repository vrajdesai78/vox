"use client";

import React from "react";
import Image from "next/image";
import { profiles } from "../../utils/profile";
import { Navbar } from "../../components/navbar/navbar";
import FullFooterWithBanner from "../../components/footer/full-footer";
import { useQuery } from "@tanstack/react-query";
import { getActiveBids } from "../_actions";
import { useAccount } from "wagmi";
import TransactionWrapper from "@/components/wallet/TransactionWrapper";

const ProfilePage: React.FC = () => {
  const farhat = profiles.farhat;
  const { address } = useAccount();

  const { data: requests } = useQuery({
    queryKey: ["activeBids"],
    queryFn: async () => await getActiveBids(address as string),
  });

  return (
    <div className='container mx-auto max-w-6xl border-x-2 border-black/10 font-bricolage'>
      <div className='fixed top-8 left-1/2 transform -translate-x-1/2 z-20'>
        <Navbar />
      </div>
      <div className='max-w-5xl flex flex-col mx-auto pt-20 items-center md:items-start'>
        {/* <h1 className='text-2xl font-bold mb-4'>Sarthak's Profile</h1> */}

        {/* <div className='rounded-lg bg-[#F8F8F8] border-white border-2 w-fit shadow-md p-4 mb-6'>
          <div className='flex items-center'>
            <div className='relative w-16 h-16 mr-4'>
              <Image
                src='/profile/sarthak.png'
                alt='Sarthak Shah'
                layout='fill'
                className='rounded-lg'
              />
            </div>
            <div>
              <h2 className='text-lg font-semibold'>{farhat.name}</h2>
              <p className='text-gray-600'>{farhat.email}</p>
            </div>
          </div>
        </div> */}

        <h1 className='text-2xl font-bold mb-4'>Your Requests</h1>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {requests &&
            Object.entries(requests).map(([key, request]) => (
              <div
                key={key}
                className='overflow-hidden p-3 bg-[#F6F6F6] border-[#D6D6D6] border-[1px] rounded-lg w-[324px]'
              >
                <div className='relative h-32'>
                  <Image
                    src={request.imageSrc}
                    alt={request.artist}
                    layout='fill'
                    objectFit='cover'
                    className='rounded-lg'
                  />
                </div>
                <div className=''>
                  <div className='flex justify-between items-center'>
                    <div className='flex flex-col gap-1 pt-4'>
                      <div className="text-black text-2xl font-semibold font-['Bricolage Grotesque'] leading-[28.80px]">
                        {request.artist}
                      </div>
                      <div className='text-[#616161] text-base font-medium font-inter leading-tight'>
                        <svg
                          className='inline w-4 h-4 mr-1'
                          fill='none'
                          stroke='currentColor'
                          viewBox='0 0 24 24'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                          />
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth={2}
                            d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                          />
                        </svg>
                        {request.location}
                      </div>
                    </div>
                    <div className='inline-block bg-[#cdffac] border-dashed border-[1px] border-[#43a900] text-[#43a900] text-xs px-2 py-1 rounded-lg mb-2'>
                      {request.event}
                    </div>
                  </div>
                  <div className='text-[#616161] text-base font-medium font-inter leading-tight pt-4'>
                    {request.date}
                  </div>
                  <div className='mt-2 shadow-inner border border-[#d6d6d6] p-5 bg-[#f6f6f6] border-dashed rounded-lg flex justify-between items-center'>
                    <div>
                      <p className='text-custom-gray'>
                        Your Price: ₹{request.yourPrice.toLocaleString()}
                      </p>
                      <p className='text-custom-gray'>
                        Req. price: ₹{request.requestedPrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`${
                          request.priceChange < 0
                            ? "text-[#a9004f] bg-[#ffacb8] border-[1px] border-dashed border-[#a9004f] px-2 py-0.5 text-sm rounded-lg"
                            : "text-green-600"
                        }`}
                      >
                        {request.priceChange}%
                      </p>
                    </div>
                  </div>
                  <div className='mt-4 flex space-x-2'>
                    <TransactionWrapper
                      functionName='acceptHighestBid'
                      args={[request.eventId, request.ticketId]}
                      isApprovalTx={false}
                      onSuccess={() => {
                        console.log("Transaction success");
                      }}
                      onError={() => {
                        console.log("Transaction error");
                      }}
                      text='Place Bid'
                    />
                    <button className='border border-gray-300 px-5 py-1 rounded-lg hover:scale-95 transition-all'>
                      Hold ticket
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <FullFooterWithBanner />
    </div>
  );
};

export default ProfilePage;
