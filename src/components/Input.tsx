interface InputProps {
	value: string;
	setValue: (value: string) => void;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	placeholder?: string;
	type?: string;
	iconBG?: boolean;
}

const Logo = (props: InputProps) => {
	return (
		<div className='flex flex-row'>
			{props.leftIcon && (
				<div
					className={`flex items-center justify-center w-10 h-10 text-white rounded-l-md ${
						props.iconBG && 'bg-primary'
					}`}
				>
					{props.leftIcon}
				</div>
			)}
			<input
				value={props.value}
				onChange={(e) => props.setValue(e.target.value)}
				placeholder={props.placeholder}
				type={props.type}
				className={`px-4 py-2 h-10 text-gray-700 bg-white border border-gray-300 focus:outline-none focus:border-primary rounded-md ${
					props.leftIcon && '!rounded-l-none'
				} ${props.rightIcon && '!rounded-r-none'}`}
			/>
			{props.rightIcon && (
				<div
					className={`flex items-center justify-center w-10 h-10 text-white rounded-r-md ${
						props.iconBG && 'bg-primary'
					}`}
				>
					{props.rightIcon}
				</div>
			)}
		</div>
	);
};

export default Logo;
