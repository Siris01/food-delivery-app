import type { NextApiRequest, NextApiResponse } from 'next';
import { cuisines } from '../explore';

export interface RestaurantItem {
	id: string;
	type: 'restaurant';
	name: string;
	distance: number;
}

export interface DishItem {
	id: string;
	resturantId: string;
	type: 'dish';
	name: string;
	allergens: string[];
}

export type SearchItem = RestaurantItem | DishItem;

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const query = req.query.q as string;

	if (cuisines.map((c) => c.title.toLowerCase()).includes(query)) {
		// TODO: Search for restaurants with the given cuisine
	}

	res.status(200).json({ results });
}

//TODO: Search for the query in the database

// Mock data
const results: SearchItem[] = [
	{
		id: '1',
		type: 'restaurant',
		name: 'Restaurant 1',
		distance: 1.5
	},
	{
		id: '2',
		type: 'restaurant',
		name: 'Restaurant 2',
		distance: 2.5
	},
	{
		id: '3',
		type: 'dish',
		name: 'Dish 1',
		allergens: ['gluten', 'nuts']
	},
	{
		id: '4',
		type: 'dish',
		name: 'Dish 2',
		allergens: []
	}
];
