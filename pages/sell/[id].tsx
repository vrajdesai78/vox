import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SellItem } from '../../store/store';
import Image from 'next/image';

const SellItemPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<SellItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        try {
          const response = await axios.get<SellItem>(`/api/sell/${id}`);
          setItem(response.data);
        } catch (err) {
          setError('Failed to load item data');
          console.error('Error loading item data:', err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!item) return <div>Item not found</div>;

  return (
    <div>
      <h1>{item.title}</h1>
      <Image src={item.bgImage} alt={item.title} />
    </div>
  );
};

export default SellItemPage;