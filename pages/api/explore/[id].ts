import type { NextApiRequest, NextApiResponse } from 'next';
import exploreData from "../../../utils/explore.json";
import { ExploreItem } from '../../../store/store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ExploreItem | { message: string }>
) {
  const { id } = req.query;
  const item = exploreData.find(item => item.id.toString() === id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
}