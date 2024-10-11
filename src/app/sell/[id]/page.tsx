"use client";

import { useEffect, useState } from "react";
import { SellItem } from "@/store/store";
import Image from "next/image";
import sell from "@/utils/sell";

const SellItemPage: React.FC<{ params: { id: string } }> = ({ params }) => {
  const [item, setItem] = useState<SellItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (params.id) {
        try {
          const data = sell;
          setItem(data[Number(params.id) - 1]);
        } catch (err) {
          setError("Failed to load item data");
          console.error("Error loading item data:", err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItem();
  }, [params.id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div>
      <h1>{item.title}</h1>
      <Image src={item.bgImage} alt={item.title} width={500} height={500} />
    </div>
  );
};

export default SellItemPage;
