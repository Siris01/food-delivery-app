import type { NextApiRequest, NextApiResponse } from 'next';
import { Order } from '.';
import prisma from '@prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).end();

	const id = req.query.id;
	if (!id) return res.status(400).send('Missing order');

	const order = await prisma.orders.findUnique({ where: { id: parseInt(id as string) } });
	if (!order) return res.status(404).send('Order does not exist');

	const items = await prisma.order_items.findMany({
		where: {
			orderId: order.id
		}
	});

	res.status(200).json({ ...order, items });
}
