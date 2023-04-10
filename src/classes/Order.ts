import Cart from '@classes/Cart';
import { randomBytes } from 'node:crypto';

interface Order extends Cart {
	id: string;
	createdAt: Date;
}

class Order extends Cart {
	public id: string;
	public createdAt: Date;
	public deliveryAddress: string;

	constructor(dataMembers: Cart, deliveryAddress: string) {
		super(dataMembers);

		this.deliveryAddress = deliveryAddress;
		this.id = randomBytes(16).toString('hex');
		this.createdAt = new Date(Date.now());
	}

	public get eta(): Date {
		const eta = new Date(this.createdAt);
		eta.setMinutes(eta.getMinutes() + 30); //TODO: calculate ETA based on restaurant location(s)?
		return eta;
	}

	public get status(): string {
		return this.eta > new Date(Date.now()) ? 'Preparing' : 'Delivering';
		//TODO: ^^ Fix this
	}
}

export default Order;
