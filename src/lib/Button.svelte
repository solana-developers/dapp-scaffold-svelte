<script lang="ts">
	export let disabled = true;
</script>

<button
	class="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500"
	on:click
	{disabled}
>
	{#if disabled}
		Wallet not connected
	{:else}
		<slot>click</slot>
	{/if}
</button>
