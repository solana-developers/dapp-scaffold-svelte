import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),

		vite: {
			define: {
				'process.env.BROWSER': true,
				'process.env.NODE_DEBUG': JSON.stringify('')
			},
			optimizeDeps: {
				include: ['@solana/web3.js', 'buffer']
			}
		}
	}
};

export default config;
