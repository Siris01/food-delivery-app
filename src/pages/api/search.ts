import type { NextApiRequest, NextApiResponse } from 'next';
import { cuisines } from '@pages/explore';
import prisma from '@prisma';

export interface RestaurantItem {
	id: number;
	image: string;
	type: 'restaurant';
	about: string;
	name: string;
	distance: number;
}

export interface DishItem {
	id: number;
	image: string;
	restaurantId: number;
	type: 'dish';
	name: string;
	allergens: string[];
	price: number;
}

export type SearchItem = RestaurantItem | DishItem;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = req.query.q as string;

	if (cuisines.map((c) => c.title.toLowerCase()).includes(query)) {
		// TODO: Search for restaurants with the given cuisine
	}

	const results: SearchItem[] = [];

	const dishes = await prisma.dishes.findMany({ where: { name: { contains: query } }, take: 10 });
	const restaurants = await prisma.restaurants.findMany({ where: { name: { contains: query } }, take: 10 });

	for (const dish of dishes) {
		results.push({
			...dish,
			type: 'dish',
			allergens: dish.allergens.split(',')
		});
	}

	for (const restaurant of restaurants) {
		results.push({
			...restaurant,
			type: 'restaurant',
			distance: Math.floor(Math.random() * 1000) //TODO: Calc dist b/w user and restaurant.location and send back
		});
	}

	res.status(200).json({ results });
}

//TODO: Search for the query in the database
