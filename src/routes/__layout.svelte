<script context="module" lang="ts">
	import { Buffer } from 'buffer';

	globalThis.Buffer = Buffer;
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { clusterApiUrl } from '@solana/web3.js';
	import { WalletProvider, ConnectionProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import type { Adapter } from '@solana/wallet-adapter-base';
	import { getLocalStorage } from '@svelte-on-solana/wallet-adapter-core';
	import { AppBar, ContentContainer, Footer } from '$lib/index';
	import { browser } from '$app/env';
	import '../app.css';

	const localStorageKey = 'walletAdapter';
	const network = clusterApiUrl('devnet');
	let wallets: Adapter[];
	$: autoConnect = browser && Boolean(getLocalStorage('autoconnect', false));

	onMount(async () => {
		const {
			PhantomWalletAdapter,
			SolflareWalletAdapter,
			SolletExtensionWalletAdapter,
			TorusWalletAdapter
		} = await import('@solana/wallet-adapter-wallets');

		wallets = [
			new PhantomWalletAdapter(),
			new SolflareWalletAdapter(),
			new SolletExtensionWalletAdapter(),
			new TorusWalletAdapter()
		];
	});
</script>

<WalletProvider {localStorageKey} {wallets} {autoConnect} />
<ConnectionProvider {network} />
<AppBar />
<ContentContainer>
	<slot />
</ContentContainer>
<Footer />
