<script lang='ts'>
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import { WalletMultiButton, workSpace } from '@svelte-on-solana/wallet-adapter-ui';

    $: console.log('$workSpace.connection', $workSpace.connection);
</script>

<div class="text-center p-4 space-y-2">
    <h1>Welcome to SvelteKit</h1>
    <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

    <div class="flex justify-center">
        <WalletMultiButton />
    </div>

    {#if $walletStore}
         <p>you are connected to...</p>
    {/if}
</div>
