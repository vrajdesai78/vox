import type { NextApiResponse } from 'next';
import exploreData from "../../utils/explore.json";
import { ExploreItem } from '../../store/store';

export default async function handler(
  res: NextApiResponse<ExploreItem[]>
) {
  try {
    const data: ExploreItem[] = exploreData as ExploreItem[];
    res.status(200).json(data);
  } catch (error) {
    console.error('Error processing explore data:', error);
    res.status(500).json([]);
  }
}