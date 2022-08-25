import { sveltekit } from '@sveltejs/kit/vite';
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import inject from '@rollup/plugin-inject';
import nodePolyfills from "rollup-plugin-node-polyfills";
import path from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	define: {
		'process.env.BROWSER': true,
		'process.env.NODE_DEBUG': JSON.stringify(''),
		'process.env.VERSION': JSON.stringify(process.env.npm_package_version)
	},
	optimizeDeps: {
		include: ['@solana/web3.js', 'buffer'],
		esbuildOptions: {
				target: 'esnext',
				plugins: [NodeGlobalsPolyfillPlugin({ buffer: true })],
		},
	},
	resolve: {
		alias: {
			$stores: path.resolve('./src/stores'),
			stream: 'rollup-plugin-node-polyfills/polyfills/stream',
		}
	},
	build: {
		target: 'esnext',
		commonjsOptions: {
			transformMixedEsModules: true
		},
		rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] }), nodePolyfills({ crypto: true })],
		},
	},
	server: {
		host: true
	}
};

export default config;
