<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';

	let balance = 0.0;
</script>

<div class="p-4 mx-auto md:hero">
	<div class="flex flex-col md:hero-content">
		<h1
			class="text-center text-5xl md:pl-12 font-bold text-transparent bg-clip-text bg-gradient-to-tr from-[#9945FF] to-[#14F195]"
		>
			Scaffold Lite <span class="text-sm font-normal align-top text-slate-700">
				{process.env.VERSION}
			</span>
		</h1>
		<h4 class="my-2 text-center md:w-full text-slate-300">
			<p>Simply the fastest way to get started.</p>
			SvelteKit, tailwind, wallet, web3.js, and more.
		</h4>
		<div class="max-w-md p-6 mx-auto my-2 mockup-code bg-primary">
			<pre data-prefix=">">
		  <code class="truncate">Start building on Solana  </code>
		</pre>
		</div>
		<div class="text-center">
			<!-- <RequestAirdrop /> -->
			{#if $walletStore}
				<p>SOL Balance: {(balance || 0).toLocaleString()}</p>
			{/if}
		</div>
	</div>
</div>
