<script lang="ts">
	import { walletStore } from '@svelte-on-solana/wallet-adapter-core';
	import { workSpace } from '@svelte-on-solana/wallet-adapter-ui';
	import { Keypair, SystemProgram, Transaction, type TransactionSignature } from '@solana/web3.js';
	import { Button } from '$lib/index';

	$: ({ publicKey, sendTransaction } = $walletStore);

	async function onClick() {
		if (!publicKey) {
			// notify({ type: 'error', message: `Wallet not connected!` });
			console.log('error', `Send Transaction: Wallet not connected!`);
			return;
		}

		let signature: TransactionSignature = '';
		const { connection } = $workSpace;

		try {
			const transaction = new Transaction().add(
				SystemProgram.transfer({
					fromPubkey: publicKey,
					toPubkey: Keypair.generate().publicKey,
					lamports: 1
				})
			);

			signature = await sendTransaction(transaction, connection);

			await connection.confirmTransaction(signature, 'confirmed');
            console.log('confirmed: ');
			// notify({ type: 'success', message: 'Transaction successful!', txid: signature });
		} catch (error: any) {
			// notify({
			// 	type: 'error',
			// 	message: `Transaction failed!`,
			// 	description: error?.message,
			// 	txid: signature
			// });
			console.log('error', `Transaction failed! ${error?.message}`, signature);
			return;
		}
	}
</script>

<div>
	<Button disabled={!publicKey} on:click={onClick}>Send Transaction</Button>
</div>
