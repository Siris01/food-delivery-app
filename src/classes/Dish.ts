import prisma from '@prisma';

interface DishProps {
	id: number;
	restaurantId: number;
	name: string;
	image: string;
	allergens: string[];
	price: number;
}

class Dish {
	public id: number;
	public restaurantId: number;
	public name: string;
	public image: string;
	public allergens: string[];
	public price: number;

	constructor(dataMembers: DishProps) {
		const { id, restaurantId, name, image, allergens, price } = dataMembers;

		this.id = id;
		this.restaurantId = restaurantId;
		this.name = name;
		this.image = image;
		this.allergens = allergens;
		this.price = price;
	}

	public static async fromDB(id: number): Promise<Dish> {
		const dish = await prisma.dishes.findUnique({ where: { id } });
		if (!dish) throw new Error(`Dish ${id} not found`);

		const allergens = dish.allergens.split(',') as string[];
		return new Dish({ ...dish, allergens });
	}
}

export default Dish;
