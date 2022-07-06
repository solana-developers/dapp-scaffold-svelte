<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-ui';
</script>

<div class="text-center p-4 space-y-2">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

	{#if $walletStore.connected}
		<p>
			you are connected to <span class="text-red-200">{$workSpace.connection.rpcEndpoint}</span>
		</p>
	{/if}
</div>
