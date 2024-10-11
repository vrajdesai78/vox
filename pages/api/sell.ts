import type { NextApiRequest, NextApiResponse } from 'next';
import sellData from "../../utils/sell.json";
import { SellItem } from '../../store/store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SellItem[] | { message: string }>
) {
  if (req.method === 'GET') {
    try {
      if (Array.isArray(sellData)) {
        const data: SellItem[] = sellData as SellItem[];
        res.status(200).json(data);
      } else {
        throw new Error('Sell data is not in the expected format');
      }
    } catch (error) {
      console.error('Error processing sell data:', error);
      res.status(500).json({ message: 'Failed to load sell data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}