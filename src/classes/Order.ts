import Cart from '@classes/Cart';

interface Order extends Cart {
	id: number;
	createdAt: Date;
	deliveryAddress: string;
}

class Order extends Cart {
	public id: number;
	public createdAt: Date;
	public deliveryAddress: string;

	constructor(dataMembers: Order) {
		super(dataMembers);
		const { id, createdAt, deliveryAddress } = dataMembers;

		this.id = id;
		this.createdAt = createdAt;
		this.deliveryAddress = deliveryAddress;
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
