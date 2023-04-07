import type { HTMLInputTypeAttribute } from 'react';

interface InputProps {
	value: string;
	setValue: (value: string) => void;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
	iconBG?: boolean;
	fullyRounded?: boolean;
}

const Logo = (props: InputProps) => {
	return (
		<div className='flex flex-row'>
			{props.leftIcon && (
				<div
					className={`flex items-center justify-center w-10 h-10 text-white ${
						props.fullyRounded ? 'rounded-l-full' : 'rounded-l-md'
					} ${props.iconBG ? 'bg-primary' : 'bg-stone-900'}`}
				>
					{props.leftIcon}
				</div>
			)}
			<input
				value={props.value}
				onChange={(e) => props.setValue(e.target.value)}
				placeholder={props.placeholder}
				type={props.type}
				className={`px-4 py-2 h-10 text-white/70 bg-stone-900 border border-white/20 focus:outline-none focus:border-primary ${
					props.fullyRounded ? 'rounded-full' : 'rounded-md'
				} ${props.leftIcon && '!rounded-l-none'} ${props.rightIcon && '!rounded-r-none'}`}
			/>
			{props.rightIcon && (
				<div
					className={`flex items-center justify-center w-10 h-10 text-white ${
						props.fullyRounded ? 'rounded-r-full' : 'rounded-r-md'
					} ${props.iconBG ? 'bg-primary' : 'bg-stone-900'}`}
				>
					{props.rightIcon}
				</div>
			)}
		</div>
	);
};

export default Logo;
