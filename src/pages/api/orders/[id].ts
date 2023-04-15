import { CartItem } from '@pages/cart';
import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '.';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).end();

	//TODO: Do smth here
	res.status(200).json({});
}
