import Image from 'next/image';
import Link from 'next/link';

interface CardProps {
	title: string;
	image: string;
	subText: string;
	text: string;
	href?: string;
}
const Card = (props: CardProps) => {
	const card = (
		<div className='flex flex-row max-w-sm items-center border-2 border-black hover:border-primary rounded-lg shadow bg-black/70 hover:scale-105'>
			<div className='relative h-48 w-24'>
				<Image fill src={props.image} alt={'Image of restaurant/dish'} className='object-cover rounded-lg' />
			</div>
			<div className='flex flex-col justify-between p-4 leading-normal'>
				<div className='flex flex-row justify-around items-center'>
					<h5 className='mb-2 text-2xl font-bold tracking-tight text-primary'>
						{props.title}
					</h5>
					<span className='text-sm text-white/90'>{props.subText}</span>
				</div>
				<p className='mb-3 font-normal text-wihte/90'>
					{props.text}
				</p>
			</div>
		</div>
	);

	if (props.href) return <Link href={props.href}>{card}</Link>;
	else return card;
};

export default Card;
