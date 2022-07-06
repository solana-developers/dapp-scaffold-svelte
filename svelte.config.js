import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import inject from '@rollup/plugin-inject';

const config = {
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
				'process.env.NODE_DEBUG': JSON.stringify(''),
				'process.env.VERSION': JSON.stringify(process.env.npm_package_version)
			},
			optimizeDeps: {
				include: ['@solana/web3.js', 'buffer']
			},
			build: {
				rollupOptions: {
					plugins: [inject({ Buffer: ['buffer', 'Buffer'] })]
				}
			},
			server: {
				host: true
			}
		}
	}
};

export default config;
