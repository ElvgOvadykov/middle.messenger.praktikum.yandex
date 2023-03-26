export function isUserAuthorized(): boolean {
	return Boolean(window.sessionStorage.getItem("user"));
}

export function setCurrentUser(user: TUser) {
	window.sessionStorage.setItem("user", JSON.stringify(user));
}

export function getCurrentUser() {
	try {
		return JSON.parse(window.sessionStorage.getItem("user") || "");
	} catch (e) {
		console.log(e);
	}

	return undefined;
}

export function deleteCurrentUser() {
	window.sessionStorage.removeItem("user");
}
