import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma';
import { getSession } from '@utils/getSession';
import { readFileSync } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).end();

	const session = await getSession(req);
	if (!session) return res.status(401).end();

	const id = req.query.id;
	if (!id) return res.status(400).send('Missing invoice');

	const order = await prisma.orders.findUnique({ where: { id: parseInt(id as string) } });
	if (!order) return res.status(404).send('Order does not exist');

	if (order.userId !== session.userId) return res.status(403).send('You do not own this order');

	const items = await prisma.order_items.findMany({
		where: {
			orderId: order.id
		}
	});

	const user = await prisma.users.findFirst({
		where: {
			id: order.userId
		}
	});

	const dishItems = await prisma.dishes.findMany({
		where: {
			id: {
				in: items.map((item) => item.dishId)
			}
		}
	});

	const invoiceDetails = {
		user: {
			name: user!.username,
			email: user!.email,
			address: order.deliveryAddress
		},
		invoiceId: order.id,
		date: order.createdAt.toDateString(),
		taxRate: 1.5,
		products: items.map((item) => {
			const dishItem = dishItems.find((dish) => dish.id === item.dishId)!;
			return {
				quantity: item.quantity.toString(),
				name: dishItem.name,
				price: dishItem.price
			};
		})
	};

	res.json(invoiceDetails);
}
