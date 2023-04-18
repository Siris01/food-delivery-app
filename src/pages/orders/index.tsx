import { Order } from '@api/orders';
import fetcher from '@utils/fetcher';
import { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { accurateDiff } from '@utils/date';

const Orders: NextPage = () => {
	const [data, setData] = useState<Order[] | null>(null);

	useEffect(() => {
		fetcher('/api/orders').then((data) => setData(data.orders));
	}, []);

	return (
		<div className='flex flex-col items-center justify-center m-4'>
			<div className='flex flex-col items-center'>
				<span className='font-extrabold text-4xl text-primary'>My Orders</span>
			</div>
			<div className='mt-8 flex flex-col space-y-4 justify-items-center'>
				{data && data.length ? (
					data
						.sort((b, a) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
						.map((d) => (
							<div key={d.id}>
								<Link href={`/orders/${d.id}`} className='text-primary hover:underline'>
									Order #{d.id}
								</Link>{' '}
								<span>
									({d.eta ? `Arriving in ${accurateDiff(Math.round(new Date(d.eta).getTime() / 1000))}` : d.status})
								</span>
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

export default Orders;
