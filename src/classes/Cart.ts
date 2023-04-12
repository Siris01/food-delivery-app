import type Dish from '@classes/Dish';

export type CartItem = Dish & {
	quantity: number;
};

interface Cart {
	userId: number;
	items: CartItem[];
}

class Cart {
	public userId: number;
	public items: CartItem[];

	constructor(dataMembers: Cart) {
		const { userId, items } = dataMembers;

		this.userId = userId;
		this.items = items;
	}

	public addItem(item: Dish): void {
		this.items.push({ ...item, quantity: 1 });
	}

	public removeItem(itemId: number): void {
		this.items = this.items.filter((item) => item.id !== itemId);
	}

	public changeQuantity(itemId: number, increment: number): void {
		const item = this.items.find((item) => item.id === itemId);
		if (!item) throw new Error(`Item ${itemId} not found`);

		item.quantity += increment;

		if (item.quantity <= 0) {
			this.removeItem(itemId);
		}
	}

	public getTotalPrice(): number {
		return this.items.reduce((total, item) => total + item.price * item.quantity, 0);
	}
}

export default Cart;
