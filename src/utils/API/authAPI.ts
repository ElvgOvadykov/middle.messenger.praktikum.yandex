import BaseAPI from "./baseAPI";

export class AuthAPI extends BaseAPI {
	signUp(payload: AuthAPINamespace.signUp.TRequest) {
		return this.http.post<AuthAPINamespace.signUp.TResponse>("/signup", {
			data: payload,
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
	}

	signIn(payload: AuthAPINamespace.signIn.TRequest) {
		return this.http.post("/signin", {
			data: payload,
			headers: {
				"Content-Type": "application/json; charset=UTF-8",
			},
		});
	}

	getUser() {
		return this.http.get<AuthAPINamespace.getUser.TResponse>("/user", {});
	}

	logout() {
		return this.http.post("/logout", {});
	}
}

export default new AuthAPI("/auth");
