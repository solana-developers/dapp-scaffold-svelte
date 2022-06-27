<script context="module" lang="ts">
	import { Buffer } from 'buffer';

	// eslint-disable-next-line
	globalThis.Buffer = Buffer;
</script>

<script lang='ts'>
	import { onMount } from 'svelte';
  	import { clusterApiUrl } from '@solana/web3.js';
  	import { WalletProvider, ConnectionProvider } from '@svelte-on-solana/wallet-adapter-ui';
  	import type { Adapter } from '@solana/wallet-adapter-base';

	import '../app.css';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet');
	let wallets: Adapter[];

	onMount(async() => {
		const {
			PhantomWalletAdapter,
			SolflareWalletAdapter,
			SolletExtensionWalletAdapter,
			TorusWalletAdapter,
      	} = await import('@solana/wallet-adapter-wallets');

		  wallets = [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter(),
			new SolletExtensionWalletAdapter(),
			new TorusWalletAdapter(),
		];
	})
</script>

<WalletProvider {localStorageKey} {wallets} />
<ConnectionProvider {network} />
<slot />
