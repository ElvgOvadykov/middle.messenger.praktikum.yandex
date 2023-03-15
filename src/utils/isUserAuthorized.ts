import store from "@store/Store";

export default function isUserAuthorized(): boolean {
	return Boolean(store.getState().currentUser.data);
}
