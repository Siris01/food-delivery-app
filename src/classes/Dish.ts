interface Dish {
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

	constructor(dataMembers: Dish) {
		const { id, restaurantId, name, image, allergens, price } = dataMembers;

		this.id = id;
		this.restaurantId = restaurantId;
		this.name = name;
		this.image = image;
		this.allergens = allergens;
		this.price = price;
	}
}

export default Dish;
