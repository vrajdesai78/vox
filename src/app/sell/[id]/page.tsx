"use client";

import { useEffect, useState } from "react";
import { useSellStore, SellItem } from "@/store/store";
import { Navbar } from "@/components/navbar/navbar";
import DescriptionBox from "@/components/buy-section/description-box";
import Image from "next/image";
import FullFooterWithBanner from "@/components/footer/full-footer";
import SellSchedule from "@/components/sell/sell-schedule";
import SellScheduleWithLocation from "@/components/sell/sell-schedule-with-location";

interface SellItemPageProps {
  params: { id: string };
}

const SellItemPage: React.FC<SellItemPageProps> = ({ params }) => {
  const { items, fetchItems, isLoading, error } = useSellStore();
  const [item, setItem] = useState<SellItem | null>(null);

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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Event not found</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-6xl px-2 lg:px-8 py-8 flex flex-col gap-4 border-x-2 min-h-screen">
        <DescriptionBox
          title={item.title}
          location={item.location}
          dateRange={item.dateRange}
          isTrending={item.trending.status}
          description={item.description}
          imageUrl={item.bgImage}
        />
        <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">Sell Tickets for These Shows</h2>
          <SellSchedule event={item} />
        </div>
        {/* <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">
            Other shows around the world
          </h2>
          <SellScheduleWithLocation event={item} />
        </div> */}
        <div className="flex flex-col gap-2 pt-6">
          <h2 className="text-2xl font-semibold mb-2 font-bricolage">
            Event Locations
          </h2>
          <Image
            src="/buy/map.svg"
            alt="map"
            width={900}
            height={600}
            className="w-full"
          />
        </div>
      </div>
      <FullFooterWithBanner />
    </>
  );
};

export default SellItemPage;