"use client";

import React, { useEffect } from "react";
import { useSellStore, generateSlug } from "../../store/store";
import { useRouter } from "next/navigation";
import SellCard from "../cards/sell-card";

const SellGrid = () => {
  const { items, isLoading, error, fetchItems } = useSellStore();
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCardClick = (title: string) => {
    const slug = generateSlug(title);
    router.push(`/sell/${slug}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='grid p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
      {items.map((item) => (
        <SellCard
          key={item.id}
          {...item}
          onClick={() => handleCardClick(item.title)}
        />
      ))}
    </div>
  );
};

export default SellGrid;