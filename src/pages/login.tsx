import { NextPage } from 'next';
import Input from '@components/Input';
import { useState } from 'react';
import { IconMail, IconLock, IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';

const Login: NextPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<div className='flex items-center justify-center'>
			<div className='flex flex-col rounded-md bg-black/70 p-12 space-y-4'>
				<span className='text-primary font-bold text-2xl text-center'>Login</span>
				<div className='flex flex-col'>
					<span>Email</span>
					<Input
						rightIcon={<IconMail color='black' />}
						value={email}
						setValue={setEmail}
						type='email'
						placeholder='someone@xyz.com'
					/>
				</div>
				<div className='flex flex-col'>
					<span>Password</span>
					<Input
						rightIcon={<IconLock color='black' />}
						value={password}
						setValue={setPassword}
						type='password'
						placeholder='myname123'
					/>
				</div>
				<button className='flex flex-row p-4 bg-primary hover:bg-primary/70 text-black rounded-md justify-center w-full'>
					<span className='font-bold'>Login</span>
					<IconArrowRight color='black' />
				</button>
				<Link className='text-primary font-medium hover:underline text-center' href='/signup'>
					Don&apos;t have an account? Sign Up here
				</Link>
			</div>
		</div>
	);
};

export default Login;
