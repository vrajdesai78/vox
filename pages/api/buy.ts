import type { NextApiRequest, NextApiResponse } from 'next';
import buyData from '../../utils/buy.json';
import { BuyItem } from '../../store/store';

export default function handler(
    //@ts-ignore
  req: NextApiRequest,
  res: NextApiResponse<BuyItem[]>
) {
  res.status(200).json(buyData);
}