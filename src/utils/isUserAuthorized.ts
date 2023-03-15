import store from "@store/Store";

export default function isUserAuthorized() {
	return store.getState().currentUser.data;
}
