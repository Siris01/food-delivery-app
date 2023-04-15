import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).end();

	const restaurantId = req.query.restaurantId as string;
	const dishId = req.query.dishId as string;
	if (!restaurantId || !dishId) return res.status(400).end();

	const dish = await prisma.dishes.findFirst({
		where: {
			id: parseInt(dishId),
			restaurantId: parseInt(restaurantId)
		}
	});

	if (!dish) return res.status(404).end();

	res.status(200).json({ ...dish, allergens: dish.allergens.split(',') });
}
