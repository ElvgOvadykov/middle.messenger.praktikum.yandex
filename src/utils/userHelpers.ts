export function isUserAuthorized(): boolean {
	return Boolean(window.sessionStorage.getItem("user"));
}

export function setCurrentUser(user: TUser) {
	window.sessionStorage.setItem("user", JSON.stringify(user));
}

export function getCurrentUser() {
	return JSON.parse(window.sessionStorage.getItem("user") || "");
}

export function deleteCurrentUser() {
	window.sessionStorage.removeItem("user");
}
