import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { CartItem } from './cart';

const Checkout: NextPage = () => {
	const [data, setData] = useState<CartItem[]>([]);
	useEffect(() => {
		const cartItems = JSON.parse(localStorage.getItem('cart') ?? '[]');
		setData(cartItems);
	}, []);

	return (
		<div>
			<div className='flex flex-col space-y-4 items-center'>
				<span className='font-extrabold text-4xl text-primary'>Checkout</span>
				<span className='font-medium text-xl'>ETA: 23m</span>
			</div>
			<div className='mt-8 flex flex-col justify-items-center'>
				{data && data.length ? (
					data.map((d) => (
						<div key={d.id}>
							{d.name} x {d.quantity}
						</div>
					))
				) : data ? (
					<span className='font-2xl text-primary font-bold'>No items found</span>
				) : (
					<span className='font-2xl text-primary font-bold'>Loading...</span>
				)}
			</div>
			<span className='text-lg'>Total amount: {data?.map((d) => d.price * d.quantity)?.reduce((a, b) => a + b, 0)}</span>
		</div>
	);
};

export default Checkout;
//TODO: Confirm order button, takes to orders/:id page
