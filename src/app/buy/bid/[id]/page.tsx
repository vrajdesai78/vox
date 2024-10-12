"use client";

import { useEffect, useState } from "react";
import { useBuyStore, BuyItem } from "@/store/store";
import { Navbar } from "@/components/navbar/navbar";
import DescriptionBox from "@/components/buy-section/description-box";
import BidSection from "@/components/buy-section/bid-section";

const BidPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { id } = params; 
  const { items, fetchItems } = useBuyStore();
  const [item, setItem] = useState<BuyItem | null>(null);
  const [selectedShow, setSelectedShow] = useState<BuyItem['shows'][0] | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  useEffect(() => {
    if (id && items.length > 0) {
      const foundItem = items.find((item) => item.id.toString() === id);
      setItem(foundItem || null);
      setSelectedShow(foundItem?.shows[0] || null);
    }
  }, [id, items]);

  const handleShowSelect = (show: BuyItem['shows'][0]) => {
    setSelectedShow(show);
  };

  if (!item || !selectedShow) return <div>Loading...</div>;

  return (
    <>
      <div className="container mx-auto max-w-6xl px-2 lg:px-8 py-8 flex flex-col gap-4 border-x-2 min-h-screen">
        <Navbar />
        <DescriptionBox
          title={item.title}
          location={item.location}
          dateRange={item.dateRange}
          isTrending={item.trending.status} 
          description={item.description}
          imageUrl={item.bgImage}
        />
        <BidSection />
      </div>
    </>
  );
};

export default BidPage;
