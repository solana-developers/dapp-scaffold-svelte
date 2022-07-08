<script lang="ts">
    import { onDestroy } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { notificationStore } from '$stores/notification';

	export let id = '',
		type = '',
		message = '',
		description = '',
		txid = '';

    let timer: NodeJS.Timeout;

	function onHide(id: string) {
		notificationStore.remove(id);
	}

    function timeOut(id:string) {
        timer =  setTimeout(() => {
            onHide(id);
        }, 8000);
    }

    $: timeOut(id);

    onDestroy(() => {
        clearInterval(timer);
    })
</script>

<div
	class="w-full max-w-sm p-2 mx-4 mt-2 mb-12 overflow-hidden border border-gray-700 border-solid rounded-md shadow-lg pointer-events-auto bg-bkg-1 ring-1 ring-black ring-opacity-5"
	in:fly={{ duration: 200, x: -200 }}
	out:fade={{ duration: 200 }}
>
	<div class="p-4">
		<div class="flex items-center">
			<!-- icon -->
			<div class="flex-shrink-0">
				{#if type === 'success'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if type === 'info'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{:else if type === 'error'}
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				{/if}
			</div>
			<!-- message -->
			<div class="flex-1 w-0 ml-2">
				<p class="font-bold text-fgd-1">{message}</p>
				{#if description}
					<p class="mt-0.5 text-sm text-fgd-2">{description}</p>
				{/if}

				{#if txid}
					<div class="flex flex-row">
						<a
							href={'https://explorer.solana.com/tx/' + txid + `?cluster=devnet`}
							target="_blank"
							rel="noreferrer"
							class="flex flex-row link link-accent"
						>
							<svg
								class="flex-shrink-0 h-4 ml-2 mt-0.5 text-primary-light w-4"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								><path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
								/></svg
							>
							<div class="flex mx-4">
								{txid.slice(0, 8)}...
								{txid.slice(txid.length - 8)}
							</div>
						</a>
					</div>
				{/if}
			</div>

			<!-- button -->
			<div class="flex self-start flex-shrink-0 ml-4">
				<button
					on:click={() => onHide(id)}
					class={`bg-bkg-2 default-transition rounded-md inline-flex text-fgd-3 hover:text-fgd-4 focus:outline-none`}
				>
					<span class={`sr-only`}>Close</span>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="w-6 h-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						stroke-width="2"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
