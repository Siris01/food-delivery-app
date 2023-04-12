import { CartItem } from '@pages/cart';
import type { NextApiRequest, NextApiResponse } from 'next';

export interface Order {
	id: number;
	eta: number; // In minutes
	items: CartItem[];
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	//TODO: Do smth here
	res.status(200).json({});
}
