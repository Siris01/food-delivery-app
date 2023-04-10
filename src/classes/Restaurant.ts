import Dish from '@classes/Dish';

interface Restaurant {
	id: string;
	name: string;
	image: string;
	about: string;
	location: string;
	dishes: Dish[];
}

class Restaurant {
	public id: string;
	public name: string;
	public image: string;
	public about: string;
	public location: string;
	public dishes: Dish[];

	constructor(dataMembers: Restaurant) {
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
}

export default Restaurant;
