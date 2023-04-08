import Input from '@components/Input';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { SearchItem } from '@api/search';
import Card, { LoadingCard } from '@components/Card';

//TODO: Search bar with filtering by restaurant, cuisine, price, restaurant, rating, food name.
//TODO: Check cuisine search param in useEffect to fetch /api/search?q={cuisine}

const Explore: NextPage = () => {
	const [search, setSearch] = useState('');
	const [data, setDate] = useState<SearchItem[] | null>(null);

	const SearchButton = //@ts-ignore
		(
			<button onClick={(_) => console.log(`Searched for ${search}`)} className='hover:scale-110'>
				<Image src='/icons/search.svg' alt='search' width={32} height={32} />
			</button>
		);

	useEffect(() => {
		fetch(`/api/search?q=${search}`)
			.then((res) => res.json())
			.then((data) => setDate(data.results));
	}, []);

	return (
		<div className='flex flex-col items-center justify-center m-4'>
			<div className='flex flex-col space-y-4 items-center'>
				<span className='font-extrabold text-4xl text-primary'>Explore</span>
				<Input
					type='text'
					fullyRounded
					rightIcon={SearchButton}
					value={search}
					setValue={setSearch}
					placeholder='Search for restaurants/dishes'
				/>
			</div>
			<div className='mt-8 sapce-y-4 grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				{data && data.length ? (
					data.map((d) => {
						if (d.type === 'restaurant')
							return (
								<Card
									key={d.id}
									title={d.name}
									image={d.image}
									href={`/restaurants/${d.id}`}
									text={d.about}
									subText={`${d.distance}KM away`}
								/>
							);
						else if (d.type === 'dish')
							return (
								<Card
									key={d.id}
									title={d.name}
									image={d.image}
									href={`/restaurants/${d.resturantId}/dishes/${d.id}`}
									text={d.allergens.length ? `Allergens - ${d.allergens.join(', ')}` : 'No allergies!'}
									subText={`${d.price} ₹`}
								/>
							);
						else return null;
					})
				) : data ? (
					<span className='font-2xl text-primary font-bold'>No results found :(</span>
				) : (
					Array.from(Array(18).keys()).map((i) => <LoadingCard key={i} />)
				)}
			</div>
		</div>
	);
};

export default Explore;

export const cuisines = [
	{
		icon: 'curry',
		title: 'Indian',
		description:
			'With its complex spice blends and diverse array of vegetarian and non-vegetarian dishes, this cuisine offers a wealth of bold, flavorful options.'
	},
	{
		icon: 'pizza',
		title: 'Italian',
		description:
			'This cuisine is known for its comforting, hearty dishes that often feature fresh tomatoes, aromatic herbs, and creamy cheeses.'
	},
	{
		icon: 'taco',
		title: 'Mexican',
		description:
			'From tangy salsas to crispy tortilla chips to spicy chiles, this cuisine is all about bright, bold flavors that pack a punch.'
	},
	{
		icon: 'ramen',
		title: 'Chinese',
		description:
			'With a focus on balance and harmony, this cuisine blends sweet, sour, salty, and umami flavors to create dishes that are both satisfying and nuanced.'
	},
	{
		icon: 'burger',
		title: 'American',
		description:
			'From classic burgers and fries to regional specialties like barbecue and seafood, this cuisine is diverse and varied, with a focus on hearty, comforting fare.'
	},
	{
		icon: 'croissant',
		title: 'French',
		description:
			'Known for its rich, buttery flavors and decadent desserts, this cuisine features a wide range of savory dishes that highlight the beauty of simple ingredients cooked to perfection.'
	}
];
