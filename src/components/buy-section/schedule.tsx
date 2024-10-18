import React from "react";
import Link from "next/link";
import { generateSlug } from "@/store/store";

interface Show {
  date: string;
  day: string;
  time: string;
  price: number;
  currency: string;
  bestSelling?: boolean;
}

interface Event {
  title: string;
  location: string;
  dateRange: string;
  shows: Show[];
}

interface ScheduleProps {
  event: Event;
}

const Schedule: React.FC<ScheduleProps> = ({ event }) => {
  return (
    <div className='w-full'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {event.shows.map((show, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg ${
              show.bestSelling
                ? "bg-green-100 border-[10px] border-green-300 relative"
                : "bg-white border-gray-200 border-[10px]"
            }`}
          >
            {show.bestSelling && (
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 -rotate-6 bg-green-500 text-white text-xs py-1 px-2 rounded-full shadow-md'>
                Best selling tickets
              </div>
            )}
            <h3 className='text-xl font-bold mb-2'>{show.date}</h3>
            <p className='text-gray-600 mb-4'>
              {show.day} {show.time}
            </p>
            <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
              <button className='bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm'>
                Buy from {show.currency}
                {show.price.toLocaleString()}
              </button>
              <Link
                href={`/buy/bid/${generateSlug(event.title)}`}
                className='border border-black text-black py-2 px-4 rounded-md hover:bg-gray-200 transition-colors w-full sm:w-auto text-sm text-center'
              >
                Place bid
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
