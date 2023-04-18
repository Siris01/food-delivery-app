import { Order as OrderType } from '@api/orders/index';
import fetcher from '@utils/fetcher';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Order: NextPage = () => {
	const [data, setData] = useState<OrderType | null>(null);
	const router = useRouter();
	useEffect(() => {
		const id = router.query.id;
		if (!id) return;

		fetcher(`/api/orders/${id}`).then((data) => setData(data));
	}, [router.query.id]);

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
