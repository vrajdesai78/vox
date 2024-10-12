"use client";

import React, { useEffect } from "react";
import SellCard from "../cards/sell-card";
import { useSellStore } from "../../store/store";
import sell from "@/utils/sell";
import { useRouter } from "next/navigation";

const SellGrid: React.FC = () => {
  const {
    items,
    showAll,
    isLoading,
    error,
    setItems,
    toggleShowAll,
    setLoading,
    setError,
  } = useSellStore();
  const router = useRouter();

  useEffect(() => {
    const fetchSellData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = sell;
        setItems(data);
      } catch (err) {
        setError("Failed to load data");
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSellData();
  }, [setItems, setLoading, setError]);

  const displayedItems = showAll ? items : items.slice(0, 4);

  const handleCardClick = (id: number) => {
    router.push(`/sell/${id}`);
  };

  if (isLoading) {
    return <div className='text-center py-4'>Loading...</div>;
  }

  if (error) {
    return <div className='text-center py-4 text-red-500'>{error}</div>;
  }

  return (
    <div className='w-full max-w-4xl mx-auto px-4 flex flex-col justify-center items-center'>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 justify-items-center'>
        {displayedItems.map((item) => (
          <SellCard
            key={item.id}
            id={item.id}
            title={item.title}
            bgImage={item.bgImage}
            onClick={handleCardClick}
          />
        ))}
      </div>
      {items.length > 4 && (
        <button
          onClick={toggleShowAll}
          className="h-11 px-4 py-2 bg-gradient-to-b from-[#272727] to-black rounded-lg shadow-inner border border-black flex justify-start items-center gap-3 text-center text-white text-sm font-medium leading-[16.80px] font-['Inter']"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default SellGrid;