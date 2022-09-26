import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess'
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		adapter: adapter(),
		alias: {
			$stores: path.resolve('./src/stores'),
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
		}
	}
};

export default config;
