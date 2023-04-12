import { results, RestaurantItem, DishItem } from '@api/search';
import { NextPage } from 'next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Image from 'next/image';
import Card from '@components/Card';
import { CartItem } from '@pages/cart';
import { useRouter } from 'next/router';

export type Restaurant = Omit<RestaurantItem, 'type'> & {
	menu: Omit<DishItem, 'type'>[];
};

const Restaurant: NextPage = () => {
	const [data, setData] = useState<Restaurant | null>(null);
	const [cart, setCart] = useState<CartItem[]>([]);
	const router = useRouter();

	//TODO: Store distance as w3w? and calc distance before setting data
	useEffect(() => {
		const { type: _, ...d } = {
			...(results.find(
				(i) => i.type === 'restaurant' && i.id === parseInt((router.query.restaurantId as string) ?? '0')
			) as RestaurantItem),
			menu: results.filter(
				(i) => i.type === 'dish' && i.restaurantId === parseInt((router.query.restaurantId as string) ?? '0')
			) as DishItem[]
		};
		setData(d);
	}, [router.query.dishId, router.query.restaurantId]);

	return (
		<>
			{data && cart && (
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
					<p className='font-lg font-medium'>{data.about}</p>
					<span className='my-6 text-center text-3xl font-bold text-primary'>Menu</span>
					<div className='mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
						{data.menu.map((d) => (
							<RestaurantMenuCard
								key={d.id}
								id={d.id}
								restaurantId={d.restaurantId}
								name={d.name}
								image={d.image}
								href={`/restaurants/${router.query.restaurantId}/dishes/${d.id}`}
								allergens={d.allergens}
								price={d.price}
								cart={cart}
								setData={setCart}
							/>
						))}
					</div>
				</div>
			)}
		</>
	);
};

export default Restaurant;

type RestaurantMenuCardProps = Restaurant['menu'][0] & {
	cart: CartItem[];
	href?: string;
	setData: Dispatch<SetStateAction<CartItem[]>>;
};

const RestaurantMenuCard = (props: RestaurantMenuCardProps) => {
	return (
		<div className='inline-block max-w-fit relative'>
			<Card
				disableHoverEffects
				href={props.href}
				title={props.name}
				image={props.image}
				subText={`Price: ${props.price}`}
				text={props.allergens.length ? `Allergens: ${props.allergens}` : 'No allergens'}
			/>
			<div className='absolute bottom-4 right-4 space-x-4'>
				{props.cart.some((i) => i.id === props.id) ? (
					['+', '-'].map((c) => {
						return (
							<button
								key={c}
								onClick={() => {
									props.setData((items) => {
										const item = items!.find((i) => i.id === props.id)!;
										item.quantity += c === '+' ? 1 : -1;
										return [...items!.filter((i) => i.quantity > 0)];
									});
								}}
								className='bg-dualtone hover:bg-dualtone/70 text-primary rounded-full p-2 w-12 h-12 font-black text-xl'
							>
								{c}
							</button>
						);
					})
				) : (
					<button
						onClick={() => {
							props.setData((items) => {
								return [...items!, { ...props, quantity: 1 }];
							});
						}}
						className='bg-dualtone hover:bg-dualtone/70 text-primary rounded-md p-2 px-4 font-bold text-xl'
					>
						Add
					</button>
				)}
			</div>
		</div>
	);
};
