<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-ui';
	import { LAMPORTS_PER_SOL, type TransactionSignature, type PublicKey } from '@solana/web3.js';
	import { balanceStore } from '$stores/balance';
	import { notificationStore } from '$stores/notification';

	async function onClick() {
		if (!$walletStore.connected) {
			console.log('error', 'Wallet not connected!');
			notificationStore.add({
				type: 'error',
				message: 'error',
				description: 'Wallet not connected!'
			});
			return;
		}

		let signature: TransactionSignature = '';
		const { connection } = $workSpace;
		const publicKey = $walletStore.publicKey as PublicKey;

		try {
			signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL);
			await connection.confirmTransaction(signature, 'confirmed');
			notificationStore.add({ type: 'success', message: 'Airdrop successful!', txid: signature });
			balanceStore.getUserSOLBalance(publicKey, connection);
		} catch (error: any) {
			notificationStore.add({
				type: 'error',
				message: `Airdrop failed!`,
				description: error?.message,
				txid: signature
			});
			console.log('error', `Airdrop failed! ${error?.message}`, signature);
		}
	}
</script>

<div>
	<button
		class="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500"
		on:click={onClick}
	>
		<span>Airdrop 1</span>
	</button>
</div>
