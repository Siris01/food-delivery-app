import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') return res.status(405).end();

	const id = req.query.id as string;
	if (!id) return res.status(400).end();

	const restaurant = await prisma.restaurants.findUnique({
		where: {
			id: parseInt(id)
		}
	});

	if (!restaurant) return res.status(404).end();

	const menu = (
		await prisma.dishes.findMany({
			where: {
				restaurantId: parseInt(id)
			}
		})
	).map((dish) => ({ ...dish, allergens: dish.allergens.split(',') }));

	res.status(200).json({ ...restaurant, menu });
}
