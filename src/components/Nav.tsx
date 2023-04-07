import Logo from '@components/Logo';
import Link from 'next/link';
import { useState } from 'react';
import { Spin as Hamburger } from 'hamburger-react';

const links = [
	{ title: 'Home', href: '/' },
	{ title: 'Explore', href: '/explore' },
	{ title: 'Cart', href: '/cart' },
	{ title: 'Profile', href: '/profile' }
];

export default function Nav() {
	const [open, setOpen] = useState(false);

	return (
		<nav className='sticky top-0 z-50 before:border-b-2 before:-z-1 before:content-[""] before:absolute before:w-full before:h-full before:backdrop-blur-lg before:backdrop-brightness-25 before:bg-black/30 before:border-black'>
			<div className='relative text-white min-h-[96px] flex items-center justify-between px-4 p-2 mx-auto max-w-7xl sm:px-6 lg:px-8'>
				<div className='flex ml-2 items-center flex-1'>
					<Link href='/' className='flex items-center justify-center hover:text-primary'>
						<Logo size={48} />
						<span className='ml-4 font-bold text-lg'>FDA</span>
					</Link>
					<div className='hidden ml-10 space-x-8 md:block'>
						{links.map((item) => (
							<Link key={item.href} href={item.href} className='text-lg font-medium hover:text-primary'>
								{item.title}
							</Link>
						))}
					</div>
				</div>
				<div className='hidden mr-2 md:flex items-center justify-end md:justify-center'>
					<Link
						href='/login'
						className='font-bold text-lg px-4 p-2 m-2 border-2 border-primary bg-black hover:bg-primary text-white rounded-md'
					>
						Login
					</Link>
					<Link
						href='/signup'
						className='font-bold text-lg px-4 p-2 m-2 bg-primary hover:bg-primary/70 text-black rounded-md'
					>
						Sign Up
					</Link>
				</div>
				<div className='mr-2 md:hidden'>
					<button
						onClick={() => setOpen((o) => !o)}
						type='button'
						className='inline-flex items-center justify-center bg-primary text-black rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary'
					>
						<span className='sr-only'>Open main menu</span>
						<Hamburger rounded toggled={open} size={24} />
					</button>
				</div>
			</div>
			<div
				className={`md:hidden relative border-y-2 border-black backdrop-blur-lg backdrop-brightness-25 bg-black/30 ${open ? 'translate-y-0' : 'h-0 -translate-y-[500px]'
					}`}
			>
				<div className='px-2 pt-2 pb-3 space-y-1 sm:px-3'>
					{links.map((item) => (
						<Link
							onClick={() => setOpen(false)}
							key={item.href}
							href={item.href}
							className='block px-3 py-2 text-base font-medium hover:text-primary rounded-md'
						>
							{item.title}
						</Link>
					))}
				</div>
				<div className='px-5 py-4 space-y-4'>
					{['Login', 'Sign Up'].map((name) => {
						return (
							<Link
								key={name.toLowerCase().replaceAll(' ', '')}
								href={`/${name.toLowerCase().replaceAll(' ', '')}`}
								className='block w-full px-5 py-3 text-base font-bold text-center bg-primary hover:bg-primary/70 text-black border border-transparent rounded-md shadow-sm'
							>
								{name}
							</Link>
						);
					})}
				</div>
			</div>
		</nav>
	);
}
