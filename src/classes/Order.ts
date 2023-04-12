import Cart, { CartProps } from '@classes/Cart';
import prisma from '@prisma';

export interface OrderProps extends CartProps {
	id: number;
	createdAt: Date;
	deliveryAddress: string;
}

class Order extends Cart {
	public id: number;
	public createdAt: Date;
	public deliveryAddress: string;

	constructor(dataMembers: OrderProps) {
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

	public static async fromDB(id: number): Promise<Order> {
		const order = await prisma.orders.findUnique({ where: { id } });
		if (!order) throw new Error(`Order ${id} not found`);

		const items = await prisma.order_items.findMany({ where: { orderId: id } });
		const cart = new Cart({ userId: order.userId, items: [] });

		for (const item of items) {
			const dish = await prisma.dishes.findUnique({ where: { id: item.dishId } });
			if (!dish) throw new Error(`Dish ${item.dishId} not found`);

			const allergens = dish.allergens.split(',') as string[];

			cart.addItem({ ...dish, allergens });
			cart.changeQuantity(dish.id, item.quantity - 1);
		}

		return new Order({ ...order, items: cart.items });
	}
}

export default Order;
