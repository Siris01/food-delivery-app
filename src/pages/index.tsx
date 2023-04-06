import type { NextPage } from 'next';
import { Button } from '@mantine/core';
import Nav from '@components/Nav';

const Home: NextPage = () => {
	return (
		<>
			<Nav />
			<Button>Click me!</Button>
		</>
	);
};

export default Home;
