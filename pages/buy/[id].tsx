import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useBuyStore, BuyItem } from '../../store/store';
import Image from 'next/image';

const BuyItemPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { items, fetchItems } = useBuyStore();
  const [item, setItem] = useState<BuyItem | null>(null);

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  useEffect(() => {
    if (id && items.length > 0) {
      const foundItem = items.find(item => item.id.toString() === id);
      setItem(foundItem || null);
    }
  }, [id, items]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
      <Image src={item.bgImage} alt={item.title} width={20} height={48} className="w-full h-64 object-cover rounded-lg mb-4" />
      <p className="mb-4">{item.description}</p>
      <h2 className="text-2xl font-semibold mb-2">Available Shows</h2>
      <ul>
        {item.shows.map((show, index) => (
          <li key={index} className="mb-2">
            {show.date} - {show.time} - {show.currency}{show.price}
            {show.bestSelling && <span className="ml-2 text-green-500">Best Selling</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BuyItemPage;