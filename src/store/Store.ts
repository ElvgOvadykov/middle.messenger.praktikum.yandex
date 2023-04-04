import EventBus from "@utils/EventBus";
import { set } from "@utils/helpers";

export enum StoreEvents {
	Updated = "updated",
}

type Indexed<T = any> = {
	[key in string]: T;
};

class Store extends EventBus {
	private _state: Indexed = {};

	public getState() {
		return this._state;
	}

	public set(path: string, value: unknown) {
		set(this._state, path, value);

		this.emit(StoreEvents.Updated);
	}

	public clearStore(): void {
		this._state = {};
	}
}

const store = new Store();

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.store = store;

export default store;
