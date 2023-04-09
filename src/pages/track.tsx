import { Order } from '@api/orders';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Track: NextPage = () => {
	const [data, setData] = useState<Order[] | null>(null);

	useEffect(() => {
		/*
		//TODO: Get orders
		*/
		setData([
			{
				id: 'sdfs3dsfdsfw34r2wr',
				eta: 45,
				items: []
			}
		]);
	}, []);

	return (
		<div className='flex flex-col items-center justify-center m-4'>
			<div className='flex flex-col items-center'>
				<span className='font-extrabold text-4xl text-primary'>My Orders</span>
			</div>
			<div className='mt-8 flex flex-col space-y-4 justify-items-center'>
				{data && data.length ? (
					data
						.sort((a, b) => a.eta - b.eta)
						.map((d) => (
							<div key={d.id}>
								<Link href={`/orders/${d.id}`} className='text-primary hover:underline'>
									{d.id.slice(0, 5)}...
								</Link>{' '}
								<span>(Arriving in {d.eta}m)</span>
							</div>
						))
				) : data ? (
					<span className='font-2xl text-primary font-bold'>No orders found</span>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default Track;
