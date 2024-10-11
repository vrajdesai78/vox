import type { NextApiRequest, NextApiResponse } from 'next';
import sellData from "../../../utils/sell.json";
import { SellItem } from '../../../store/store';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SellItem | { message: string }>
) {
  const { id } = req.query;
  const item = sellData.find(item => item.id.toString() === id);

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
}