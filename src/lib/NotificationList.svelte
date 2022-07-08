<script lang="ts">
	import Notification from './Notification.svelte';
	import { notificationStore } from '$stores/notification';
</script>

<div class="fixed inset-0 z-20 flex items-end px-4 py-6 pointer-events-none sm:p-6">
	<div class="flex flex-col w-full">
		{#each $notificationStore as item}
			<Notification {...item} />
		{/each}
	</div>
</div>
