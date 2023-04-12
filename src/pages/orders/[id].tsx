import { Order as OrderType } from '@api/orders/index';
import { results } from '@api/search';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Order: NextPage = () => {
	const [data, setData] = useState<OrderType | null>(null);
	useEffect(() => {
		/*
		Get order details here
		*/

		setData({
			id: 1234,
			eta: 45,
			items: results.filter((r: any) => r.type === 'dish').map((d: any) => ({ ...d, quantity: 1 }))
		});
	}, []);

	return (
		<div>
			<div className='flex flex-col space-y-4 items-center'>
				<span className='font-extrabold text-4xl text-primary'>Order #{data?.id}</span>
				<span className='font-medium text-xl'>ETA: {data?.eta}m</span>
			</div>
			<div className='mt-8 flex flex-col justify-items-center'>
				{data && data.items.length ? (
					data.items.map((d) => (
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
			<span className='text-lg'>Total amount: {data?.items?.map((d) => d.price)?.reduce((a, b) => a + b, 0)}</span>
		</div>
	);
};

export default Order;
//TODO: What 3 words integration here
