interface Dish {
	id: string;
	restaurantId: string;
	name: string;
	image: string;
	allergens: string[];
	price: number;
}

class Dish {
	public id: string;
	public restaurantId: string;
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
