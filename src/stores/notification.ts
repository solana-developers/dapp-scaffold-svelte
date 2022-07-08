import { writable } from 'svelte/store';
import { v4 as uuidv4 } from 'uuid';

export type Notification = {
	id?: string;
	type: string;
	message: string;
	description?: string;
	txid?: string;
};

type NotificationStore = Notification[];

const initState:NotificationStore = [];

function declareNotificationStore() {
	const { subscribe, update } = writable<NotificationStore>(initState);

	return {
		subscribe,
		add: (notification: Notification) =>
			update((store) => store.concat({ ...notification, id: uuidv4() }).reverse()),
		remove: (id: string) => update((store) => store.filter((x) => x.id !== id))
	};
}

export const notificationStore = declareNotificationStore();
