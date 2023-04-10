import { results, RestaurantItem, DishItem } from '@api/search';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export type Dish = Omit<DishItem, 'type'>;

const Dish: NextPage = () => {
	const [data, setData] = useState<Dish | null>(null);
	const router = useRouter();

	useEffect(() => {
		setData(
			results.find(
				(i) => i.type === 'dish' && i.restaurantId === router.query.restaurantId && i.id === router.query.dishId
			) as DishItem
		);
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
				</div>
			)}
		</>
	);
};

export default Dish;
