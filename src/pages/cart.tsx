import { NextPage } from 'next';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Card, { LoadingCard } from '@components/Card';
import type { DishItem } from '@api/search';

type CartItem = DishItem & {
	quantity: number;
};

const Cart: NextPage = () => {
	const [data, setData] = useState<CartItem[] | null>(null);

	useEffect(() => {
		/*
		//TODO: Get cart items here, below is just for demo
		*/

		fetch('/api/search?q=abc')
			.then((res) => res.json())
			.then((data) => {
				const dishes = data.results.filter((r: any) => r.type === 'dish');

				setData(dishes.map((d: any) => ({ ...d, quantity: 1 })));
			});
	}, []);

	return (
		<div className='flex flex-col items-center justify-center m-4'>
			<div className='flex flex-col space-y-4 items-center'>
				<span className='font-extrabold text-4xl text-primary'>My Cart</span>
			</div>
			<div className='mt-8 sapce-y-4 grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				{data && data.length ? (
					data.map((d) => <CartItemCard key={d.id} setData={setData} {...d} />)
				) : data ? (
					<span className='font-2xl text-primary font-bold'>Cart is empty</span>
				) : (
					Array.from(Array(18).keys()).map((i) => <LoadingCard key={i} />)
				)}
			</div>
		</div>
	);
};

export default Cart;

type CardItemCardProps = CartItem & {
	setData: Dispatch<SetStateAction<CartItem[] | null>>;
};

const CartItemCard = (props: CardItemCardProps) => {
	return (
		<div className='relative'>
			<Card
				title={props.name}
				image={props.image}
				subText={`Price: ${props.price * props.quantity}, Qty: ${props.quantity}`}
				text={props.allergens.length ? `Allergens: ${props.allergens}` : 'No allergens'}
			/>
			<div className='absolute bottom-4 right-4 space-x-4'>
				{['+', '-'].map((c) => {
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
				})}
			</div>
		</div>
	);
};

//TODO: Sync react state to backend/localstorage
