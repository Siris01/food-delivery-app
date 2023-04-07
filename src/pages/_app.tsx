import '../styles/globals.css';
import '../styles/nprogress.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Outfit } from 'next/font/google';
import Nav from '@components/Nav';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const font = Outfit({ subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>FDA</title>
				<meta property='og:title' content='FDA' />
				<meta property='og:description' content='Food delivery app' />
				<meta property='theme-color' content='#2B8A3E' />
				<meta name='theme-color' content='#2B8A3E' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='Food delivery app' />
			</Head>
			<main className={`${font.className} min-h-screen`}>
				<Nav />
				<div className='flex flex-col justify-center my-4 md:my-2 lg:my-0' style={{ minHeight: 'calc(100vh - 96px)' }}>
					<Component {...pageProps} />
				</div>
			</main>
		</>
	);
}
