<script context="module" lang="ts">
	import { Buffer } from 'buffer';

	globalThis.Buffer = Buffer;
</script>

<script lang="ts">
	import { clusterApiUrl } from '@solana/web3.js';
	import { WalletProvider, ConnectionProvider } from '@svelte-on-solana/wallet-adapter-ui';
	import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
	import type { Adapter } from '@solana/wallet-adapter-base';
	import { getLocalStorage } from '@svelte-on-solana/wallet-adapter-core';
	import { AppBar, ContentContainer, Footer, NotificationList } from '$lib/index';
	import { browser } from '$app/env';
	import {
		PhantomWalletAdapter,
		SolflareWalletAdapter,
		SolletExtensionWalletAdapter,
		SolletWalletAdapter,
		TorusWalletAdapter
	} from '@solana/wallet-adapter-wallets';
	import '../app.css';

	const localStorageKey = 'walletAdapter';
	const endpoint = WalletAdapterNetwork.Devnet;
	const network = clusterApiUrl(WalletAdapterNetwork.Devnet);

	let wallets: Adapter[] = [
		new PhantomWalletAdapter(),
		new SolflareWalletAdapter(),
		new SolletWalletAdapter({ network: endpoint }),
		new SolletExtensionWalletAdapter({ network: endpoint }),
		new TorusWalletAdapter(),
	];

	$: autoConnect = browser && Boolean(getLocalStorage('autoconnect', false));
</script>

<WalletProvider {localStorageKey} {wallets} {autoConnect} />
<ConnectionProvider {network} />
<AppBar />
<ContentContainer>
	<slot />
</ContentContainer>
<NotificationList />
<Footer />
