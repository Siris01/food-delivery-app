import type { NextPage } from 'next';
import { cuisines } from './order';
import Image from 'next/image';
import Link from 'next/link';

const Home: NextPage = () => {
	return (
		<div className='flex flex-col p-4 m-12 justify-center items-center'>
			<span className='font-extrabold p-2 m-2 text-6xl md:text-7xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#f12711] to-[#f5af19]'>What are you craving for today?</span>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
				{cuisines.map((cuisine) => {
					return (
						<Link href={`/order?cuisine=${cuisine.title.toLowerCase()}`} key={cuisine.title.toLowerCase()} className='flex flex-row justify-center items-center p-4 m-4 bg-black/70 rounded-md cursor-pointer border-2 border-black hover:border-primary'>
							<Image src={`/icons/${cuisine.icon}.svg`} alt={cuisine.title} width={256} height={256} />
							<div className='flex flex-col justify-between ml-4'>
								<span className='font-bold text-lg'>{cuisine.title}</span>
								<span className='font-medium text-base'>{cuisine.description}</span>
							</div>
						</Link>
					)
				})}
			</div>
		</div>
	);
};

export default Home;
