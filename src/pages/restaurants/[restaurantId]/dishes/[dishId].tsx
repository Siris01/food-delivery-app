import { DishItem } from '@api/search';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';
import fetcher from '@utils/fetcher';

export type Dish = Omit<DishItem, 'type'>;

const Dish: NextPage = () => {
	const [data, setData] = useState<Dish | null>(null);
	const router = useRouter();

	useEffect(() => {
		const restaurantId = router.query.restaurantId;
		const dishId = router.query.dishId;
		if (!restaurantId || !dishId) return;

		fetcher(`/api/restaurants/${restaurantId}/dishes/${dishId}`)
			.then((data) => setData(data));
	}, [router.query.dishId, router.query.restaurantId]);

	return (
		<>
			{data && (
				<div className='flex flex-col'>
					<div className='relative mb-8 min-w-full max-w-full min-h-[40vh] max-h-[40vh]'>
						<Image
							fill
							src={data.image}
							alt={data.name}
							className='object-cover shadow rounded-lg border-4 border-primary'
						/>
					</div>
					<h1 className='text-primary font-bold text-4xl'>{data.name}</h1>
					<span className='font-lg font-medium'>{`Allergens: ${data.allergens.length ? data.allergens.join(', ') : 'None'
						}`}</span>
					<span className='font-md font-medium'>{`Price: ${data.price} ₹`}</span>
					<Link className='text-primary hover:underline font-md text-md' href={`/restaurants/${data.restaurantId}`}>
						View Restaurant
					</Link>
				</div>
			)}
		</>
	);
};

export default Dish;
