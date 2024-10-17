"use client";

import { useEffect, useState } from "react";
import { useBuyStore, useBidStore, BuyItem } from "@/store/store";
import { Navbar } from "@/components/navbar/navbar";
import DescriptionBox from "@/components/buy-section/description-box";
import BidSection from "@/components/buy-section/bid-section";
import MostSoldTickets from "@/components/buy-section/most-sold-tickets";
import FullFooterWithBanner from "@/components/footer/full-footer";
import { useRouter } from 'next/navigation';
import Image from "next/image";

const BidPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const router = useRouter();
  const { id } = params;
  const { items, fetchItems } = useBuyStore();
  const { currentBid, setBid } = useBidStore();
  const [item, setItem] = useState<BuyItem | null>(null);
  const [selectedShow, setSelectedShow] = useState<BuyItem['shows'][0] | null>(null);
  const [bidAmount, setBidAmount] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

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
      setBidAmount(foundItem?.shows[0].price.toString() || '');
    }
  }, [id, items]);

  const handleShowSelect = (show: BuyItem['shows'][0]) => {
    setSelectedShow(show);
    setBidAmount(show.price.toString());
  };

  const handleBidAmountChange = (amount: string) => {
    setBidAmount(amount);
  };

  const handlePlaceBid = async () => {
    if (!item) return;
    setIsLoading(true);
    try {
      
      router.push(`/buy/${item.id}`);
    } catch (error) {
      console.error('Failed to place bid:', error);
    } finally {
      setIsLoading(false);
    }
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
        <BidSection
          shows={item.shows}
          selectedShow={selectedShow}
          onShowSelect={handleShowSelect}
          bidAmount={bidAmount}
          onBidAmountChange={handleBidAmountChange}
          onPlaceBid={handlePlaceBid}
          isLoading={isLoading}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Most Sold Tickets</h2>
          <MostSoldTickets tickets={item.mostSoldTickets} onTicketSelect={() => {}} />
        </div>
        <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">
            Other locations around the world
          </h2>
          <Image src="/buy/map.svg" alt="map" width={900} height={600} className="flex justify-center w-full"/>
        </div>
      </div>
      <FullFooterWithBanner />
    </>
  );
};

export default BidPage;