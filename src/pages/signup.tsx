import { NextPage } from 'next';
import Input from '@components/Input';
import { useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import Image from 'next/image';
import { theme } from '@utils/config';

const Signup: NextPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	return (
		<div className='flex items-center justify-center'>
			<div className='flex flex-col rounded-md bg-black/70 p-12 space-y-6'>
				<span className='text-primary font-bold text-2xl text-center'>Sign Up</span>
				<div className='flex flex-col'>
					<span>Email</span>
					<Input
						rightIcon={<Image src='/icons/email.svg' height={24} width={24} alt='email' />}
						value={email}
						setValue={setEmail}
						type='email'
						placeholder='someone@xyz.com'
					/>
				</div>
				<div className='flex flex-col'>
					<span>Password</span>
					<Input
						rightIcon={<Image src='/icons/lock.svg' height={24} width={24} alt='lock' />}
						value={password}
						setValue={setPassword}
						type='password'
						placeholder='myname123'
					/>
				</div>
				<div className='flex flex-col items-center space-y-2'>
					<button
						id='submit'
						className='flex flex-row !mt-6 p-4 bg-dualtone hover:bg-dualtone/70 text-primary rounded-md justify-center w-full'
					>
						<span className='font-bold'>Sign Up</span>
						<IconArrowRight className='ml-2 font-bold' color={theme} />
					</button>
					<Link className='text-primary font-medium hover:underline text-center' href='/login'>
						Already have an account? Login here
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Signup;
