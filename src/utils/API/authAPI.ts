import BaseAPI from "./baseAPI";

class AuthAPI extends BaseAPI {
	signUp(payload: AuthAPINamespace.signUp.TRequest) {
		return this.http.post("/signup", {
			data: payload,
		}) as Promise<AuthAPINamespace.signUp.TResponse>;
	}

	signIn(payload: AuthAPINamespace.signIn.TRequest) {
		return this.http.post("/signin", {
			data: payload,
		});
	}

	getUser() {
		return this.http.get(
			"/user",
			{},
		) as Promise<AuthAPINamespace.getUser.TResponse>;
	}

	logout() {
		return this.http.post("/logout", {});
	}
}

export default new AuthAPI("/auth");
