import type { NextApiRequest, NextApiResponse } from 'next';
import exploreData from "../../utils/explore.json";
import { ExploreItem } from '../../store/store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreItem[] | { message: string }>
) {
  if (req.method === 'GET') {
    try {
      if (Array.isArray(exploreData)) {
        const data: ExploreItem[] = exploreData as ExploreItem[];
        res.status(200).json(data);
      } else {
        throw new Error('Explore data is not in the expected format');
      }
    } catch (error) {
      console.error('Error processing explore data:', error);
      res.status(500).json({ message: 'Failed to load explore data' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}