<script lang='ts'>
    import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
    import { sign } from 'tweetnacl';
    // import bs58 from 'bs58';

    $: ({ publicKey, signMessage } = $walletStore);

    async function onClick() {
        try {
            // `publicKey` will be null if the wallet isn't connected
            if (!publicKey) throw new Error('Wallet not connected!');
            // `signMessage` will be undefined if the wallet doesn't support it
            if (!signMessage) throw new Error('Wallet does not support message signing!');
            // Encode anything as bytes
            const message = new TextEncoder().encode('Hello, world!');
            // Sign the bytes using the wallet
            const signature = await signMessage(message);
            // Verify that the bytes were signed using the private key that matches the known public key
            if (!sign.detached.verify(message, signature, publicKey.toBytes())) throw new Error('Invalid signature!');
            // notify({ type: 'success', message: 'Sign message successful!', txid: bs58.encode(signature) });
        } catch (error: any) {
            // notify({ type: 'error', message: `Sign Message failed!`, description: error?.message });
            console.log('error', `Sign Message failed! ${error?.message}`);
        }
    }
</script>


<div>
    <button
        class="group w-60 m-2 btn animate-pulse disabled:animate-none bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500"
        on:click={onClick} disabled={!publicKey}
    >
        {!publicKey ? 'Wallet not connected' : "Sign Message"}
    </button>
</div>
