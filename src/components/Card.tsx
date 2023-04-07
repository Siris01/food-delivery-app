import Image from "next/image";
import Link from "next/link";

interface CardProps {
    title: string;
    image: string;
    description: string;
    href?: string;
}

const Card = (props: CardProps) => {
    const card = (
        <div className="flex flex-row max-w-sm items-center border-2 border-black hover:border-primary rounded-lg shadow bg-black/70 hover:scale-105">
            <div className="fixed object-cover h-48 w-24 rounded-l-lg">
                //FIX: Image is not positioned properly
                <Image width={988} height={658} src={props.image} alt={'Image of restaurant/dish'} />
            </div>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
            </div>
        </div>
    );

    if (props.href) return <Link href={props.href}>{card}</Link>;
    else return card;
};

export default Card;
