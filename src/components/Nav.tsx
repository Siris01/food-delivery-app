import Logo from '@components/Logo';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Navbar } from 'flowbite-react';

const data = [
    {
        icon: 'curry-rice',
        title: 'Indian',
        description: 'With its complex spice blends and diverse array of vegetarian and non-vegetarian dishes, this cuisine offers a wealth of bold, flavorful options.',
    },
    {
        icon: 'pizza',
        title: 'Italian',
        description: 'This cuisine is known for its comforting, hearty dishes that often feature fresh tomatoes, aromatic herbs, and creamy cheeses.',
    },
    {
        icon: 'taco',
        title: 'Mexican',
        description: 'With its complex spice blends and diverse array of vegetarian and non-vegetarian dishes, this cuisine offers a wealth of bold, flavorful options.',
    },
    {
        icon: 'steaming-bowl',
        title: 'Chinese',
        description: 'With a focus on balance and harmony, this cuisine blends sweet, sour, salty, and umami flavors to create dishes that are both satisfying and nuanced.'
    },
    {
        icon: 'hamburger',
        title: 'American',
        description: 'From classNameic burgers and fries to regional specialties like barbecue and seafood, this cuisine is diverse and varied, with a focus on hearty, comforting fare.'
    },
    {
        icon: 'croissant',
        title: 'French',
        description: 'Known for its rich, buttery flavors and decadent desserts, this cuisine features a wide range of savory dishes that highlight the beauty of simple ingredients cooked to perfection.'
    }
];

export default function Nav() {
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className='!bg-bg text-white'
        >
            <Navbar.Brand href="/">
                <Logo size={48} />
                <span className="self-center whitespace-nowrap text-xl font-semibold">
                    Flowbite
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Link href='/login' className='bg-primary px-4 py-2 m-2 rounded-md font-bold text-lg'>
                    Log In
                </Link>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Navbar.Link
                    href="/"
                    active={true}
                >
                    Home
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    About
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Services
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Pricing
                </Navbar.Link>
                <Navbar.Link href="/navbars">
                    Contact
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}
