import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import BuyCard from '../cards/buy-card';
import { useBuyStore } from '../../store/store';

const BuyGrid: React.FC = () => {
  const { items, isLoading, error, fetchItems } = useBuyStore();
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleCardClick = (id: number) => {
    router.push(`/buy/${id}`);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <BuyCard
          key={item.id}
          {...item}
          onClick={() => handleCardClick(item.id)}
        />
      ))}
    </div>
  );
};

export default BuyGrid;