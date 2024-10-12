"use client";

import { useEffect, useState } from "react";
import { useBuyStore, BuyItem } from "@/store/store";
import { useCheckoutStore } from "@/store/store";
import DescriptionBox from "@/components/buy-section/description-box";
import { Navbar } from "@/components/navbar/navbar";
import Schedule from "@/components/buy-section/schedule";
import MostSoldTickets from "@/components/buy-section/most-sold-tickets";
import Image from "next/image";
import FullFooterWithBanner from "@/components/footer/full-footer";
import BuyModal from "@/components/buy-section/buy-modal";

const BuyItemPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const { items, fetchItems } = useBuyStore();
  const [item, setItem] = useState<BuyItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedShow, setSelectedShow] = useState<BuyItem['shows'][0] | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<BuyItem['mostSoldTickets'][0] | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  useEffect(() => {
    if (params.id && items.length > 0) {
      const foundItem = items.find((item) => item.id.toString() === params.id);
      setItem(foundItem || null);
    }
  }, [params.id, items]);

  const handleShowSelect = (show: BuyItem['shows'][0]) => {
    setSelectedShow(show);
    setSelectedTicket(null);
    setIsModalOpen(true);
  };

  const handleTicketSelect = (ticket: BuyItem['mostSoldTickets'][0]) => {
    setSelectedTicket(ticket);
    setSelectedShow(item?.shows[0] || null);
    setIsModalOpen(true);
  };

  if (!item) return <div>Loading...</div>;

  return (
    <>
      <div className="container mx-auto max-w-6xl px-2 lg:px-8 py-8 flex flex-col gap-4 border-x-2 min-h-screen">
        <Navbar />
        <DescriptionBox
          title={item.title}
          location={item.location}
          dateRange={item.dateRange}
          isTrending={true}
          description={item.description}
          imageUrl={item.bgImage}
        />
        <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">
            Choose a Show
          </h2>
          <Schedule event={item} />
        </div>
        <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">
            Most sold tickets
          </h2>
          <MostSoldTickets tickets={item.mostSoldTickets} onTicketSelect={handleTicketSelect} />
        </div>
        <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">
            Other locations around the world
          </h2>
          <Image src="/buy/map.svg" alt="map" width={900} height={600} className="flex justify-center w-full"/>
        </div>
      </div> 
      <div>
        <FullFooterWithBanner />
      </div>
      {isModalOpen && item && (selectedShow || selectedTicket) && (
        <BuyModal
          event={{
            id: item.id,
            title: item.title,
            location: item.location,
            mostSoldTickets: item.mostSoldTickets
          }}
          show={selectedShow || item.shows[0]}
          selectedTicket={selectedTicket}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default BuyItemPage;