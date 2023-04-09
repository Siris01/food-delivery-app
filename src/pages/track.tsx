import { Order } from '@api/orders';
import { LoadingCard } from '@components/Card';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Track: NextPage = () => {
	const [data, setData] = useState<Order[] | null>(null);

	useEffect(() => {
		/*
		//TODO: Get orders
		*/
	}, []);

	return (
		<div className='flex flex-col items-center justify-center m-4'>
			<div className='flex flex-col space-y-4 items-center'>
				<span className='font-extrabold text-4xl text-primary'>My Orders</span>
			</div>
			<div className='mt-8 sapce-y-4 grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				{data && data.length ? (
					data.map((d) => <>{d.id}</>)
				) : data ? (
					<span className='font-2xl text-primary font-bold'>No orders found</span>
				) : (
					Array.from(Array(18).keys()).map((i) => <LoadingCard key={i} />)
				)}
			</div>
		</div>
	);
};

export default Track;
//TODO: Display orders in line 22
