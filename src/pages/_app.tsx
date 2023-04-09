import '@styles/globals.css';
import '@styles/nprogress.css';
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
				<meta property='theme-color' content='#FE5001' />
				<meta name='theme-color' content='#FE5001' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<meta name='description' content='Food delivery app' />
			</Head>
			<main className={`${font.className} min-h-screen`}>
				<div style={{ paddingLeft: 'calc(100vw - 100%)' }}>
					<Nav />
					<div
						className='flex flex-col justify-center mx-6 md:mx-8 lg:mx-12'
						style={{ minHeight: 'calc(100vh - 96px)' }}
					>
						<Component {...pageProps} />
					</div>
				</div>
			</main>
		</>
	);
}
