import { set } from "@utils/helpers";
import EventBus from "@utils/EventBus";

export type TState = {
	currentUser: {
		data?: TUser;
		error?: TAPIError;
		isLoading: boolean;
	};

	selectedUserId?: number;
};

export const initialState: TState = {
	currentUser: {
		isLoading: false,
	},
};

export enum StoreEvents {
	Updated = "updated",
}

class Store extends EventBus {
	private state: TState = initialState;

	public set(keypath: string, data: unknown) {
		set(this.state, keypath, data);

		this.emit(StoreEvents.Updated, this.getState());
	}

	public getState() {
		return this.state;
	}
}

const store = new Store();

export default store;
