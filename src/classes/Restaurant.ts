import Dish from '@classes/Dish';
import prisma from '@prisma';

export interface RestaurantProps {
	id: number;
	name: string;
	image: string;
	about: string;
	location: string;
	dishes: Dish[];
}

class Restaurant {
	public id: number;
	public name: string;
	public image: string;
	public about: string;
	public location: string;
	public dishes: Dish[];

	constructor(dataMembers: RestaurantProps) {
		const { id, name, image, about, location, dishes } = dataMembers;

		this.id = id;
		this.name = name;
		this.image = image;
		this.about = about;
		this.location = location;
		this.dishes = dishes;
	}

	public calculateDistance(location: string): number {
		return 1.5; //TODO: calculate distance
	}

	public static async fromDB(id: number): Promise<Restaurant> {
		const restaurant = await prisma.restaurants.findUnique({ where: { id } });
		if (!restaurant) throw new Error(`Restaurant ${id} not found`);

		const rawDishes = await prisma.dishes.findMany({ where: { restaurantId: id } });
		const dishes = await Promise.all(rawDishes.map(async (d) => await Dish.fromDB(d.id)));

		return new Restaurant({ ...restaurant, dishes });
	}
}

export default Restaurant;
