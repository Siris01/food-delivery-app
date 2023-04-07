import type { NextPage } from 'next';
import Nav from '@components/Nav';

const Home: NextPage = () => {
	return (
		<>
			<Nav />
			{
				Array.from(Array(150).keys()).map((i) => <div key={i} className='text-primary'>Hello world!</div>)
			}
		</>
	);
};

export default Home;
