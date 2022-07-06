import { writable } from 'svelte/store';
import { LAMPORTS_PER_SOL, type PublicKey, type Connection } from '@solana/web3.js';

type BalanceStore = {
	balance: number;
};

function declareBalanceStore() {
	const { subscribe, set } = writable<BalanceStore>({ balance: 0 });

	return {
		subscribe,
		getUserSOLBalance: async (publicKey: PublicKey, connection: Connection) => {
			let balance = 0;
			try {
				balance = await connection.getBalance(publicKey, 'confirmed');
				balance = balance / LAMPORTS_PER_SOL;
				set({ balance });
			} catch (e) {
				console.log(`error getting balance: `, e);
			}
		}
	};
}

export const balanceStore = declareBalanceStore();
