import Input from '@components/Input';
import { NextPage } from 'next';
import { useState } from 'react';
import Image from 'next/image';

//TODO: Search bar with filtering by restaurant, cuisine, price, restaurant, rating, food name.
//TODO: Check cuisine search param in useEffect to fetch /api/search?q={cuisine}

const Explore: NextPage = () => {
	const [search, setSearch] = useState('');

	const SearchButton = //@ts-ignore
		(
			<button onClick={(_) => console.log(`Searched for ${search}`)} className='hover:scale-110'>
				<Image src='/icons/search.svg' alt='search' width={32} height={32} />
			</button>
		);
	return (
		<div className='flex flex-col justify-around'>
			<div className='space-y-4'>
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
