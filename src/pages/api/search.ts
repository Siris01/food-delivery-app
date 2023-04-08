import type { NextApiRequest, NextApiResponse } from 'next';
import { cuisines } from '../explore';

export interface RestaurantItem {
	id: string;
	image: string;
	type: 'restaurant';
	about: string;
	name: string;
	distance: number;
}

export interface DishItem {
	id: string;
	image: string;
	resturantId: string;
	type: 'dish';
	name: string;
	allergens: string[];
	price: number;
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
		image: 'https://cdn.pixabay.com/photo/2018/07/14/15/27/cafe-3537801_960_720.jpg',
		name: 'Restaurant 1',
		about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		distance: 1.5
	},
	{
		id: '2',
		type: 'restaurant',
		image: 'https://cdn.pixabay.com/photo/2016/11/18/14/05/brick-wall-1834784__340.jpg',
		name: 'Restaurant 2',
		about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		distance: 2.5
	},
	{
		id: '3',
		resturantId: '1',
		image: 'https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382__340.jpg',
		type: 'dish',
		name: 'Dish 1',
		allergens: ['gluten', 'nuts'],
		price: 5
	},
	{
		id: '4',
		resturantId: '2',
		image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/abstract-1238247__340.jpg',
		type: 'dish',
		name: 'Dish 2',
		allergens: [],
		price: 10
	}
];
